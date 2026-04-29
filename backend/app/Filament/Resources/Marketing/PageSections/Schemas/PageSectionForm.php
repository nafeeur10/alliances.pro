<?php

namespace App\Filament\Resources\Marketing\PageSections\Schemas;

use Filament\Forms\Components\Builder as BuilderField;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PageSectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('page_id')->relationship('page', 'title')->required(),
                TextInput::make('key')->required()->maxLength(60),
                TextInput::make('order')->required()->numeric()->default(0),
                Select::make('type')
                    ->options([
                        'hero' => 'Hero',
                        'sponsors' => 'Sponsors',
                        'benefits' => 'Benefits',
                        'features' => 'Features',
                        'services' => 'Services',
                        'trust' => 'Trust',
                        'testimonial' => 'Testimonial',
                        'team' => 'Team',
                        'pricing' => 'Pricing',
                        'community' => 'Community',
                        'contact' => 'Contact',
                        'faq' => 'Faq',
                        'newsletter' => 'Newsletter',
                        'custom' => 'Custom',
                    ])
                    ->required(),
                Toggle::make('is_visible')->default(true),
                BuilderField::make('payload')
                    ->columnSpanFull()
                    ->blocks([
                        Block::make('hero')->schema([
                            TextInput::make('eyebrow'),
                            TextInput::make('headline')->required(),
                            Textarea::make('subheadline')->rows(2),
                            TextInput::make('primary_cta_label'),
                            TextInput::make('primary_cta_url')->url(),
                            TextInput::make('secondary_cta_label'),
                            TextInput::make('secondary_cta_url')->url(),
                            TextInput::make('trust_strip'),
                        ]),
                        Block::make('benefits')->schema([
                            TextInput::make('eyebrow'),
                            TextInput::make('headline'),
                            Repeater::make('items')->schema([
                                TextInput::make('headline')->required(),
                                Textarea::make('body')->rows(2),
                                TextInput::make('icon'),
                            ]),
                        ]),
                        Block::make('trust')->schema([
                            TextInput::make('headline'),
                            Repeater::make('columns')->schema([
                                TextInput::make('title')->required(),
                                Textarea::make('body')->rows(2),
                            ]),
                        ]),
                        Block::make('community')->schema([
                            TextInput::make('headline'),
                            Repeater::make('cards')->schema([
                                TextInput::make('title')->required(),
                                Textarea::make('body')->rows(2),
                                TextInput::make('cta_label'),
                                TextInput::make('cta_url')->url(),
                            ]),
                        ]),
                        Block::make('contact')->schema([
                            TextInput::make('headline'),
                            Repeater::make('channels')->schema([
                                TextInput::make('label')->required(),
                                TextInput::make('email')->email(),
                                TextInput::make('sla'),
                            ]),
                        ]),
                        Block::make('newsletter')->schema([
                            TextInput::make('headline'),
                            Textarea::make('sub')->rows(2),
                        ]),
                        Block::make('custom')->schema([
                            KeyValue::make('values')->keyLabel('Key')->valueLabel('Value'),
                        ]),
                    ]),
            ]);
    }
}
