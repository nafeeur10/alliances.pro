<?php

use App\Jobs\Marketing\ProcessNewMarketingLead;
use App\Models\Marketing\Lead;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Queue;

function basePayload(array $overrides = []): array
{
    return array_replace([
        'source' => 'contact_form',
        'name' => 'Ada Lovelace',
        'email' => 'ada@example.com',
        'company' => 'Analytical Engines',
        'team_size' => '2-10',
        'message' => 'I would like to talk about your CRM.',
        'consent_given' => true,
        'recaptcha_token' => 'test-token',
        'honeypot' => '',
    ], $overrides);
}

beforeEach(function (): void {
    Cache::flush();
});

it('accepts a valid contact_form payload', function (): void {
    Queue::fake();

    $response = $this->postJson('/api/v1/marketing/leads', basePayload());

    $response->assertCreated()
        ->assertJsonStructure(['data' => ['id', 'source', 'received_at']])
        ->assertJsonPath('data.source', 'contact_form');

    $this->assertDatabaseHas('marketing_leads', [
        'email' => 'ada@example.com',
        'source' => 'contact_form',
        'consent_given' => 1,
    ]);
});

it('rejects when honeypot is filled', function (): void {
    Queue::fake();

    $this->postJson('/api/v1/marketing/leads', basePayload(['honeypot' => 'bot-text']))
        ->assertStatus(422)
        ->assertJsonValidationErrors(['honeypot']);

    $this->assertDatabaseCount('marketing_leads', 0);
    Queue::assertNothingPushed();
});

it('rejects when consent_given is false', function (): void {
    $this->postJson('/api/v1/marketing/leads', basePayload(['consent_given' => false]))
        ->assertStatus(422)
        ->assertJsonValidationErrors(['consent_given']);
});

it('rejects without recaptcha token when source=contact_form', function (): void {
    $this->postJson('/api/v1/marketing/leads', basePayload(['recaptcha_token' => null]))
        ->assertStatus(422)
        ->assertJsonValidationErrors(['recaptcha_token']);
});

it('is idempotent within 60 minutes per email+source', function (): void {
    Queue::fake();

    $first = $this->postJson('/api/v1/marketing/leads', basePayload());
    $first->assertCreated();
    $firstId = $first->json('data.id');

    $second = $this->postJson('/api/v1/marketing/leads', basePayload());
    $second->assertOk()
        ->assertJsonPath('data.id', $firstId);

    expect(Lead::where('email', 'ada@example.com')->count())->toBe(1);
    Queue::assertPushed(ProcessNewMarketingLead::class, 1);
});

it('queues the ProcessNewMarketingLead job on creation', function (): void {
    Queue::fake();

    $this->postJson('/api/v1/marketing/leads', basePayload())->assertCreated();

    Queue::assertPushed(ProcessNewMarketingLead::class, function (ProcessNewMarketingLead $job): bool {
        return Lead::find($job->leadId)?->email === 'ada@example.com';
    });
});

it('throttles after 30 requests in a minute from the same IP', function (): void {
    Queue::fake();

    for ($i = 0; $i < 30; $i++) {
        $this->postJson('/api/v1/marketing/leads', basePayload([
            'email' => "throttle-{$i}@example.com",
        ]))->assertCreated();
    }

    $this->postJson('/api/v1/marketing/leads', basePayload([
        'email' => 'over-the-limit@example.com',
    ]))->assertStatus(429);
});
