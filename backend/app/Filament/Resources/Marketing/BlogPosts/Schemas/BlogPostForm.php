<?php

namespace App\Filament\Resources\Marketing\BlogPosts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class BlogPostForm
{
    public const CATEGORIES = [
        'Case Study' => 'Case Study',
        'Marketing Tips' => 'Marketing Tips',
        'Product Update' => 'Product Update',
        'CRM Analysis' => 'CRM Analysis',
        'Other' => 'Other',
    ];

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
                Select::make('category')
                    ->options(self::CATEGORIES)
                    ->required()
                    ->native(false)
                    ->searchable(),
                TextInput::make('tags'),
                TextInput::make('reading_minutes')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_published')
                    ->required(),
                Toggle::make('is_featured')
                    ->label('Featured on /blog')
                    ->helperText('Only one post should be featured at a time. The most recently updated featured post wins.'),
                DateTimePicker::make('published_at'),
                TextInput::make('seo_title'),
                TextInput::make('seo_description'),
            ]);
    }
}
