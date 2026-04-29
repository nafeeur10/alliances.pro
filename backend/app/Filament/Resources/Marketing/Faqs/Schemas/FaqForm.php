<?php

namespace App\Filament\Resources\Marketing\Faqs\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class FaqForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('question')->required()->maxLength(255)->columnSpanFull(),
                Textarea::make('answer')->required()->rows(6)->columnSpanFull(),
                Select::make('category')
                    ->options([
                        'Trial' => 'Trial',
                        'Pricing' => 'Pricing',
                        'Migration' => 'Migration',
                        'Product' => 'Product',
                        'Data' => 'Data',
                        'Security' => 'Security',
                        'Other' => 'Other',
                    ])
                    ->searchable()
                    ->preload()
                    ->createOptionForm([
                        TextInput::make('name')->required(),
                    ]),
                TextInput::make('order')->required()->numeric()->default(0),
                Toggle::make('is_published')->default(true),
            ]);
    }
}
