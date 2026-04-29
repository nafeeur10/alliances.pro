<?php

namespace App\Filament\Resources\Marketing\SiteSettings;

use App\Filament\Resources\Marketing\SiteSettings\Pages\CreateSiteSetting;
use App\Filament\Resources\Marketing\SiteSettings\Pages\EditSiteSetting;
use App\Filament\Resources\Marketing\SiteSettings\Pages\ListSiteSettings;
use App\Filament\Resources\Marketing\SiteSettings\Schemas\SiteSettingForm;
use App\Filament\Resources\Marketing\SiteSettings\Tables\SiteSettingsTable;
use App\Models\Marketing\SiteSetting;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class SiteSettingResource extends Resource
{
    protected static ?string $model = SiteSetting::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Marketing';

    public static function form(Schema $schema): Schema
    {
        return SiteSettingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SiteSettingsTable::configure($table);
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
            'index' => ListSiteSettings::route('/'),
            'create' => CreateSiteSetting::route('/create'),
            'edit' => EditSiteSetting::route('/{record}/edit'),
        ];
    }
}
