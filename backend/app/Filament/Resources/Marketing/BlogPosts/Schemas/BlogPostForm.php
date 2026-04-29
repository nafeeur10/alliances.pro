<?php

namespace App\Filament\Resources\Marketing\BlogPosts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class BlogPostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required(),
                TextInput::make('title')
                    ->required(),
                Textarea::make('excerpt')
                    ->columnSpanFull(),
                Textarea::make('body')
                    ->columnSpanFull(),
                FileUpload::make('cover_image')
                    ->image(),
                TextInput::make('author_name'),
                TextInput::make('category'),
                TextInput::make('tags'),
                TextInput::make('reading_minutes')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_published')
                    ->required(),
                DateTimePicker::make('published_at'),
                TextInput::make('seo_title'),
                TextInput::make('seo_description'),
            ]);
    }
}
