<?php

namespace App\Jobs\Marketing;

use App\Mail\Marketing\NewMarketingLeadMail;
use App\Mail\Marketing\NewsletterWelcomeMail;
use App\Mail\Marketing\WaitlistConfirmationMail;
use App\Models\Marketing\Lead;
use App\Services\Marketing\SlackLeadNotifier;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ProcessNewMarketingLead implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $backoff = 30;

    public function __construct(public readonly int $leadId)
    {
    }

    public function handle(SlackLeadNotifier $slack): void
    {
        $lead = Lead::find($this->leadId);
        if ($lead === null) {
            return;
        }

        $internalRecipient = (string) (env('MARKETING_NOTIFY_EMAIL') ?: 'sales@alliances.pro');

        $this->safely('internal-email', fn () =>
            Mail::to($internalRecipient)->send(new NewMarketingLeadMail($lead)),
        );

        $this->safely('slack', fn () => $slack->notify($lead));

        if ($lead->source === 'newsletter') {
            $this->safely('newsletter-welcome', fn () =>
                Mail::to($lead->email)->send(new NewsletterWelcomeMail($lead)),
            );
        }

        if ($lead->source === 'waitlist') {
            $this->safely('waitlist-confirmation', fn () =>
                Mail::to($lead->email)->send(new WaitlistConfirmationMail($lead)),
            );
        }

        $lead->forceFill(['notified_at' => now()])->save();
    }

    protected function safely(string $channel, callable $callback): void
    {
        try {
            $callback();
        } catch (Throwable $e) {
            Log::warning("ProcessNewMarketingLead[{$channel}] failed: ".$e->getMessage(), [
                'lead_id' => $this->leadId,
                'channel' => $channel,
                'exception' => $e::class,
            ]);
        }
    }
}
