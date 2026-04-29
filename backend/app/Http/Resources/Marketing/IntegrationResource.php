<?php

namespace App\Http\Resources\Marketing;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IntegrationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'logo' => $this->logo,
            'category' => $this->category,
            'description' => $this->description,
            'link_url' => $this->link_url,
            'order' => (int) $this->order,
        ];
    }
}
