<?php

namespace App\Filament\Resources\Marketing\Leads;

use App\Filament\Resources\Marketing\Leads\Pages\CreateLead;
use App\Filament\Resources\Marketing\Leads\Pages\EditLead;
use App\Filament\Resources\Marketing\Leads\Pages\ListLeads;
use App\Filament\Resources\Marketing\Leads\Schemas\LeadForm;
use App\Filament\Resources\Marketing\Leads\Tables\LeadsTable;
use App\Models\Marketing\Lead;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class LeadResource extends Resource
{
    protected static ?string $model = Lead::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Marketing';

    public static function form(Schema $schema): Schema
    {
        return LeadForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LeadsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListLeads::route('/'),
            'create' => CreateLead::route('/create'),
            'edit' => EditLead::route('/{record}/edit'),
        ];
    }
}
