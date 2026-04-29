<?php

namespace App\Services\Marketing;

use App\Models\Marketing\Lead;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class SlackLeadNotifier
{
    public function __construct(protected ?string $webhookUrl = null)
    {
        $this->webhookUrl ??= (string) env('SLACK_MARKETING_WEBHOOK', '');
    }

    public function isConfigured(): bool
    {
        return $this->webhookUrl !== '' && filter_var($this->webhookUrl, FILTER_VALIDATE_URL) !== false;
    }

    public function notify(Lead $lead): bool
    {
        if (! $this->isConfigured()) {
            return false;
        }

        $response = Http::timeout(5)->asJson()->post($this->webhookUrl, $this->buildPayload($lead));

        return $response->successful();
    }

    /**
     * @return array<string, mixed>
     */
    protected function buildPayload(Lead $lead): array
    {
        $appUrl = rtrim((string) config('app.url', env('APP_URL', '')), '/');
        $leadUrl = $appUrl !== '' ? "{$appUrl}/admin/marketing-leads/{$lead->id}" : '#';

        $sourceLabel = match ($lead->source) {
            'contact_form' => 'contact form',
            'demo_form' => 'demo request',
            'newsletter' => 'newsletter signup',
            'waitlist' => 'waitlist signup',
            default => (string) $lead->source,
        };

        $messagePreview = Str::limit((string) ($lead->message ?? ''), 200);

        $blocks = [
            [
                'type' => 'header',
                'text' => [
                    'type' => 'plain_text',
                    'text' => "📥 New {$sourceLabel} from " . ($lead->name ?? $lead->email),
                ],
            ],
        ];

        $blocks[] = [
            'type' => 'section',
            'fields' => array_values(array_filter([
                ['type' => 'mrkdwn', 'text' => "*Email:*\n{$lead->email}"],
                $lead->company
                    ? ['type' => 'mrkdwn', 'text' => "*Company:*\n{$lead->company}"]
                    : null,
                $lead->team_size
                    ? ['type' => 'mrkdwn', 'text' => "*Team size:*\n{$lead->team_size}"]
                    : null,
                $lead->waitlist_for
                    ? ['type' => 'mrkdwn', 'text' => "*Waitlist:*\n{$lead->waitlist_for}"]
                    : null,
            ])),
        ];

        if ($messagePreview !== '') {
            $blocks[] = [
                'type' => 'section',
                'text' => [
                    'type' => 'mrkdwn',
                    'text' => "*Message:*\n> {$messagePreview}",
                ],
            ];
        }

        $blocks[] = [
            'type' => 'actions',
            'elements' => [
                [
                    'type' => 'button',
                    'text' => ['type' => 'plain_text', 'text' => 'View in admin'],
                    'url' => $leadUrl,
                ],
            ],
        ];

        return ['blocks' => $blocks];
    }
}
