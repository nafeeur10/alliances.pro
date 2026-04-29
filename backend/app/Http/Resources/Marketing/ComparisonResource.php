<?php

namespace App\Http\Resources\Marketing;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComparisonResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'competitor_name' => $this->competitor_name,
            'headline' => $this->headline,
            'body' => $this->body,
            'winner_summary' => $this->winner_summary,
            'comparison_table' => $this->comparison_table ?? [],
            'seo_title' => $this->seo_title,
            'seo_description' => $this->seo_description,
        ];
    }
}
