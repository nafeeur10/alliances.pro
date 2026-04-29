<?php

namespace App\Providers;

use App\Models\Marketing\BlogPost;
use App\Models\Marketing\Comparison;
use App\Models\Marketing\Faq;
use App\Models\Marketing\Feature;
use App\Models\Marketing\Industry;
use App\Models\Marketing\Integration;
use App\Models\Marketing\Page;
use App\Models\Marketing\PageSection;
use App\Models\Marketing\PricingPlan;
use App\Models\Marketing\SiteSetting;
use App\Models\Marketing\Testimonial;
use App\Observers\Marketing\MarketingCacheObserver;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /** @var list<class-string> */
    protected array $marketingObservedModels = [
        Page::class,
        PageSection::class,
        Feature::class,
        Industry::class,
        PricingPlan::class,
        Faq::class,
        Testimonial::class,
        Comparison::class,
        Integration::class,
        SiteSetting::class,
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
