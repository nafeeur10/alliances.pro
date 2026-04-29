<?php

namespace App\Mail\Marketing;

use App\Models\Marketing\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WaitlistConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly Lead $lead)
    {
    }

    public function envelope(): Envelope
    {
        $waitlistLabel = $this->humanWaitlistLabel();

        return new Envelope(
            subject: "You're on the {$waitlistLabel} waitlist",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.marketing.waitlist-confirmation',
            with: [
                'lead' => $this->lead,
                'waitlistLabel' => $this->humanWaitlistLabel(),
            ],
        );
    }

    protected function humanWaitlistLabel(): string
    {
        return match ($this->lead->waitlist_for) {
            'education_crm' => 'Education CRM',
            'real_estate_crm' => 'Real Estate CRM',
            'healthcare_crm' => 'Healthcare CRM',
            default => 'Alliances PRO',
        };
    }
}
