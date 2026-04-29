<?php

namespace App\Filament\Resources\Marketing\PricingPlans\Schemas;

use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PricingPlanForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')->required()->maxLength(120),
                TextInput::make('slug')->required()->alphaDash()->maxLength(120),
                TextInput::make('monthly_price_cents')->label('Monthly price (cents)')
                    ->required()->numeric()->default(0),
                TextInput::make('yearly_price_cents')->label('Yearly price (cents)')
                    ->required()->numeric()->default(0),
                Select::make('currency')->options(['USD' => 'USD', 'EUR' => 'EUR', 'GBP' => 'GBP'])
                    ->default('USD')->required(),
                Textarea::make('description')->columnSpanFull()->rows(3),
                TextInput::make('cta_label')->required()->default('Start 14-day trial')->maxLength(120),
                TextInput::make('cta_url')->url()->maxLength(255),
                TextInput::make('external_signup_url')->url()->maxLength(255)
                    ->helperText('Where the CTA points (typically the CRM signup or LemonSqueezy URL).'),
                TextInput::make('comparison_note')->maxLength(255)
                    ->helperText('e.g. "$X less than HubSpot"'),
                Toggle::make('is_featured'),
                Toggle::make('is_published')->default(true),
                TextInput::make('order')->numeric()->default(0),
                Repeater::make('features')
                    ->simple(TextInput::make('feature')->required()->maxLength(255))
                    ->columnSpanFull()
                    ->reorderable()
                    ->addActionLabel('Add feature'),
                KeyValue::make('limits')->columnSpanFull()
                    ->keyLabel('Limit')->valueLabel('Value')
                    ->helperText('e.g. team_members → 10, projects → unlimited'),
            ]);
    }
}
