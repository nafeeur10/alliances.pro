<?php

namespace App\Models\Marketing;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PageSection extends Model
{
    /** @use HasFactory<\Database\Factories\Marketing\PageSectionFactory> */
    use HasFactory;

    protected $table = 'marketing_page_sections';

    protected $fillable = [
        'page_id',
        'key',
        'order',
        'type',
        'payload',
        'is_visible',
    ];

    protected function casts(): array
    {
        return [
            'payload' => 'array',
            'is_visible' => 'boolean',
            'order' => 'integer',
        ];
    }

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }
}
