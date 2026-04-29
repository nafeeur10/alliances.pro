<?php

namespace App\Filament\Resources\Marketing\PricingPlans\Pages;

use App\Filament\Resources\Marketing\PricingPlans\PricingPlanResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPricingPlans extends ListRecords
{
    protected static string $resource = PricingPlanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
