<?php

namespace App\Filament\Resources\Marketing\Features\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class FeatureForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('tagline'),
                Textarea::make('body')
                    ->columnSpanFull(),
                TextInput::make('icon'),
                TextInput::make('order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_published')
                    ->required(),
                TextInput::make('seo_title'),
                TextInput::make('seo_description'),
            ]);
    }
}
