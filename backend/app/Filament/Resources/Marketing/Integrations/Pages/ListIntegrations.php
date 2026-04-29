<?php

namespace App\Filament\Resources\Marketing\Integrations\Pages;

use App\Filament\Resources\Marketing\Integrations\IntegrationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListIntegrations extends ListRecords
{
    protected static string $resource = IntegrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
