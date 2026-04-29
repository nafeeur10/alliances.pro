<?php

namespace App\Http\Resources\Marketing;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageSectionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'key' => $this->key,
            'order' => (int) $this->order,
            'type' => $this->type,
            'payload' => $this->payload,
            'is_visible' => (bool) $this->is_visible,
        ];
    }
}
