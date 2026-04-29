<?php

use App\Models\Marketing\Page;
use App\Models\Marketing\PageSection;

beforeEach(function (): void {
    $this->page = Page::create([
        'slug' => 'home',
        'title' => 'Home',
        'meta_title' => 'Home — Alliances PRO',
        'meta_description' => 'Marketing site homepage.',
        'is_published' => true,
        'published_at' => now(),
    ]);

    PageSection::create([
        'page_id' => $this->page->id,
        'key' => 'hero',
        'order' => 0,
        'type' => 'hero',
        'payload' => ['headline' => 'Hello'],
        'is_visible' => true,
    ]);

    PageSection::create([
        'page_id' => $this->page->id,
        'key' => 'hidden',
        'order' => 1,
        'type' => 'custom',
        'payload' => ['secret' => true],
        'is_visible' => false,
    ]);
});

it('returns the homepage with sections and the expected shape', function (): void {
    $response = $this->getJson('/api/v1/marketing/pages/home');

    $response->assertOk()
        ->assertJsonStructure([
            'data' => [
                'id', 'slug', 'title', 'meta_title', 'meta_description',
                'og_image', 'is_published', 'published_at',
                'sections' => [['id', 'key', 'order', 'type', 'payload', 'is_visible']],
            ],
            'meta' => ['cached_at'],
        ])
        ->assertJsonPath('data.slug', 'home')
        ->assertJsonCount(1, 'data.sections');
});

it('returns 404 for an unknown slug', function (): void {
    $this->getJson('/api/v1/marketing/pages/nonexistent')->assertNotFound();
});

it('hides unpublished pages', function (): void {
    $this->page->update(['is_published' => false]);
    $this->getJson('/api/v1/marketing/pages/home')->assertNotFound();
});
