<?php

namespace App\Models\Marketing;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SiteSetting extends Model
{
    /** @use HasFactory<\Database\Factories\Marketing\SiteSettingFactory> */
    use HasFactory;

    protected $table = 'marketing_site_settings';

    protected $fillable = [
        'key',
        'value',
        'group',
        'type',
    ];

    public static function get(string $key, mixed $default = null): mixed
    {
        $row = static::where('key', $key)->first();
        return $row?->castedValue() ?? $default;
    }

    public function castedValue(): mixed
    {
        return match ($this->type) {
            'bool' => filter_var($this->value, FILTER_VALIDATE_BOOLEAN),
            'json' => json_decode((string) $this->value, true),
            default => $this->value,
        };
    }
}
