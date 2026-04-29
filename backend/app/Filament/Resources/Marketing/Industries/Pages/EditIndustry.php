<?php

namespace App\Filament\Resources\Marketing\Industries\Pages;

use App\Filament\Resources\Marketing\Industries\IndustryResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditIndustry extends EditRecord
{
    protected static string $resource = IndustryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
