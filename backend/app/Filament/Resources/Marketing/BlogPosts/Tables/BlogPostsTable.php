<?php

namespace App\Filament\Resources\Marketing\BlogPosts\Tables;

use App\Filament\Resources\Marketing\BlogPosts\Schemas\BlogPostForm;
use App\Models\Marketing\BlogPost;
use App\Models\User;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DatePicker;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class BlogPostsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('published_at', 'desc')
            ->columns([
                ImageColumn::make('cover_image')
                    ->label('Cover')
                    ->circular()
                    ->size(48),
                TextColumn::make('title')
                    ->searchable()
                    ->limit(60)
                    ->wrap(),
                TextColumn::make('slug')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('author_display')
                    ->label('Author')
                    ->state(fn (BlogPost $record): string => $record->author?->name ?? $record->author_name ?? '—')
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        return $query
                            ->where('author_name', 'like', "%{$search}%")
                            ->orWhereHas('author', fn (Builder $q) => $q->where('name', 'like', "%{$search}%"));
                    }),
                TextColumn::make('category')
                    ->badge()
                    ->searchable(),
                TextColumn::make('status')
                    ->badge()
                    ->formatStateUsing(fn (?string $state): string => BlogPost::STATUSES[$state] ?? ($state ?: '—'))
                    ->color(fn (?string $state): string => match ($state) {
                        BlogPost::STATUS_PUBLISHED => 'success',
                        BlogPost::STATUS_SCHEDULED => 'info',
                        BlogPost::STATUS_ARCHIVED => 'gray',
                        default => 'warning',
                    }),
                IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean()
                    ->sortable(),
                IconColumn::make('is_pinned')
                    ->label('Pinned')
                    ->boolean()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('reading_minutes')
                    ->label('Read')
                    ->suffix(' min')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('views_count')
                    ->label('Views')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('published_at')
                    ->dateTime('M j, Y H:i')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options(BlogPost::STATUSES),
                SelectFilter::make('category')
                    ->options(BlogPostForm::CATEGORIES),
                SelectFilter::make('author_id')
                    ->label('Author (staff)')
                    ->options(fn (): array => User::query()->orderBy('name')->pluck('name', 'id')->all())
                    ->searchable(),
                SelectFilter::make('visibility')
                    ->options(BlogPost::VISIBILITIES),
                TernaryFilter::make('is_featured')->label('Featured'),
                TernaryFilter::make('is_pinned')->label('Pinned'),
                TernaryFilter::make('is_published')->label('Published'),
                Filter::make('published_at_range')
                    ->label('Published between')
                    ->schema([
                        DatePicker::make('from'),
                        DatePicker::make('until'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when($data['from'] ?? null, fn (Builder $q, $date) => $q->whereDate('published_at', '>=', $date))
                            ->when($data['until'] ?? null, fn (Builder $q, $date) => $q->whereDate('published_at', '<=', $date));
                    }),
                TrashedFilter::make(),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    BulkAction::make('publish')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(function (Collection $records): void {
                            $records->each(fn (BlogPost $record) => $record->forceFill([
                                'status' => BlogPost::STATUS_PUBLISHED,
                                'is_published' => true,
                                'published_at' => $record->published_at ?? now(),
                            ])->save());
                            Notification::make()
                                ->title("Published {$records->count()} post(s)")
                                ->success()
                                ->send();
                        }),
                    BulkAction::make('draft')
                        ->icon('heroicon-o-pencil')
                        ->color('warning')
                        ->requiresConfirmation()
                        ->action(function (Collection $records): void {
                            $records->each(fn (BlogPost $record) => $record->forceFill([
                                'status' => BlogPost::STATUS_DRAFT,
                                'is_published' => false,
                            ])->save());
                            Notification::make()
                                ->title("Moved {$records->count()} post(s) to draft")
                                ->success()
                                ->send();
                        }),
                    BulkAction::make('archive')
                        ->icon('heroicon-o-archive-box')
                        ->color('gray')
                        ->requiresConfirmation()
                        ->action(function (Collection $records): void {
                            $records->each(fn (BlogPost $record) => $record->forceFill([
                                'status' => BlogPost::STATUS_ARCHIVED,
                                'is_published' => false,
                            ])->save());
                            Notification::make()
                                ->title("Archived {$records->count()} post(s)")
                                ->success()
                                ->send();
                        }),
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
