<?php

namespace App\Models\Marketing;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class PricingPlan extends Model
{
    /** @use HasFactory<\Database\Factories\Marketing\PricingPlanFactory> */
    use HasFactory;
    use HasSlug;

    protected $table = 'marketing_pricing_plans';

    protected $fillable = [
        'name',
        'slug',
        'monthly_price_cents',
        'yearly_price_cents',
        'currency',
        'description',
        'cta_label',
        'cta_url',
        'is_featured',
        'is_published',
        'order',
        'features',
        'limits',
        'comparison_note',
        'external_signup_url',
    ];

    protected function casts(): array
    {
        return [
            'monthly_price_cents' => 'integer',
            'yearly_price_cents' => 'integer',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'order' => 'integer',
            'features' => 'array',
            'limits' => 'array',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }
}
