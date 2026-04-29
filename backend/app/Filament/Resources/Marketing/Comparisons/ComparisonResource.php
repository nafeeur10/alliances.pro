<?php

namespace App\Filament\Resources\Marketing\Comparisons;

use App\Filament\Resources\Marketing\Comparisons\Pages\CreateComparison;
use App\Filament\Resources\Marketing\Comparisons\Pages\EditComparison;
use App\Filament\Resources\Marketing\Comparisons\Pages\ListComparisons;
use App\Filament\Resources\Marketing\Comparisons\Schemas\ComparisonForm;
use App\Filament\Resources\Marketing\Comparisons\Tables\ComparisonsTable;
use App\Models\Marketing\Comparison;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ComparisonResource extends Resource
{
    protected static ?string $model = Comparison::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Marketing';

    public static function form(Schema $schema): Schema
    {
        return ComparisonForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ComparisonsTable::configure($table);
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
            'index' => ListComparisons::route('/'),
            'create' => CreateComparison::route('/create'),
            'edit' => EditComparison::route('/{record}/edit'),
        ];
    }
}
