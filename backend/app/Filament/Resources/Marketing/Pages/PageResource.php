<?php

namespace App\Filament\Resources\Marketing\Pages;

use App\Filament\Resources\Marketing\Pages\Pages\CreatePage;
use App\Filament\Resources\Marketing\Pages\Pages\EditPage;
use App\Filament\Resources\Marketing\Pages\Pages\ListPages;
use App\Filament\Resources\Marketing\Pages\Schemas\PageForm;
use App\Filament\Resources\Marketing\Pages\Tables\PagesTable;
use App\Models\Marketing\Page;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Marketing';

    public static function form(Schema $schema): Schema
    {
        return PageForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PagesTable::configure($table);
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
            'index' => ListPages::route('/'),
            'create' => CreatePage::route('/create'),
            'edit' => EditPage::route('/{record}/edit'),
        ];
    }
}
