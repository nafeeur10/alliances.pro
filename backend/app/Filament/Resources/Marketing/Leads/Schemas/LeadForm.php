<?php

namespace App\Filament\Resources\Marketing\Leads\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class LeadForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name'),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('company'),
                TextInput::make('team_size'),
                Textarea::make('message')
                    ->columnSpanFull(),
                Select::make('source')
                    ->options([
            'contact_form' => 'Contact form',
            'demo_form' => 'Demo form',
            'newsletter' => 'Newsletter',
            'waitlist' => 'Waitlist',
        ])
                    ->default('contact_form')
                    ->required(),
                TextInput::make('waitlist_for'),
                TextInput::make('ip_address'),
                TextInput::make('user_agent'),
                Toggle::make('consent_given')
                    ->required(),
                DateTimePicker::make('notified_at'),
                DateTimePicker::make('processed_at'),
            ]);
    }
}
