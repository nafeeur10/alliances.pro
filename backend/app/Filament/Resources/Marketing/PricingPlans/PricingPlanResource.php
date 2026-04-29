<?php

namespace App\Filament\Resources\Marketing\PricingPlans;

use App\Filament\Resources\Marketing\PricingPlans\Pages\CreatePricingPlan;
use App\Filament\Resources\Marketing\PricingPlans\Pages\EditPricingPlan;
use App\Filament\Resources\Marketing\PricingPlans\Pages\ListPricingPlans;
use App\Filament\Resources\Marketing\PricingPlans\Schemas\PricingPlanForm;
use App\Filament\Resources\Marketing\PricingPlans\Tables\PricingPlansTable;
use App\Models\Marketing\PricingPlan;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PricingPlanResource extends Resource
{
    protected static ?string $model = PricingPlan::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Marketing';

    public static function form(Schema $schema): Schema
    {
        return PricingPlanForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PricingPlansTable::configure($table);
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
            'index' => ListPricingPlans::route('/'),
            'create' => CreatePricingPlan::route('/create'),
            'edit' => EditPricingPlan::route('/{record}/edit'),
        ];
    }
}
