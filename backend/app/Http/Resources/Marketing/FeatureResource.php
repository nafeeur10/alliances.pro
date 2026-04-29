<?php

namespace App\Http\Resources\Marketing;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeatureResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'tagline' => $this->tagline,
            'body' => $this->body,
            'icon' => $this->icon,
            'order' => (int) $this->order,
            'seo_title' => $this->seo_title,
            'seo_description' => $this->seo_description,
        ];
    }
}
