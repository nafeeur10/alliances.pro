<?php

namespace App\Mail\Marketing;

use App\Models\Marketing\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewMarketingLeadMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly Lead $lead)
    {
    }

    public function envelope(): Envelope
    {
        $sourceLabel = match ($this->lead->source) {
            'contact_form' => 'contact',
            'demo_form' => 'demo',
            'newsletter' => 'newsletter',
            'waitlist' => 'waitlist',
            default => (string) $this->lead->source,
        };

        $name = $this->lead->name ?: $this->lead->email;
        $company = $this->lead->company ? " ({$this->lead->company})" : '';

        return new Envelope(
            subject: "🚀 New {$sourceLabel} lead — {$name}{$company}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.marketing.new-lead',
            with: ['lead' => $this->lead],
        );
    }
}
