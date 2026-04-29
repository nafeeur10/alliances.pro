<?php

namespace App\Filament\Resources\Marketing\SiteSettings\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->required(),
                Textarea::make('value')
                    ->columnSpanFull(),
                TextInput::make('group')
                    ->required()
                    ->default('general'),
                Select::make('type')
                    ->options([
            'text' => 'Text',
            'longtext' => 'Longtext',
            'image' => 'Image',
            'url' => 'Url',
            'json' => 'Json',
            'bool' => 'Bool',
        ])
                    ->default('text')
                    ->required(),
            ]);
    }
}
