<?php

namespace App\Filament\Resources\Marketing\SiteSettings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->required()
                    ->maxLength(80)
                    ->helperText('snake_case key. Examples: logo_text, logo_image_url, nav_links, cta_signup_url.'),
                Select::make('group')
                    ->options([
                        'general' => 'General',
                        'brand' => 'Brand / logo',
                        'nav' => 'Navigation',
                        'cta' => 'CTAs (signup / login)',
                        'contact' => 'Contact',
                        'social' => 'Social',
                        'footer' => 'Footer',
                    ])
                    ->default('general')
                    ->required(),
                Select::make('type')
                    ->options([
                        'text' => 'Text',
                        'longtext' => 'Long text',
                        'url' => 'URL',
                        'image' => 'Image (file upload)',
                        'json' => 'JSON (object or array)',
                        'bool' => 'Boolean (true/false)',
                    ])
                    ->default('text')
                    ->required()
                    ->live()
                    ->helperText('Pick "Image" to upload a file. Pick "JSON" for nav menus or any structured value.'),

                FileUpload::make('value')
                    ->label('Image')
                    ->image()
                    ->imageEditor()
                    ->disk('public')
                    ->directory('uploads/branding')
                    ->visibility('public')
                    ->maxSize(5120)
                    ->columnSpanFull()
                    ->visible(fn (Get $get) => $get('type') === 'image')
                    ->helperText('Upload an image (PNG, JPG, SVG, WebP — max 5 MB). The path is saved relative to /storage.'),

                Textarea::make('value')
                    ->columnSpanFull()
                    ->visible(fn (Get $get) => $get('type') !== 'image')
                    ->rows(fn (Get $get) => in_array($get('type'), ['json', 'longtext'], true) ? 10 : 3)
                    ->helperText(fn (Get $get) => match ($get('type')) {
                        'json' => 'Paste valid JSON. Example: [{"href":"/pricing","label":"Pricing"}]',
                        'bool' => 'Use "true" or "false".',
                        'url' => 'Full URL or path under /public (e.g. /logo.svg).',
                        default => null,
                    }),
            ]);
    }
}
