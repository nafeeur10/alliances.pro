<?php

namespace App\Http\Resources\Marketing;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IndustryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'headline' => $this->headline,
            'subheadline' => $this->subheadline,
            'body' => $this->body,
            'icon' => $this->icon,
            'cover_image' => $this->cover_image,
            'order' => (int) $this->order,
            'seo_title' => $this->seo_title,
            'seo_description' => $this->seo_description,
        ];
    }
}
