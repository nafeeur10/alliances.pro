<?php

namespace App\Filament\Widgets;

use App\Models\Marketing\BlogPost;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class BlogTopPosts extends TableWidget
{
    protected static ?string $heading = 'Top blog posts (by views)';

    protected int|string|array $columnSpan = 'full';

    protected static ?int $sort = 3;

    public function table(Table $table): Table
    {
        return $table
            ->query(fn (): Builder => BlogPost::query()->orderByDesc('views_count')->limit(5))
            ->paginated(false)
            ->columns([
                TextColumn::make('title')->limit(70)->wrap(),
                TextColumn::make('category')->badge(),
                TextColumn::make('status')->badge()->color(fn (?string $state): string => match ($state) {
                    BlogPost::STATUS_PUBLISHED => 'success',
                    BlogPost::STATUS_SCHEDULED => 'info',
                    BlogPost::STATUS_ARCHIVED => 'gray',
                    default => 'warning',
                }),
                TextColumn::make('views_count')->label('Views')->numeric(),
                TextColumn::make('published_at')->label('Published')->dateTime('M j, Y'),
            ]);
    }
}
