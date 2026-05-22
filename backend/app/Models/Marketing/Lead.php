<?php

namespace App\Models\Marketing;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    /** @use HasFactory<\Database\Factories\Marketing\LeadFactory> */
    use HasFactory;

    protected $table = 'marketing_leads';

    protected $fillable = [
        'name',
        'email',
        'company',
        'team_size',
        'message',
        'source',
        'waitlist_for',
        'ip_address',
        'user_agent',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'referrer_url',
        'consent_given',
        'notified_at',
        'processed_at',
    ];

    protected function casts(): array
    {
        return [
            'consent_given' => 'boolean',
            'notified_at' => 'datetime',
            'processed_at' => 'datetime',
        ];
    }
}
