<x-filament-panels::page>
    <div class="space-y-8">
        {{-- Lead totals --}}
        <section>
            <h2 class="fi-section-header-heading text-base font-semibold leading-6 text-gray-950 dark:text-white">
                Marketing leads
            </h2>
            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Last 7 days</p>
                    <p class="mt-2 text-3xl font-bold text-gray-950 dark:text-white">{{ $totals['last_7d'] }}</p>
                </div>
                <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Last 30 days</p>
                    <p class="mt-2 text-3xl font-bold text-gray-950 dark:text-white">{{ $totals['last_30d'] }}</p>
                </div>
                <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900 sm:col-span-2 lg:col-span-2">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Most-viewed pages</p>
                    <p class="mt-2 text-sm italic text-gray-500 dark:text-gray-400">{{ $pageViewsPlaceholder }}</p>
                </div>
            </div>

            <div class="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                <table class="w-full divide-y divide-gray-200 text-sm dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800/40">
                        <tr class="text-left">
                            <th class="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Source</th>
                            <th class="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">Last 7d</th>
                            <th class="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">Last 30d</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                        @foreach ($bySource as $row)
                            <tr>
                                <td class="px-4 py-2 capitalize text-gray-900 dark:text-gray-100">
                                    {{ str_replace('_', ' ', $row['source']) }}
                                </td>
                                <td class="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{{ $row['last_7d'] }}</td>
                                <td class="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{{ $row['last_30d'] }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </section>

        {{-- Unpublished content --}}
        @if (!empty($unpublishedCounts))
            <section>
                <h2 class="text-base font-semibold leading-6 text-gray-950 dark:text-white">
                    Pending unpublished content
                </h2>
                <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    @foreach ($unpublishedCounts as $type => $count)
                        <div class="rounded-xl border border-amber-300/40 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-900/10">
                            <p class="text-sm text-amber-700 dark:text-amber-200">{{ $type }}</p>
                            <p class="mt-1 text-2xl font-bold text-amber-900 dark:text-amber-100">{{ $count }}</p>
                        </div>
                    @endforeach
                </div>
            </section>
        @endif

        {{-- Recent leads quick view --}}
        @if ($recentLeads->isNotEmpty())
            <section>
                <h2 class="text-base font-semibold leading-6 text-gray-950 dark:text-white">
                    Latest 5 leads
                </h2>
                <ul class="mt-3 divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
                    @foreach ($recentLeads as $lead)
                        <li class="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                            <div class="min-w-0">
                                <p class="truncate font-medium text-gray-900 dark:text-gray-100">{{ $lead->name ?? '—' }}</p>
                                <p class="truncate text-xs text-gray-500 dark:text-gray-400">{{ $lead->email }}</p>
                            </div>
                            <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                {{ str_replace('_', ' ', $lead->source) }}
                            </span>
                            <span class="hidden text-xs text-gray-500 sm:block dark:text-gray-400">
                                {{ $lead->created_at?->diffForHumans() }}
                            </span>
                        </li>
                    @endforeach
                </ul>
            </section>
        @endif

        {{-- Quick links --}}
        <section>
            <h2 class="text-base font-semibold leading-6 text-gray-950 dark:text-white">
                Quick links
            </h2>
            <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                @foreach ($quickLinks as $link)
                    <a
                        href="{{ $link['url'] }}"
                        class="block rounded-xl border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 transition hover:border-amber-400 hover:bg-amber-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-amber-500/40 dark:hover:bg-amber-900/10"
                    >
                        {{ $link['label'] }}
                    </a>
                @endforeach
            </div>
        </section>
    </div>
</x-filament-panels::page>
