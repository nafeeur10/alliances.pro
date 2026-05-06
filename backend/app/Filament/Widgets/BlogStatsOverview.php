<?php

namespace App\Filament\Widgets;

use App\Models\Marketing\BlogPost;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Carbon;

class BlogStatsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = 2;

    protected function getStats(): array
    {
        $totals = BlogPost::query()
            ->selectRaw("
                count(*) as total,
                sum(case when status = 'published' then 1 else 0 end) as published,
                sum(case when status = 'draft' then 1 else 0 end) as draft,
                sum(case when status = 'scheduled' then 1 else 0 end) as scheduled,
                sum(views_count) as total_views
            ")
            ->first();

        $monthStart = Carbon::now()->startOfMonth();
        $viewsThisMonth = (int) BlogPost::query()
            ->where('updated_at', '>=', $monthStart)
            ->sum('views_count');

        return [
            Stat::make('Published', (int) ($totals->published ?? 0))
                ->description((int) ($totals->draft ?? 0) . ' drafts · ' . (int) ($totals->scheduled ?? 0) . ' scheduled')
                ->color('success'),

            Stat::make('Total views', number_format((int) ($totals->total_views ?? 0)))
                ->description('Across all posts'),

            Stat::make('Views this month', number_format($viewsThisMonth))
                ->description('Updated since ' . $monthStart->format('M j'))
                ->color('info'),
        ];
    }
}
