<?php

namespace App\Filament\Pages;

use App\Models\Marketing\BlogPost;
use App\Models\Marketing\Lead;
use App\Models\Marketing\PricingPlan;
use BackedEnum;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Carbon;

class MarketingDashboard extends Page
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedChartBar;

    protected static string|\UnitEnum|null $navigationGroup = 'Marketing';

    protected static ?int $navigationSort = -10;

    protected static ?string $navigationLabel = 'Dashboard';

    protected static ?string $title = 'Marketing Dashboard';

    protected string $view = 'filament.pages.marketing-dashboard';

    /**
     * @return array<string, mixed>
     */
    protected function getViewData(): array
    {
        $sevenDaysAgo = Carbon::now()->subDays(7);
        $thirtyDaysAgo = Carbon::now()->subDays(30);

        $leadsBySource = function (Carbon $since): array {
            return Lead::query()
                ->where('created_at', '>=', $since)
                ->selectRaw('source, COUNT(*) as total')
                ->groupBy('source')
                ->pluck('total', 'source')
                ->all();
        };

        $sources = ['contact_form', 'demo_form', 'newsletter', 'waitlist'];
        $sevenDayCounts = $leadsBySource($sevenDaysAgo);
        $thirtyDayCounts = $leadsBySource($thirtyDaysAgo);

        $bySource = collect($sources)->map(fn (string $s): array => [
            'source' => $s,
            'last_7d' => (int) ($sevenDayCounts[$s] ?? 0),
            'last_30d' => (int) ($thirtyDayCounts[$s] ?? 0),
        ])->all();

        $totals = [
            'last_7d' => array_sum(array_column($bySource, 'last_7d')),
            'last_30d' => array_sum(array_column($bySource, 'last_30d')),
        ];

        $unpublishedCounts = [
            'Pricing plans' => PricingPlan::query()->where('is_published', false)->count(),
            'Blog posts' => BlogPost::query()->where('is_published', false)->count(),
        ];

        $recentLeads = Lead::query()
            ->latest()
            ->limit(5)
            ->get(['id', 'name', 'email', 'source', 'created_at']);

        $quickLinks = [
            ['label' => 'Pricing plans', 'icon' => 'currency-dollar', 'url' => url('/admin/marketing/pricing-plans')],
            ['label' => 'Blog posts', 'icon' => 'newspaper', 'url' => url('/admin/marketing/blog-posts')],
            ['label' => 'Leads', 'icon' => 'users', 'url' => url('/admin/marketing/leads')],
            ['label' => 'Site settings', 'icon' => 'cog', 'url' => url('/admin/marketing/site-settings')],
        ];

        return [
            'totals' => $totals,
            'bySource' => $bySource,
            'unpublishedCounts' => array_filter($unpublishedCounts, fn (int $n): bool => $n > 0),
            'recentLeads' => $recentLeads,
            'quickLinks' => $quickLinks,
            'pageViewsPlaceholder' => 'Wire to Plausible / Plausible Analytics for production view counts.',
        ];
    }
}
