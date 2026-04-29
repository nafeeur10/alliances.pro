<?php

use App\Http\Controllers\Api\Marketing\GetSettings;
use App\Http\Controllers\Api\Marketing\LeadController;
use App\Http\Controllers\Api\Marketing\GetSitemap;
use App\Http\Controllers\Api\Marketing\ListBlogPosts;
use App\Http\Controllers\Api\Marketing\ListComparisons;
use App\Http\Controllers\Api\Marketing\ListFaqs;
use App\Http\Controllers\Api\Marketing\ListFeatures;
use App\Http\Controllers\Api\Marketing\ListIndustries;
use App\Http\Controllers\Api\Marketing\ListIntegrations;
use App\Http\Controllers\Api\Marketing\ListPricingPlans;
use App\Http\Controllers\Api\Marketing\ListTestimonials;
use App\Http\Controllers\Api\Marketing\ShowBlogPost;
use App\Http\Controllers\Api\Marketing\ShowComparison;
use App\Http\Controllers\Api\Marketing\ShowFeature;
use App\Http\Controllers\Api\Marketing\ShowIndustry;
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

        Route::get('features', ListFeatures::class)->name('features.index');
        Route::get('features/{slug}', ShowFeature::class)->name('features.show');

        Route::get('industries', ListIndustries::class)->name('industries.index');
        Route::get('industries/{slug}', ShowIndustry::class)->name('industries.show');

        Route::get('pricing-plans', ListPricingPlans::class)->name('pricing-plans.index');
        Route::get('faqs', ListFaqs::class)->name('faqs.index');
        Route::get('testimonials', ListTestimonials::class)->name('testimonials.index');

        Route::get('comparisons', ListComparisons::class)->name('comparisons.index');
        Route::get('comparisons/{slug}', ShowComparison::class)->name('comparisons.show');

        Route::get('integrations', ListIntegrations::class)->name('integrations.index');

        Route::get('blog', ListBlogPosts::class)->name('blog.index');
        Route::get('blog/{slug}', ShowBlogPost::class)->name('blog.show');

        Route::get('settings', GetSettings::class)->name('settings.index');
        Route::get('sitemap', GetSitemap::class)->name('sitemap.index');
    });
