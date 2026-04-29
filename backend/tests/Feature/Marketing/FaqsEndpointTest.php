<?php

use App\Models\Marketing\Faq;

it('groups faqs by category', function (): void {
    Faq::create(['question' => 'Q1', 'answer' => 'A1', 'category' => 'Pricing', 'is_published' => true, 'order' => 0]);
    Faq::create(['question' => 'Q2', 'answer' => 'A2', 'category' => 'Pricing', 'is_published' => true, 'order' => 1]);
    Faq::create(['question' => 'Q3', 'answer' => 'A3', 'category' => 'Trial', 'is_published' => true, 'order' => 0]);
    Faq::create(['question' => 'Q-hidden', 'answer' => 'hidden', 'category' => 'Pricing', 'is_published' => false, 'order' => 99]);
    Faq::create(['question' => 'Q-uncat', 'answer' => 'A4', 'category' => null, 'is_published' => true, 'order' => 0]);

    $response = $this->getJson('/api/v1/marketing/faqs');

    $response->assertOk();
    $data = $response->json('data');

    expect($data)->toHaveKeys(['Pricing', 'Trial', 'Other']);
    expect($data['Pricing'])->toHaveCount(2);
    expect($data['Trial'])->toHaveCount(1);
    expect($data['Other'])->toHaveCount(1);

    $pricingQuestions = collect($data['Pricing'])->pluck('question')->all();
    expect($pricingQuestions)->not->toContain('Q-hidden');
});
