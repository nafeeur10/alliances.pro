<?php

use App\Http\Controllers\Api\Marketing\GetSettings;
use App\Http\Controllers\Api\Marketing\LeadController;
use App\Http\Controllers\Api\Marketing\GetSitemap;
use App\Http\Controllers\Api\Marketing\ListBlogPageData;
use App\Http\Controllers\Api\Marketing\ListBlogPosts;
use App\Http\Controllers\Api\Marketing\ListPricingPlans;
use App\Http\Controllers\Api\Marketing\ShowBlogPost;
use App\Http\Controllers\Api\Marketing\ShowPage;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/marketing')
    ->middleware(['throttle:marketing-public'])
    ->name('marketing.')
    ->group(function (): void {
        Route::post('leads', LeadController::class)
            ->middleware('throttle:marketing-leads')
            ->name('leads.store');

        Route::get('pages/{slug}', ShowPage::class)->name('pages.show');

        Route::get('pricing-plans', ListPricingPlans::class)->name('pricing-plans.index');

        Route::get('blog', ListBlogPosts::class)->name('blog.index');
        Route::get('blog/page-data', ListBlogPageData::class)->name('blog.page-data');
        Route::get('blog/{slug}', ShowBlogPost::class)->name('blog.show');

        Route::get('settings', GetSettings::class)->name('settings.index');
        Route::get('sitemap', GetSitemap::class)->name('sitemap.index');
    });
