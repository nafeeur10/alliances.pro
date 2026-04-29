<?php

namespace App\Filament\Widgets;

use App\Models\Marketing\Lead;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentMarketingLeads extends TableWidget
{
    protected static ?string $heading = 'Recent Marketing Leads';

    protected int|string|array $columnSpan = 'full';

    protected static ?int $sort = 1;

    public function table(Table $table): Table
    {
        return $table
            ->query(fn (): Builder => Lead::query()->latest()->limit(10))
            ->paginated(false)
            ->columns([
                TextColumn::make('created_at')->label('Received')->dateTime('M j, H:i')->sortable(),
                TextColumn::make('name')->searchable()->placeholder('—'),
                TextColumn::make('email')->searchable()->copyable(),
                TextColumn::make('company')->searchable()->placeholder('—'),
                TextColumn::make('source')->badge()->color(fn (string $state): string => match ($state) {
                    'contact_form' => 'primary',
                    'demo_form' => 'success',
                    'newsletter' => 'info',
                    'waitlist' => 'warning',
                    default => 'gray',
                }),
                TextColumn::make('waitlist_for')->label('Waitlist')->placeholder('—'),
            ]);
    }
}
