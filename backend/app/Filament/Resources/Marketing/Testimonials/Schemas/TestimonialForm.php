<?php

namespace App\Filament\Resources\Marketing\Testimonials\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Textarea::make('quote')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('author_name')
                    ->required(),
                TextInput::make('author_role'),
                TextInput::make('author_company'),
                TextInput::make('author_avatar'),
                TextInput::make('rating')
                    ->required()
                    ->numeric()
                    ->default(5),
                TextInput::make('industry_tag'),
                Toggle::make('is_published')
                    ->required(),
                TextInput::make('order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
