<?php

use App\Models\Marketing\PricingPlan;

it('returns published plans in order, omitting unpublished ones', function (): void {
    PricingPlan::create([
        'name' => 'Business', 'slug' => 'business',
        'monthly_price_cents' => 3900, 'yearly_price_cents' => 39000,
        'is_published' => true, 'order' => 2,
    ]);
    PricingPlan::create([
        'name' => 'Pro', 'slug' => 'pro',
        'monthly_price_cents' => 1900, 'yearly_price_cents' => 19000,
        'is_published' => true, 'order' => 1,
    ]);
    PricingPlan::create([
        'name' => 'Hidden', 'slug' => 'hidden',
        'monthly_price_cents' => 9900, 'yearly_price_cents' => 99000,
        'is_published' => false, 'order' => 3,
    ]);

    $response = $this->getJson('/api/v1/marketing/pricing-plans');

    $response->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonPath('data.0.slug', 'pro')
        ->assertJsonPath('data.1.slug', 'business');

    expect(collect($response->json('data'))->pluck('slug')->all())
        ->not->toContain('hidden');
});
