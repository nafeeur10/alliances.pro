<?php

namespace App\Filament\Resources\Marketing\Leads\Tables;

use App\Models\Marketing\Lead;
use Filament\Actions\Action;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LeadsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('created_at')->label('Received')->dateTime('M j, H:i')->sortable(),
                TextColumn::make('name')->searchable()->placeholder('—'),
                TextColumn::make('email')->label('Email')->searchable()->copyable(),
                TextColumn::make('company')->searchable()->placeholder('—'),
                TextColumn::make('team_size')->placeholder('—'),
                TextColumn::make('source')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'contact_form' => 'primary',
                        'demo_form' => 'success',
                        'newsletter' => 'info',
                        'waitlist' => 'warning',
                        default => 'gray',
                    }),
                TextColumn::make('waitlist_for')->label('Waitlist')->placeholder('—'),
                IconColumn::make('processed_at')
                    ->label('Processed')
                    ->boolean()
                    ->getStateUsing(fn (Lead $record): bool => $record->processed_at !== null),
                TextColumn::make('notified_at')->dateTime('M j, H:i')->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('ip_address')->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('source')
                    ->options([
                        'contact_form' => 'Contact form',
                        'demo_form' => 'Demo request',
                        'newsletter' => 'Newsletter',
                        'waitlist' => 'Waitlist',
                    ])
                    ->multiple(),
                TernaryFilter::make('processed_at')
                    ->label('Processed status')
                    ->placeholder('All')
                    ->trueLabel('Processed')
                    ->falseLabel('Unprocessed')
                    ->queries(
                        true: fn (Builder $q) => $q->whereNotNull('processed_at'),
                        false: fn (Builder $q) => $q->whereNull('processed_at'),
                    ),
                Filter::make('created_at')
                    ->schema([
                        \Filament\Forms\Components\DatePicker::make('from')->label('Received from'),
                        \Filament\Forms\Components\DatePicker::make('until')->label('Received until'),
                    ])
                    ->query(function (Builder $q, array $data): Builder {
                        return $q
                            ->when($data['from'] ?? null, fn (Builder $q, $d) => $q->whereDate('created_at', '>=', $d))
                            ->when($data['until'] ?? null, fn (Builder $q, $d) => $q->whereDate('created_at', '<=', $d));
                    }),
            ])
            ->recordActions([
                EditAction::make(),
                Action::make('reply')
                    ->label('Reply')
                    ->icon('heroicon-o-envelope')
                    ->color('primary')
                    ->url(fn (Lead $record): string => 'mailto:'.$record->email
                        .'?subject='.rawurlencode('Re: your '.$record->source.' submission'))
                    ->openUrlInNewTab(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    BulkAction::make('mark_processed')
                        ->label('Mark as processed')
                        ->icon('heroicon-o-check-badge')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(function (Collection $records): void {
                            $records->each(fn (Lead $r) => $r->forceFill(['processed_at' => Carbon::now()])->save());
                            Notification::make()
                                ->title("{$records->count()} leads marked as processed")
                                ->success()
                                ->send();
                        })
                        ->deselectRecordsAfterCompletion(),

                    BulkAction::make('export_csv')
                        ->label('Export CSV')
                        ->icon('heroicon-o-arrow-down-tray')
                        ->action(function (Collection $records): StreamedResponse {
                            $columns = ['id', 'created_at', 'name', 'email', 'company', 'team_size', 'source', 'waitlist_for', 'message', 'consent_given', 'processed_at', 'ip_address'];
                            $filename = 'marketing-leads-'.Carbon::now()->format('Ymd-His').'.csv';

                            return response()->streamDownload(function () use ($records, $columns): void {
                                $out = fopen('php://output', 'w');
                                fputcsv($out, $columns);
                                foreach ($records as $row) {
                                    fputcsv($out, array_map(
                                        fn ($c) => is_scalar($row->{$c}) || is_null($row->{$c})
                                            ? $row->{$c}
                                            : (string) $row->{$c},
                                        $columns,
                                    ));
                                }
                                fclose($out);
                            }, $filename, ['Content-Type' => 'text/csv']);
                        })
                        ->deselectRecordsAfterCompletion(),

                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
