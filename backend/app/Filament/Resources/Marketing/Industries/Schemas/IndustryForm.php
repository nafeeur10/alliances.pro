<?php

namespace App\Filament\Resources\Marketing\Industries\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class IndustryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('headline'),
                TextInput::make('subheadline'),
                Textarea::make('body')
                    ->columnSpanFull(),
                TextInput::make('icon'),
                FileUpload::make('cover_image')
                    ->image(),
                Toggle::make('is_published')
                    ->required(),
                TextInput::make('order')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('seo_title'),
                TextInput::make('seo_description'),
            ]);
    }
}
