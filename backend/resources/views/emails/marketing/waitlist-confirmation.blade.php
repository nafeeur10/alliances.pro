@props(['lead', 'waitlistLabel'])

<x-mail::message>
# You're on the {{ $waitlistLabel }} waitlist

Thanks{{ $lead->name ? ', '.$lead->name : '' }} — we've got you saved for early access to **{{ $waitlistLabel }}**.

Here's what happens next:

- We'll email you the moment private beta opens.
- Beta access is **free** for waitlisted accounts.
- We'll never share your email with anyone, ever.

Want to use Alliances PRO Sales today while you wait? It's already live:

<x-mail::button :url="rtrim(config('app.url'), '/').'/'">
Try Alliances PRO Sales
</x-mail::button>

Talk soon,<br>
The Alliances PRO team
</x-mail::message>
