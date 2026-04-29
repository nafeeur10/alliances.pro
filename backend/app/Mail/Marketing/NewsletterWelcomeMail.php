<?php

namespace App\Mail\Marketing;

use App\Models\Marketing\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewsletterWelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly Lead $lead)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to the Alliances PRO playbook',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.marketing.newsletter-welcome',
            with: ['lead' => $this->lead],
        );
    }
}
