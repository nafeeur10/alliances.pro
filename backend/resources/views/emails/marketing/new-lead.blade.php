@props(['lead'])

<x-mail::message>
# 📥 New {{ str_replace('_', ' ', $lead->source) }} lead

A new lead just came in via the marketing site.

**Name:** {{ $lead->name ?? '—' }}
**Email:** {{ $lead->email }}
@if ($lead->company)
**Company:** {{ $lead->company }}
@endif
@if ($lead->team_size)
**Team size:** {{ $lead->team_size }}
@endif
@if ($lead->waitlist_for)
**Waitlist:** {{ $lead->waitlist_for }}
@endif
**Source:** {{ $lead->source }}
**Submitted:** {{ optional($lead->created_at)->format('Y-m-d H:i') }} UTC
**IP:** {{ $lead->ip_address ?? '—' }}

@if (filled($lead->message))
## Message

> {{ $lead->message }}
@endif

<x-mail::button :url="rtrim(config('app.url'), '/').'/admin/marketing-leads/'.$lead->id">
View in admin
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
