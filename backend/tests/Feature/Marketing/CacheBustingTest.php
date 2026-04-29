<?php

use App\Models\Marketing\Page;
use App\Models\Marketing\PageSection;
use Illuminate\Support\Facades\Cache;

it('busts the marketing cache tag when a Page is updated', function (): void {
    $page = Page::create([
        'slug' => 'home',
        'title' => 'Home v1',
        'is_published' => true,
        'published_at' => now(),
    ]);
    PageSection::create([
        'page_id' => $page->id,
        'key' => 'hero',
        'order' => 0,
        'type' => 'hero',
        'payload' => ['headline' => 'v1'],
        'is_visible' => true,
    ]);

    $first = $this->getJson('/api/v1/marketing/pages/home');
    $first->assertOk()->assertJsonPath('data.title', 'Home v1');

    expect(Cache::tags(['marketing'])->get('page:home'))->not->toBeNull();

    $page->update(['title' => 'Home v2']);

    expect(Cache::tags(['marketing'])->get('page:home'))->toBeNull();

    $second = $this->getJson('/api/v1/marketing/pages/home');
    $second->assertOk()->assertJsonPath('data.title', 'Home v2');
});
