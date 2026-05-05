<?php

namespace App\Providers;

use App\Models\Marketing\BlogPost;
use App\Models\Marketing\PricingPlan;
use App\Observers\Marketing\MarketingCacheObserver;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /** @var list<class-string> */
    protected array $marketingObservedModels = [
        PricingPlan::class,
        BlogPost::class,
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        RateLimiter::for('marketing-public', fn (Request $request): Limit =>
            Limit::perMinute(120)->by($request->ip()),
        );

        RateLimiter::for('marketing-leads', fn (Request $request): Limit =>
            Limit::perMinute(30)->by($request->ip()),
        );

        foreach ($this->marketingObservedModels as $model) {
            $model::observe(MarketingCacheObserver::class);
        }
    }
}
