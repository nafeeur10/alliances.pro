<?php

namespace App\Filament\Resources\Marketing\PageSections;

use App\Filament\Resources\Marketing\PageSections\Pages\CreatePageSection;
use App\Filament\Resources\Marketing\PageSections\Pages\EditPageSection;
use App\Filament\Resources\Marketing\PageSections\Pages\ListPageSections;
use App\Filament\Resources\Marketing\PageSections\Schemas\PageSectionForm;
use App\Filament\Resources\Marketing\PageSections\Tables\PageSectionsTable;
use App\Models\Marketing\PageSection;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PageSectionResource extends Resource
{
    protected static ?string $model = PageSection::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Marketing';

    public static function form(Schema $schema): Schema
    {
        return PageSectionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PageSectionsTable::configure($table);
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
            'index' => ListPageSections::route('/'),
            'create' => CreatePageSection::route('/create'),
            'edit' => EditPageSection::route('/{record}/edit'),
        ];
    }
}
