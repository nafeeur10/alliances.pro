<?php

namespace App\Filament\Resources\Marketing\Leads\Pages;

use App\Filament\Resources\Marketing\Leads\LeadResource;
use Filament\Resources\Pages\CreateRecord;

class CreateLead extends CreateRecord
{
    protected static string $resource = LeadResource::class;
}
