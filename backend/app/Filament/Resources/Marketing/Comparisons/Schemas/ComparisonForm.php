<?php

namespace App\Filament\Resources\Marketing\Comparisons\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ComparisonForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required(),
                TextInput::make('competitor_name')
                    ->required(),
                TextInput::make('headline'),
                Textarea::make('body')
                    ->columnSpanFull(),
                Textarea::make('winner_summary')
                    ->columnSpanFull(),
                TextInput::make('comparison_table'),
                TextInput::make('seo_title'),
                TextInput::make('seo_description'),
                Toggle::make('is_published')
                    ->required(),
            ]);
    }
}
