# Alliances PRO — Production launch checklist

Single source of truth for what has to be true before flipping DNS to the
live marketing site. Tick boxes as they're verified in the live environment,
not just in code.

## 1. Environment variables

### Frontend (`frontend/.env`)

| Var | Required? | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | `https://alliances.pro` |
| `NEXT_PUBLIC_API_BASE` | yes | `https://alliances.pro/api/v1/marketing` |
| `INTERNAL_API_URL` | yes | Server-side fetch base — same as public in single-host setups |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | prod-only | reCAPTCHA v3 site key |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | prod-only | `alliances.pro` |
| `NEXT_PUBLIC_PLAUSIBLE_HOST` | optional | Defaults to `https://plausible.io` |
| `MARKETING_API_URL` | optional | Build-time override for next-sitemap |

### Backend (`backend/.env`)

| Var | Required? | Notes |
|---|---|---|
| `APP_KEY` | yes | `php artisan key:generate` once per env |
| `APP_URL` | yes | `https://alliances.pro` |
| `APP_ENV` | yes | `production` |
| `APP_DEBUG` | yes | `false` in prod |
| `DB_*` | yes | Real production MySQL — NOT the dev container |
| `REDIS_*` | yes | Production Redis (managed or self-hosted) |
| `MAIL_*` | yes | Real SMTP (Postmark, SES, etc.) — NOT mailpit |
| `MAIL_FROM_ADDRESS` | yes | `hello@alliances.pro` |
| `MARKETING_NOTIFY_EMAIL` | yes | `sales@alliances.pro` |
| `APP_MARKETING_ORIGINS` | yes | CSV of allowed CORS origins |
| `RECAPTCHA_SECRET` | yes | reCAPTCHA v3 secret (matches public site key) |
| `SLACK_MARKETING_WEBHOOK` | optional | Slack incoming webhook for lead notifications |
| `SENTRY_LARAVEL_DSN` | yes | Error reporting |
| `SENTRY_TRACES_SAMPLE_RATE` | yes | `0.1` (10%) is a safe prod default |

## 2. Pre-launch infrastructure

- [ ] DNS A/AAAA records point at the production load balancer
- [ ] HTTPS enabled with automated cert renewal (Let's Encrypt or LB-managed)
- [ ] HTTP→HTTPS redirect at the load balancer / nginx
- [ ] CDN / static cache rules for `/_next/static/**` (immutable, 1y)
- [ ] Backups: nightly MySQL dump retained ≥ 30 days
- [ ] Monitoring: Sentry receiving events from frontend + backend
- [ ] Uptime: BetterStack / UptimeRobot pinging `/up` (Laravel health) every minute

## 3. Marketing surface

- [ ] Sitemap accessible at `https://alliances.pro/sitemap.xml`
- [ ] Submitted sitemap to Google Search Console
- [ ] Submitted sitemap to Bing Webmaster Tools
- [ ] `robots.txt` blocks `/admin`, `/api`, `/preview` (verified live)
- [ ] OG image renders for every page (test 3 random URLs in
  https://www.opengraph.xyz/)
- [ ] JSON-LD validates clean (https://validator.schema.org/)
- [ ] Lighthouse SEO ≥ 95, Performance ≥ 90 on mobile for /, /pricing,
  /industries/shopify-agencies, /compare/hubspot, /blog

## 4. Legal + compliance

- [ ] Privacy policy drafted (NOT lorem ipsum) at `/privacy`
- [ ] Terms of service drafted at `/terms`
- [ ] DPA + cookie policy if EU traffic expected
- [ ] No cookie banner needed when running Plausible alone (no GA, no FB pixel)
- [ ] Footer links to all of the above

## 5. Forms — end-to-end test from incognito

For each form, confirm: the success state appears, the lead lands in
Filament admin, the notification email arrives at MARKETING_NOTIFY_EMAIL,
and (where applicable) the customer gets the welcome / waitlist email.

- [ ] Contact form (`source: contact_form`)
- [ ] Demo request (`source: demo_form`)
- [ ] Newsletter signup (`source: newsletter`) — auto-replies welcome
- [ ] Education waitlist (`source: waitlist, waitlist_for: education_crm`)
- [ ] Honeypot blocks submissions when filled
- [ ] Missing `consent_given` returns 422
- [ ] reCAPTCHA v3 score ≥ 0.5 path tested with a real token

## 6. Browser smoke test (incognito)

- [ ] `/` loads in < 3s on slow 4G
- [ ] No layout shift on scroll (CLS < 0.1)
- [ ] All 12 navbar links work
- [ ] Light/dark theme toggle persists across pages
- [ ] Mobile (≤ 414px) — no horizontal scroll on any page
- [ ] Console clean: 0 errors, 0 warnings
- [ ] All forms submit successfully + show success state

## 7. Analytics + experiments

- [ ] Plausible recording pageviews for /, /pricing, /industries/*, /compare/*
- [ ] Plausible recording custom events: `signup_clicked`, `demo_requested`,
  `pricing_plan_clicked`, `comparison_viewed`, `contact_submitted`,
  `newsletter_subscribed`, `waitlist_joined`
- [ ] Plausible recording `experiment_assigned` and `experiment_converted`
  for `hero_headline_variant`
- [ ] A/B cookie set on first visit (`ap_experiment_hero_headline_variant`),
  persists 30 days, identical user always gets the same variant

## 8. Admin panel

- [ ] `/admin` redirects unauthenticated to `/admin/login`
- [ ] Super-admin can log in and see Marketing nav group
- [ ] Marketing Dashboard shows lead counts, pending content, latest leads
- [ ] Editing a Page in /admin invalidates the cache (curl returns updated
  content within 5s)
- [ ] `marketing_editor` role can CRUD Marketing/* but NOT touch user
  management

## 9. Launch-day rollout

- [ ] Run `php artisan optimize` + `php artisan filament:optimize` on prod
- [ ] Frontend production build deployed (`next build` + `next start` or
  Vercel)
- [ ] DNS TTL lowered to 5 min 24h before cutover
- [ ] After cutover: re-raise TTL to 1h, verify HSTS header

## 10. Post-launch (week 1)

- [ ] Daily check of Sentry for new errors
- [ ] Daily check of Plausible for traffic + custom event volume
- [ ] First A/B winner determined after ≥ 500 conversions per arm
- [ ] First batch of FAQs / blog posts / comparisons rewritten in Filament
  by the marketing team (no engineer in the loop)
