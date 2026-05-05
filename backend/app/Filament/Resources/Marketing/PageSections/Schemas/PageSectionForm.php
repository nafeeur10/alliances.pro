<?php

namespace App\Filament\Resources\Marketing\PageSections\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class PageSectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Basics')
                    ->columns(2)
                    ->schema([
                        Select::make('page_id')
                            ->relationship('page', 'title')
                            ->required(),
                        TextInput::make('key')
                            ->required()
                            ->maxLength(60)
                            ->helperText('Unique slug within the page (e.g. hero, sponsors, benefits).'),
                        Select::make('type')
                            ->options(self::types())
                            ->required()
                            ->live()
                            ->helperText('Picks which content fields appear below.'),
                        TextInput::make('order')
                            ->required()
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_visible')->default(true),
                    ]),

                Section::make('Hero content')
                    ->visible(fn (Get $get) => $get('type') === 'hero')
                    ->columns(2)
                    ->schema([
                        TextInput::make('payload.eyebrow')->label('Badge / eyebrow text'),
                        FileUpload::make('payload.image_url')
                            ->label('Hero image')
                            ->image()->imageEditor()
                            ->disk('public')->directory('uploads/hero')->visibility('public')
                            ->maxSize(8192)
                            ->helperText('Upload PNG / JPG / WebP (max 8 MB).'),
                        TextInput::make('payload.headline')->columnSpanFull(),
                        Textarea::make('payload.subheadline')->rows(3)->columnSpanFull(),
                        TextInput::make('payload.primary_cta.label')->label('Primary CTA — label'),
                        TextInput::make('payload.primary_cta.url')->label('Primary CTA — URL'),
                        TextInput::make('payload.secondary_cta.label')->label('Secondary CTA — label'),
                        TextInput::make('payload.secondary_cta.url')->label('Secondary CTA — URL'),
                        Repeater::make('payload.trust_checks')
                            ->label('Trust check items')
                            ->schema([TextInput::make('label')->required()])
                            ->defaultItems(0)
                            ->columnSpanFull(),
                    ]),

                Section::make('Company logos / sponsors')
                    ->visible(fn (Get $get) => $get('type') === 'sponsors')
                    ->schema([
                        TextInput::make('payload.headline')->label('Section headline (optional)'),
                        Repeater::make('payload.logos')
                            ->label('Logos')->columns(3)
                            ->schema([
                                TextInput::make('name')->required(),
                                TextInput::make('icon')->helperText('Lucide icon name. Leave blank to use image.'),
                                FileUpload::make('image_url')
                                    ->label('Image')->image()
                                    ->disk('public')->directory('uploads/sponsors')
                                    ->visibility('public')->maxSize(2048),
                            ])
                            ->defaultItems(0),
                    ]),

                Section::make('Benefits')
                    ->visible(fn (Get $get) => $get('type') === 'benefits')
                    ->columns(2)
                    ->schema([
                        TextInput::make('payload.eyebrow'),
                        TextInput::make('payload.headline'),
                        Textarea::make('payload.description')->rows(3)->columnSpanFull(),
                        Repeater::make('payload.items')
                            ->label('Benefit cards')
                            ->schema([
                                TextInput::make('headline')->required(),
                                Textarea::make('body')->rows(2),
                                TextInput::make('icon')->helperText('Lucide icon name'),
                            ])
                            ->defaultItems(0)
                            ->columnSpanFull(),
                    ]),

                Section::make('Pricing — section + /pricing page copy')
                    ->visible(fn (Get $get) => $get('type') === 'pricing')
                    ->columns(2)
                    ->schema([
                        ...self::headerFields(),
                        TextInput::make('payload.compare_eyebrow')
                            ->label('Compare table — eyebrow')->placeholder('Compare plans'),
                        TextInput::make('payload.compare_title')
                            ->label('Compare table — title')->placeholder('All the details, side by side.'),
                        TextInput::make('payload.faq_eyebrow')
                            ->label('FAQ — eyebrow')->placeholder('FAQ'),
                        TextInput::make('payload.faq_title')
                            ->label('FAQ — title')->placeholder('Questions, answered.'),
                        Repeater::make('payload.compare_rows')
                            ->label('Extra comparison rows (beyond the plan limits)')
                            ->helperText('Use plan name as the column key. Use "yes"/"no" for checkmarks, or any text.')
                            ->schema([
                                TextInput::make('feature')->required(),
                                Repeater::make('values')
                                    ->label('Per-plan values')
                                    ->columns(2)
                                    ->schema([
                                        TextInput::make('plan')
                                            ->label('Plan name')
                                            ->required()
                                            ->placeholder('Pro / Business'),
                                        TextInput::make('value')
                                            ->required()
                                            ->placeholder('yes / no / any text'),
                                    ])
                                    ->defaultItems(2),
                            ])
                            ->defaultItems(0)
                            ->columnSpanFull(),
                    ]),

                Section::make('Services')
                    ->visible(fn (Get $get) => $get('type') === 'services')
                    ->columns(2)
                    ->schema([
                        ...self::headerFields(),
                        Repeater::make('payload.items')
                            ->label('Service cards')
                            ->schema([
                                TextInput::make('title')->required(),
                                Textarea::make('description')->rows(2),
                                Toggle::make('pro')->label('PRO badge'),
                            ])
                            ->defaultItems(0)
                            ->columnSpanFull(),
                    ]),

                Section::make('Trust')
                    ->visible(fn (Get $get) => $get('type') === 'trust')
                    ->columns(2)
                    ->schema([
                        ...self::headerFields(),
                        Repeater::make('payload.items')
                            ->label('Trust points')
                            ->schema([
                                TextInput::make('icon')->helperText('Lucide icon name'),
                                TextInput::make('badge'),
                                TextInput::make('problem')->helperText('Shown with strikethrough.'),
                                TextInput::make('solution')->helperText('Shown bold.'),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->columnSpanFull(),
                    ]),

                Section::make('Team')
                    ->visible(fn (Get $get) => $get('type') === 'team')
                    ->columns(2)
                    ->schema([
                        ...self::headerFields(),
                        Repeater::make('payload.members')
                            ->label('Team members')
                            ->schema([
                                FileUpload::make('imageUrl')
                                    ->label('Photo')->image()
                                    ->disk('public')->directory('uploads/team')
                                    ->visibility('public')->maxSize(4096),
                                TextInput::make('firstName')->required(),
                                TextInput::make('lastName')->required(),
                                Repeater::make('positions')
                                    ->label('Positions / titles')
                                    ->schema([TextInput::make('value')->required()])
                                    ->defaultItems(1),
                                Repeater::make('socialNetworks')
                                    ->label('Social links')
                                    ->schema([
                                        Select::make('name')->options([
                                            'X' => 'X / Twitter',
                                            'LinkedIn' => 'LinkedIn',
                                            'Github' => 'GitHub',
                                        ])->required(),
                                        TextInput::make('url')->required(),
                                    ])->columns(2),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->columnSpanFull(),
                    ]),

                Section::make('Community')
                    ->visible(fn (Get $get) => $get('type') === 'community')
                    ->columns(2)
                    ->schema([
                        TextInput::make('payload.headline_lead')->label('Headline — lead'),
                        TextInput::make('payload.headline_highlight')->label('Headline — highlighted'),
                        Textarea::make('payload.body')->rows(3)->columnSpanFull(),
                        TextInput::make('payload.cta.label')->label('CTA — label'),
                        TextInput::make('payload.cta.url')->label('CTA — URL'),
                    ]),

                Section::make('Contact')
                    ->visible(fn (Get $get) => $get('type') === 'contact')
                    ->columns(2)
                    ->schema([
                        ...self::headerFields(),
                        TextInput::make('payload.location')->columnSpanFull(),
                        TextInput::make('payload.phone'),
                        TextInput::make('payload.email')->email(),
                        TextInput::make('payload.hours')->columnSpanFull(),
                    ]),

                Section::make('Newsletter')
                    ->visible(fn (Get $get) => $get('type') === 'newsletter')
                    ->columns(2)
                    ->schema([
                        TextInput::make('payload.title_lead')->label('Title — lead'),
                        TextInput::make('payload.title_highlight')->label('Title — highlighted'),
                        Textarea::make('payload.sub')->rows(2)->columnSpanFull(),
                        TextInput::make('payload.placeholder')->label('Email placeholder'),
                        TextInput::make('payload.cta_label')->label('Button label'),
                    ]),

                Section::make('Generic content')
                    ->visible(fn (Get $get) => ! in_array($get('type'), [
                        'hero', 'sponsors', 'benefits', 'pricing',
                        'services', 'trust', 'team',
                        'community', 'contact', 'newsletter',
                    ], true))
                    ->columns(2)
                    ->schema(self::headerFields()),
            ]);
    }

    /** Common eyebrow / headline / sub fields. */
    protected static function headerFields(): array
    {
        return [
            TextInput::make('payload.eyebrow')->label('Eyebrow / sub-title'),
            TextInput::make('payload.headline')->label('Headline'),
            Textarea::make('payload.sub')->label('Description / sub-text')->rows(3)->columnSpanFull(),
        ];
    }

    /** @return array<string, string> */
    protected static function types(): array
    {
        return [
            'hero' => 'Hero',
            'sponsors' => 'Sponsors / Logos',
            'benefits' => 'Benefits',
            'services' => 'Services',
            'trust' => 'Trust',
            'team' => 'Team',
            'pricing' => 'Pricing',
            'community' => 'Community',
            'contact' => 'Contact',
            'newsletter' => 'Newsletter',
            'custom' => 'Custom',
        ];
    }
}
