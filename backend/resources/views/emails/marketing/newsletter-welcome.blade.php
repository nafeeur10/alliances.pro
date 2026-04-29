@props(['lead'])

<x-mail::message>
# Welcome to the Alliances PRO playbook

Thanks for subscribing{{ $lead->name ? ', '.$lead->name : '' }} — you're on the list.

Once a month you'll get:

- **One practical playbook** — pipelines, campaigns, agency ops.
- **One product update** — what shipped, what's next.
- **Zero fluff.**

While you're here, take a look at the platform:

<x-mail::button :url="rtrim(config('app.url'), '/').'/'">
See Alliances PRO
</x-mail::button>

If this isn't what you signed up for, just hit reply and we'll remove you immediately.

— The Alliances PRO team
</x-mail::message>
