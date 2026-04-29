<?php

namespace App\Models\Marketing;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Comparison extends Model
{
    /** @use HasFactory<\Database\Factories\Marketing\ComparisonFactory> */
    use HasFactory;
    use HasSlug;

    protected $table = 'marketing_comparisons';

    protected $fillable = [
        'slug',
        'competitor_name',
        'headline',
        'body',
        'winner_summary',
        'comparison_table',
        'seo_title',
        'seo_description',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'comparison_table' => 'array',
            'is_published' => 'boolean',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('competitor_name')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
