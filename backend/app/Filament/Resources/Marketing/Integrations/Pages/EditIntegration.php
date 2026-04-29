<?php

namespace App\Filament\Resources\Marketing\Integrations\Pages;

use App\Filament\Resources\Marketing\Integrations\IntegrationResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditIntegration extends EditRecord
{
    protected static string $resource = IntegrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
