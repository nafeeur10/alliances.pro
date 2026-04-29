<?php

namespace App\Filament\Resources\Marketing\Comparisons\Pages;

use App\Filament\Resources\Marketing\Comparisons\ComparisonResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditComparison extends EditRecord
{
    protected static string $resource = ComparisonResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
