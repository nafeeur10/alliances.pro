<?php

namespace App\Http\Resources\Marketing;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PricingPlanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'monthly_price_cents' => (int) $this->monthly_price_cents,
            'yearly_price_cents' => (int) $this->yearly_price_cents,
            'currency' => $this->currency,
            'description' => $this->description,
            'cta_label' => $this->cta_label,
            'cta_url' => $this->cta_url,
            'external_signup_url' => $this->external_signup_url,
            'is_featured' => (bool) $this->is_featured,
            'order' => (int) $this->order,
            'features' => $this->features ?? [],
            'limits' => $this->limits ?? [],
            'comparison_note' => $this->comparison_note,
        ];
    }
}
