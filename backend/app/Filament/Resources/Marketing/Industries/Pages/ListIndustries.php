<?php

namespace App\Filament\Resources\Marketing\Industries\Pages;

use App\Filament\Resources\Marketing\Industries\IndustryResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListIndustries extends ListRecords
{
    protected static string $resource = IndustryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
