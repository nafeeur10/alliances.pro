<?php

namespace App\Observers\Marketing;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class MarketingCacheObserver
{
    public function saved(Model $model): void
    {
        $this->flush();
    }

    public function deleted(Model $model): void
    {
        $this->flush();
    }

    public function restored(Model $model): void
    {
        $this->flush();
    }

    protected function flush(): void
    {
        $store = Cache::getStore();
        if (method_exists($store, 'tags')) {
            Cache::tags(['marketing'])->flush();
            return;
        }

        // Fallback for stores without tag support — best-effort flush of the whole cache.
        Cache::flush();
    }
}
