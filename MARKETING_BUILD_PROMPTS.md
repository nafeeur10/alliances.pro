# Alliances PRO — Marketing Site Build Prompts

> **How to use:** Each section below is a self-contained prompt. Paste one prompt into Claude Code (or any coding agent) per session. Run them in the order given. Don't skip — later prompts depend on earlier scaffolding.
>
> **Source content:** All copy comes from `MARKETING_STRATEGY.md` in this same folder. The prompts reference it.
>
> **Single self-contained repo:** Everything for the alliances.pro marketing
> site lives under `~/Projects/cosmic`. The Sales CRM at `~/Projects/crm` is
> never touched by these prompts.
>
> ```
> ~/Projects/cosmic/
> ├── frontend/    Next.js 16.2 + Tailwind 4 + shadcn/ui (cosmic theme)
> ├── backend/     Laravel 13 + Filament 5 (admin + public marketing API)
> ├── infra/
> │   └── nginx/   Reverse proxy: /admin + /api → backend, * → frontend
> └── docker-compose.yml
> ```
>
> Both apps share one MySQL + Redis + nginx stack defined in
> `cosmic/docker-compose.yml`. They're independent of the Sales CRM's docker
> stack — different containers, different database, different ports.
>
> **Bootstrap (must be done once before Prompt 1):**
> ```
> cd ~/Projects/cosmic
> docker-compose up -d mysql redis mailpit
> docker-compose run --rm --no-deps backend \
>     composer create-project laravel/laravel . "^13.0" --prefer-dist
> cp backend/.env.example backend/.env
> docker-compose run --rm --no-deps backend php artisan key:generate
> docker-compose up -d
> ```
> Full bootstrap details are in `backend/README.md`.

**Order of execution:**

1. **Prompt 1** — Backend: Add Filament 5 admin panel + content models + public API
2. **Prompt 2** — Backend: Contact form endpoint with email + Slack notification
3. **Prompt 3** — Frontend: Wire cosmic theme to Alliances PRO content + connect to API
4. **Prompt 4** — Frontend: SEO, sitemap, structured data, Open Graph
5. **Prompt 5** — Frontend: Industry pages, comparison pages, blog scaffolding
6. **Prompt 6** — Polish: Analytics, A/B test scaffolding, accessibility audit

---

## Prompt 1 — Filament admin panel + content models + public API

Paste this whole block into a fresh Claude Code session inside the `~/Projects/cosmic` repo. Run the bootstrap commands in `backend/README.md` first if you haven't already (Laravel 13 must already be installed in `cosmic/backend/`).

````
Working directory: ~/Projects/cosmic

GOAL
Build out the Filament 5 admin panel and the public marketing JSON API in the
Laravel 13 backend at ./backend so a non-technical admin can edit every piece
of marketing content rendered on alliances.pro (Next.js site at ./frontend).
Expose a versioned, public, cached JSON API that the Next.js site reads at
build/SSG time and at runtime where needed.

PROJECT STRUCTURE (already exists)
  cosmic/
    backend/             ← Laravel 13 lives here (you'll build inside this)
    frontend/            ← Next.js 16.2 (untouched in this prompt)
    infra/nginx/         ← /admin + /api → backend, * → frontend
    docker-compose.yml

BACKEND RULES
- All composer / artisan commands MUST run inside docker, e.g.
    docker-compose exec backend composer require ...
    docker-compose exec backend php artisan migrate
- Do not hand-create files Laravel would scaffold — always use artisan generators.
- Follow Laravel 13 best practices: form requests, resources, policies, jobs,
  observers, single-action controllers, typed properties, readonly classes
  where appropriate.
- This backend is dedicated to the marketing site only. There is NO multi-tenant
  workspace_id concern here — every model is global / public-content.
- Database: alliances_marketing on the marketing-stack mysql container (not the
  CRM database).

STEP 1 — Install dependencies (Filament + content stack)
docker-compose exec backend composer require \
  filament/filament:^5.0 \
  spatie/laravel-medialibrary:^11 \
  spatie/laravel-sluggable:^3 \
  bezhansalleh/filament-shield:^5
docker-compose exec backend php artisan filament:install --panels
# When asked, name the panel "admin", path "/admin"
docker-compose exec backend php artisan vendor:publish --tag=medialibrary-migrations
docker-compose exec backend php artisan vendor:publish --tag=filament-shield-config

STEP 2 — Models, migrations, factories, seeders
Create these models. Use artisan: `php artisan make:model Foo -mfs` (model +
migration + factory + seeder). All models live in app/Models/Marketing/* and
table names should be prefixed `marketing_*` (e.g. marketing_pages).

  app/Models/Marketing/Page.php
    Fields: id, slug (unique), title, meta_title, meta_description, og_image,
            is_published (bool), published_at, created_at, updated_at
    Implements: HasMedia (Spatie media library) for og_image
    Used for: /, /about, /security, custom landing pages

  app/Models/Marketing/PageSection.php
    Fields: id, page_id (FK), key (e.g. "hero"), order (int), type (enum:
            hero, benefits, features, services, trust, testimonial, team,
            pricing, community, contact, faq, newsletter, custom),
            payload (JSON — section-specific content), is_visible (bool)
    Belongs to Page. Cast payload to array.

  app/Models/Marketing/Feature.php
    Fields: id, slug, name, tagline, body (long text), icon (string —
            lucide-react icon name), order, is_published, seo_title,
            seo_description
    Used for: /features and /features/{slug} pages.

  app/Models/Marketing/Industry.php
    Fields: id, slug, name, headline, subheadline, body (rich text), icon,
            cover_image, is_published, order, seo_title, seo_description
    Used for: /industries/{slug} (shopify-agencies, sales-teams, freelancers,
    education).

  app/Models/Marketing/PricingPlan.php
    Fields: id, name, slug, monthly_price_cents, yearly_price_cents, currency
            (default USD), description, cta_label, cta_url, is_featured,
            is_published, order, features (JSON array of strings),
            limits (JSON), comparison_note (e.g. "$X less than HubSpot"),
            external_signup_url (where the CTA points — typically the Sales CRM
            signup page or LemonSqueezy checkout URL)
    NOTE: This is the MARKETING display model only. The real billing model
    lives in the Sales CRM project (~/Projects/crm/backend/app/Models/Plan.php,
    seeded with Pro $19/$190 and Business $39/$390 + 14-day trial + LemonSqueezy
    variant IDs). Editors must keep this PricingPlan visually in sync with the
    real Plan, but billing/checkout is handled in the CRM project. The CTA
    URL on each plan should redirect to https://app.alliances.pro/signup?plan=
    {slug} (or whichever signup URL the CRM exposes).

  app/Models/Marketing/Faq.php
    Fields: id, question, answer (rich text), category (string — nullable),
            order, is_published

  app/Models/Marketing/Testimonial.php
    Fields: id, quote, author_name, author_role, author_company,
            author_avatar, rating (int 1-5), industry_tag, is_published, order
    Implements: HasMedia for author_avatar.

  app/Models/Marketing/Comparison.php
    Fields: id, slug (e.g. "hubspot"), competitor_name, headline,
            body (rich text), winner_summary, comparison_table (JSON — array
            of {feature, alliances_value, competitor_value}), seo_title,
            seo_description, is_published

  app/Models/Marketing/Integration.php
    Fields: id, name, slug, logo, category, description, link_url,
            is_published, order

  app/Models/Marketing/Lead.php
    Fields: id, name, email, company, team_size, message, source (enum:
            contact_form, demo_form, newsletter, waitlist), waitlist_for
            (nullable: e.g. "education_crm"), ip_address, user_agent,
            consent_given (bool), notified_at, processed_at
    No tenant scope. This stores marketing-site captures (NOT product CRM
    leads).

  app/Models/Marketing/SiteSetting.php
    Singleton-style key/value: id, key (unique), value (text), group (string),
    type (enum: text, longtext, image, url, json, bool)
    Used for: site-wide content (logo URL, social handles, footer copy,
    company address, support email, etc.)

  app/Models/Marketing/BlogPost.php
    Fields: id, slug, title, excerpt, body (rich text — markdown allowed),
            cover_image, author_name, category, tags (JSON), reading_minutes,
            is_published, published_at, seo_title, seo_description
    Implements: HasMedia for cover_image.

STEP 3 — Run migrations + seed
docker-compose exec backend php artisan migrate
docker-compose exec backend php artisan db:seed --class=MarketingContentSeeder

Create database/seeders/MarketingContentSeeder.php that loads ALL the content
from the file ./MARKETING_STRATEGY.md (it's in the project root) into the
appropriate tables. Specifically:

  - One Page row for "/" with PageSections (hero, sponsors, benefits, features,
    services, trust, testimonial, team, pricing, community, contact, faq,
    newsletter), payload populated from sections 10.2–10.15 of the strategy doc.
  - 6 Feature rows from section 10.5 (Lead management, Deal pipeline, Email
    campaigns, Call logs, Tasks & projects, Multi-workspace).
  - 4 Industry rows from section 10.6 (shopify-agencies, sales-teams,
    freelancers, education with is_published=false to mark as coming-soon).
  - 2 PricingPlan rows from section 10.10:
      Pro       — $19/mo or $190/yr — limits: 10 projects, 500 orgs, 1,000
                  leads, 10 members, unlimited tasks. is_featured=false.
                  external_signup_url: https://app.alliances.pro/signup?plan=pro
      Business  — $39/mo or $390/yr — unlimited everything. is_featured=true.
                  external_signup_url: https://app.alliances.pro/signup?plan=business
    Both: 14-day trial mentioned in description, currency=USD.
    These mirror what's in ~/Projects/crm/backend/database/seeders/PlanSeeder.php
    for the actual billing system, but THIS table is for marketing display only —
    it lets non-technical admins edit pricing copy, comparison notes, and order
    without touching billing config. Don't merge them.
  - 10 Faq rows from section 10.13.
  - SiteSetting rows for: site_name, site_tagline, support_email,
    sales_email, press_email, twitter_url, linkedin_url, github_url,
    youtube_url, footer_copyright, address.
  - 6 Comparison rows (hubspot, pipedrive, zoho-crm, salesforce, close,
    monday-crm) — leave body empty for now, just slug+name+headline so admin
    can edit.

STEP 4 — Filament resources
Generate one resource per model:

docker-compose exec backend php artisan make:filament-resource Marketing/Page --generate
docker-compose exec backend php artisan make:filament-resource Marketing/PageSection --generate
docker-compose exec backend php artisan make:filament-resource Marketing/Feature --generate
docker-compose exec backend php artisan make:filament-resource Marketing/Industry --generate
docker-compose exec backend php artisan make:filament-resource Marketing/PricingPlan --generate
docker-compose exec backend php artisan make:filament-resource Marketing/Faq --generate
docker-compose exec backend php artisan make:filament-resource Marketing/Testimonial --generate
docker-compose exec backend php artisan make:filament-resource Marketing/Comparison --generate
docker-compose exec backend php artisan make:filament-resource Marketing/Integration --generate
docker-compose exec backend php artisan make:filament-resource Marketing/Lead --generate
docker-compose exec backend php artisan make:filament-resource Marketing/BlogPost --generate
docker-compose exec backend php artisan make:filament-resource Marketing/SiteSetting --generate

Then refine each form by hand to use:
  - Forms\Components\TextInput (with maxLength on title, slug, etc.)
  - Forms\Components\Textarea or RichEditor for long content
  - Forms\Components\KeyValue for limits/payload simple JSON
  - Forms\Components\Repeater for arrays of features/comparison_table rows
  - Forms\Components\SpatieMediaLibraryFileUpload for image fields
  - Forms\Components\Toggle for is_published
  - Forms\Components\Select with options() for `type`, `category`, etc.

For PageSection, use `Forms\Components\Builder` with one Block per section
type (Hero, Benefits, Features, etc.) so admins can compose pages visually.

Group all resources under "Marketing" navigation group:
  protected static ?string $navigationGroup = 'Marketing';

Add a Filament dashboard widget called "Recent Marketing Leads" that shows
the last 10 Lead rows from the contact form.

STEP 5 — Authorize the panel
Use Filament Shield to generate permissions:
docker-compose exec backend php artisan shield:install admin
docker-compose exec backend php artisan shield:generate --all

Then create a "marketing_editor" role that has full CRUD on Marketing/* but
no access to product CRM resources. Seed one super-admin user.

STEP 6 — Public read-only API for the marketing site
Create app/Http/Controllers/Api/Marketing/* controllers. Routes go in
routes/api.php under prefix `/api/v1/marketing` and are PUBLIC (no auth).
Throttle to 120/min per IP.

Endpoints:

  GET /api/v1/marketing/pages/{slug}
       → Page with eager-loaded sections, where is_published=true.
  GET /api/v1/marketing/features                  → list, published only
  GET /api/v1/marketing/features/{slug}           → single
  GET /api/v1/marketing/industries                → list, published only
  GET /api/v1/marketing/industries/{slug}         → single
  GET /api/v1/marketing/pricing-plans             → list, ordered, published
  GET /api/v1/marketing/faqs                      → list grouped by category
  GET /api/v1/marketing/testimonials              → list, ordered
  GET /api/v1/marketing/comparisons               → list of slugs+headlines
  GET /api/v1/marketing/comparisons/{slug}        → single with full table
  GET /api/v1/marketing/integrations              → list grouped by category
  GET /api/v1/marketing/blog                      → paginated, published
  GET /api/v1/marketing/blog/{slug}               → single
  GET /api/v1/marketing/settings                  → all SiteSettings as map
  GET /api/v1/marketing/sitemap                   → list of all published
                                                    URLs for sitemap.xml gen

  POST /api/v1/marketing/leads                    → contact/demo/waitlist
                                                    (covered in Prompt 2)

For each GET endpoint:
  - Return Eloquent API Resource (app/Http/Resources/Marketing/*).
  - Wrap response in: { "data": ..., "meta": { "cached_at": ISO8601 } }
  - Cache the response payload in Redis for 5 minutes, key includes locale.
    Use Cache::tags(['marketing'])->remember(...).
  - Bust cache automatically with model observers — when any Marketing model
    is saved/deleted, run Cache::tags(['marketing'])->flush().

Create app/Observers/Marketing/MarketingCacheObserver.php and register it for
ALL Marketing/* models in a service provider.

STEP 7 — CORS
Configure config/cors.php paths to include 'api/v1/marketing/*' with
allowed_origins from env: APP_MARKETING_ORIGINS (comma-separated:
https://alliances.pro, https://www.alliances.pro,
http://localhost:3000).

STEP 8 — Tests (Pest, mandatory)
docker-compose exec backend ./vendor/bin/pest
Add tests under tests/Feature/Marketing/:
  - PageEndpointTest: returns 200 + correct shape for /, 404 for unknown
  - PricingPlansEndpointTest: returns ordered, published-only
  - FaqsEndpointTest: groups by category
  - LeadCreationTest (covered in Prompt 2)
  - CacheBustingTest: editing a Page busts the cache tag
  - FilamentAccessTest: non-admin user gets 403 on /admin

STEP 9 — Documentation
Generate OpenAPI for the marketing endpoints if Scramble is installed,
otherwise add docs/marketing-api.md with endpoint reference + sample
responses.

DELIVERABLES CHECK
At the end of this prompt, all of these must be true:
  [ ] /admin renders the Filament panel and a super-admin can log in
  [ ] All 12 Marketing resources visible under "Marketing" nav group
  [ ] Seeded data renders correctly in the admin UI
  [ ] curl http://localhost/api/v1/marketing/pages/home returns the homepage
       JSON with all sections populated
  [ ] curl http://localhost/api/v1/marketing/faqs returns 10 FAQs
  [ ] All Pest tests pass
  [ ] Editing a Page in /admin invalidates the cache for the next request
  [ ] CORS allows http://localhost:3000 (the cosmic dev server)
````

---

## Prompt 2 — Contact form: backend endpoint + email + Slack notification

````
Working directory: ~/Projects/cosmic

GOAL
Wire up the marketing site's contact form to a real Laravel 13 endpoint in
./backend that validates input, persists to the marketing_leads table, sends an email to the
team, optionally posts to a Slack webhook, and returns a clean JSON response
the Next.js form can react to. This is a multi-purpose endpoint serving:
  - Contact form
  - Demo request form
  - Newsletter signup
  - Education CRM waitlist

ALL COMMANDS RUN INSIDE DOCKER:
  docker-compose exec backend php artisan ...
  (You're in ~/Projects/cosmic — this hits the marketing backend container,
  not the Sales CRM's backend container.)

STEP 1 — Form Request
docker-compose exec backend php artisan make:request Marketing/StoreLeadRequest

Validation rules:
  source           required|in:contact_form,demo_form,newsletter,waitlist
  name             required_unless:source,newsletter|string|max:120
  email            required|email:rfc,dns|max:160
  company          nullable|string|max:120
  team_size        nullable|in:solo,2-10,11-50,51-200,200+
  message          required_if:source,contact_form,demo_form|string|max:5000
  waitlist_for     required_if:source,waitlist|in:education_crm,real_estate_crm,healthcare_crm
  consent_given    accepted   (must be true for GDPR / spam protection)
  honeypot         nullable|prohibited (anti-spam — must be empty)
  recaptcha_token  required_if:source,contact_form,demo_form|string

Add custom messages tuned for end users.

STEP 2 — Controller
docker-compose exec backend php artisan make:controller Api/Marketing/LeadController --invokable

In __invoke(StoreLeadRequest $request):
  1. Verify reCAPTCHA v3 server-side (skip if env RECAPTCHA_SECRET unset, log
     warning). Score must be >= 0.5.
  2. Lookup existing Lead by email + source within last 60 minutes —
     if found, return 200 with same id (idempotent, no duplicate emails).
  3. Persist Lead model with ip_address + user_agent.
  4. Dispatch ProcessNewMarketingLead job (queued).
  5. Return 201 with: { "data": { "id": ..., "source": ..., "received_at": ISO } }

STEP 3 — Job
docker-compose exec backend php artisan make:job Marketing/ProcessNewMarketingLead

handle():
  1. Mail::send(new NewMarketingLeadMail($lead)) → to env('MARKETING_NOTIFY_EMAIL', 'sales@alliances.pro')
  2. If env('SLACK_MARKETING_WEBHOOK') set, POST a Slack Block Kit message to it.
  3. If source == newsletter, also Mail::send(new NewsletterWelcomeMail) to lead's email.
  4. If source == waitlist, also Mail::send(new WaitlistConfirmationMail) to lead's email.
  5. Update lead.notified_at = now().

Use try/catch around each side-effect — never let one failed channel kill the job.

STEP 4 — Mailables + views
docker-compose exec backend php artisan make:mail Marketing/NewMarketingLeadMail
docker-compose exec backend php artisan make:mail Marketing/NewsletterWelcomeMail
docker-compose exec backend php artisan make:mail Marketing/WaitlistConfirmationMail

Use Markdown mail templates under resources/views/emails/marketing/*.
Subjects:
  NewMarketingLeadMail:        "🚀 New {source} lead — {name} ({company})"
  NewsletterWelcomeMail:       "Welcome to the Alliances PRO playbook"
  WaitlistConfirmationMail:    "You're on the {waitlist_for} waitlist"

STEP 5 — Slack notification
Create app/Notifications/Marketing/SlackLeadNotification.php (or just a
plain helper service NotifySlack). Block Kit format:

  :inbox_tray: New {source} from {name}
  • Email: {email}
  • Company: {company}  •  Team: {team_size}
  • Message: > {first 200 chars}
  • View in admin: {APP_URL}/admin/marketing-leads/{id}

STEP 6 — Routes
In routes/api.php inside the marketing group:
  Route::post('/leads', [LeadController::class, '__invoke'])
       ->middleware(['throttle:30,60']);  // 30/min per IP, generous for forms

Make sure the leads endpoint is INCLUDED in CORS allowed_origins from Prompt 1.

STEP 7 — Filament UI for incoming leads
On the Marketing/LeadResource (already generated in Prompt 1), add:
  - Filters: source, date range, processed status
  - Bulk action: "Mark as processed" (sets processed_at)
  - Bulk action: "Export CSV"
  - Row action: "Reply via email" (mailto: link)

STEP 8 — Tests
tests/Feature/Marketing/LeadCreationTest.php (Pest):
  - it('accepts a valid contact_form payload')
  - it('rejects when honeypot is filled')
  - it('rejects when consent_given is false')
  - it('rejects without recaptcha when source=contact_form')
  - it('is idempotent within 60 minutes per email+source')
  - it('queues the ProcessNewMarketingLead job')
  - it('throttles after 30 requests in a minute')

DELIVERABLES CHECK
  [ ] POST http://localhost/api/v1/marketing/leads with valid JSON returns 201
  [ ] Lead appears in Filament under Marketing → Leads
  [ ] Email arrives at MARKETING_NOTIFY_EMAIL (mailpit in dev)
  [ ] Slack message arrives if webhook configured
  [ ] Honeypot + recaptcha properly reject spam
  [ ] All Pest tests pass
````

---

## Prompt 3 — Wire cosmic theme to Alliances PRO content (Next.js frontend)

````
Working directory: ~/Projects/cosmic

GOAL
Replace all hardcoded placeholder content in the cosmic theme with content
fetched from the Laravel marketing API (built in Prompts 1 & 2). Statically
generate every page at build time so the site is fast + SEO-friendly. Wire the
contact form to POST to /api/v1/marketing/leads.

FRONTEND RULES
- All npm commands MUST run inside docker. From the cosmic repo root, exec
  into the frontend container: `docker-compose exec frontend npm install ...`
- The frontend code lives at ./frontend (Next.js 16.2 + Tailwind 4 + shadcn/ui).
  Follow the Next.js boilerplate structure from
  https://github.com/ixartz/Next-js-Boilerplate
- The cosmic theme IS the design system — don't import other UI kits.
- All work in this prompt happens inside ./frontend. Don't touch ./backend.

STEP 1 — Environment + dependencies
Add to frontend/.env.local:
  NEXT_PUBLIC_API_BASE=http://localhost/api/v1/marketing
  NEXT_PUBLIC_SITE_URL=https://alliances.pro
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...   # leave empty for dev

Install:
  docker-compose exec frontend npm install \
    @tanstack/react-query swr zod react-hook-form @hookform/resolvers \
    react-google-recaptcha-v3 next-sitemap @vercel/og

STEP 2 — API client (lib/api.ts)
Create a typed fetch client:
  - getPage(slug)         → typed Page object with sections
  - listFeatures()        → typed Feature[]
  - getFeature(slug)
  - listIndustries()
  - getIndustry(slug)
  - listPricingPlans()
  - listFaqs()
  - listTestimonials()
  - listComparisons()
  - getComparison(slug)
  - listIntegrations()
  - listBlog({page, perPage})
  - getBlogPost(slug)
  - getSiteSettings()
  - createLead(payload)

Define Zod schemas for each response shape under lib/schemas/. Validate
responses through Zod and throw typed errors.

For SSG, fetch with `{ next: { revalidate: 300 } }` (5 min ISR). Add a
helper getStaticProps replacement for App Router using fetch + revalidate.

STEP 3 — Refactor cosmic sections to consume API data
The cosmic theme already has these section components under
frontend/components/layout/sections/. Refactor each to receive props from
the API. The legacy hardcoded data in frontend/@data/* should be removed
once each section is wired to the API.

  hero.tsx           ← payload from PageSection where type='hero'
  benefits.tsx       ← payload from PageSection where type='benefits'
  features.tsx       ← from listFeatures()
  services.tsx       ← from listIndustries() (rename/repurpose)
  trust.tsx          ← payload from PageSection where type='trust'
  testimonial.tsx    ← from listTestimonials()
  team.tsx           ← from siteSettings or a new "team" model — for now
                       can stay hardcoded if you skip team
  pricing.tsx        ← from listPricingPlans()
  community.tsx      ← payload from PageSection where type='community'
  contact.tsx        ← API call on submit (see Step 5)
  faq.tsx            ← from listFaqs()
  newsletter.tsx     ← API call on submit (source: newsletter)
  footer.tsx         ← from siteSettings + listIndustries() + listFeatures()

Each section component MUST:
  - Accept its data as props (no internal fetching).
  - Render skeleton/fallback if data is empty.
  - Be a Server Component unless it has interactivity, then split into
    `Section.tsx` (server) + `SectionClient.tsx` (client) pattern.

STEP 4 — App Router pages
app/page.tsx (Home):
  - Server component fetches getPage('home'), listFeatures(),
    listIndustries(), listPricingPlans(), listFaqs(), listTestimonials(),
    getSiteSettings() in parallel via Promise.all.
  - Renders the cosmic sections in this order (preserve existing order):
    Hero → Sponsors → Benefits → Features → Services → Trust →
    Testimonial → Team → Pricing → Community → Contact → FAQ →
    Newsletter → Footer
  - Adds metadata (title, description, og:image) from page.meta_title etc.

Create the following routes (App Router):
  app/features/page.tsx                 → grid of features
  app/features/[slug]/page.tsx          → single feature deep page
                                          generateStaticParams from API
  app/industries/page.tsx
  app/industries/[slug]/page.tsx
  app/pricing/page.tsx
  app/compare/[slug]/page.tsx           → vs HubSpot/Pipedrive/etc
  app/alternatives/[slug]/page.tsx      → "best alternative to X"
  app/blog/page.tsx                     → paginated list
  app/blog/[slug]/page.tsx
  app/about/page.tsx
  app/security/page.tsx
  app/contact/page.tsx                  → standalone contact (form embed)
  app/legal/privacy/page.tsx
  app/legal/terms/page.tsx
  app/legal/dpa/page.tsx
  app/legal/cookies/page.tsx
  app/changelog/page.tsx
  app/customers/page.tsx                 → case studies (placeholder for now)

For each [slug] route, implement generateStaticParams() to pre-render all
published items at build time.

STEP 5 — Contact form (functional)
components/layout/sections/contact.tsx (or split into ContactSection.tsx
+ ContactSectionClient.tsx):

Use react-hook-form + zod + react-google-recaptcha-v3.

Schema (mirrors backend):
  const schema = z.object({
    name: z.string().min(1, 'Name is required').max(120),
    email: z.string().email('Enter a valid email'),
    company: z.string().max(120).optional(),
    teamSize: z.enum(['solo','2-10','11-50','51-200','200+']).optional(),
    message: z.string().min(10, 'Tell us a little more').max(5000),
    consentGiven: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
    honeypot: z.string().max(0).optional(),
  });

Form fields (use cosmic Form / Input / Textarea / Select / Button):
  - Name (required)
  - Work email (required)
  - Company (optional)
  - Team size (select, optional)
  - Message (textarea, required)
  - Consent checkbox: "I agree to be contacted about Alliances PRO and to
    Alliances PRO's Privacy Policy."
  - Honeypot input (visually hidden via `sr-only` + tabindex=-1 +
    autocomplete=off, name="honeypot")

On submit:
  1. Run reCAPTCHA v3 → get token (skip in dev if site key empty).
  2. POST to ${NEXT_PUBLIC_API_BASE}/leads with
     { source: 'contact_form', ...values, recaptcha_token }
  3. On 201: show inline success state ("Got it — we'll reply within 4 hours.")
            and clear form.
  4. On 422: surface field errors to react-hook-form.
  5. On 5xx: show generic error + mailto fallback (sales@alliances.pro).

States to handle: idle, submitting, success, error. Disable button while
submitting. Use the cosmic toast (sonner if installed) for non-blocking
feedback.

ACCESSIBILITY:
  - Each input has a visible <Label> + aria-describedby for error text.
  - Honeypot input has aria-hidden="true" and tabindex="-1".
  - Submit button has aria-busy={isSubmitting}.
  - Success message has role="status" + aria-live="polite".

STEP 6 — Newsletter form
components/layout/sections/newsletter.tsx:
  - Single email field + button.
  - On submit, POST { source: 'newsletter', email, consent_given: true }.
  - Optimistic UI — show "Thanks!" instantly, swap to error if API fails.

STEP 7 — Waitlist form (Education CRM)
On app/industries/education/page.tsx (which is the "coming soon" page),
embed a waitlist form that POSTs:
  { source: 'waitlist', waitlist_for: 'education_crm', name, email,
    company, consent_given: true }

STEP 8 — Image domains + CDN
In next.config.ts, add the API host to images.remotePatterns so OG images
and uploaded media render via next/image.

STEP 9 — Visual QA
Run dev server: docker-compose exec frontend npm run dev
Open http://localhost:3000 and verify every section renders content from
the API, not hardcoded text. Submit the contact form and confirm a row
appears in /admin → Marketing → Leads (in the crm backend).

DELIVERABLES CHECK
  [ ] Homepage renders entirely from API data
  [ ] All routes from Step 4 exist and pre-render at build time
  [ ] Contact form submits successfully and shows clear success/error states
  [ ] Newsletter form works
  [ ] Education waitlist form works
  [ ] Editing content in Filament (after cache TTL) reflects on the site
  [ ] No hardcoded marketing copy remains in the codebase (grep for "Lorem"
      and the cosmic placeholder strings — should return 0 hits)
````

---

## Prompt 4 — SEO, sitemap, structured data, Open Graph

````
Working directory: ~/Projects/cosmic

GOAL
Make every page on alliances.pro fully SEO-ready: per-page metadata, JSON-LD
structured data, auto-generated sitemap, robots.txt, dynamic OG images,
canonical URLs, breadcrumbs, and Lighthouse SEO ≥ 95.

STEP 1 — Per-page metadata
For every App Router page, export a generateMetadata function that:
  - Pulls title + description from API or local fallback.
  - Sets canonical URL (NEXT_PUBLIC_SITE_URL + path).
  - Sets openGraph (type, url, title, description, image — fall back to
    /og/default.png).
  - Sets twitter card (summary_large_image).
  - For dynamic pages, accept params and do a single API fetch.

Helper: lib/seo.ts exports buildMetadata({ title, description, path, image,
type }) used everywhere.

STEP 2 — JSON-LD structured data
Create components/seo/ with one component per schema type, each rendering
a <script type="application/ld+json">. Used per-page:

  Organization        — global, in root layout
  WebSite             — global, in root layout, includes search action
  Product             — pricing page
  BreadcrumbList      — every non-home page
  FAQPage             — homepage + any page with an FAQ section
  Article             — blog posts
  Review / AggregateRating — once you have G2 ratings (placeholder for now)

Validate the JSON-LD output with https://validator.schema.org/ before launch.

STEP 3 — Sitemap (next-sitemap)
Install + configure next-sitemap.config.js:
  - siteUrl from env
  - generateRobotsTxt: true
  - exclude: ['/admin/*', '/api/*', '/preview/*', '/legal/*-draft']
  - additionalPaths(): fetch GET /sitemap from the API and return all
    published URLs (features, industries, comparisons, blog posts) with
    appropriate changefreq + priority

Add to package.json:
  "postbuild": "next-sitemap"

STEP 4 — robots.txt
Auto-generated by next-sitemap. Confirm it disallows /admin and /api.

STEP 5 — Dynamic OG images (@vercel/og)
Create app/api/og/route.tsx that returns an image based on ?title= and
?subtitle= query params. Use cosmic brand colors. 1200×630.

Each page that doesn't have a custom OG image references this dynamic
endpoint:
  /api/og?title=Pricing&subtitle=Alliances+PRO

STEP 6 — Canonicals + alternate links
Every page sets <link rel="canonical">. If you launch any locales later,
add <link rel="alternate" hreflang="..."> per locale.

STEP 7 — Breadcrumbs UI + JSON-LD
Add a <Breadcrumbs /> component used on every non-home page. Output BOTH
visible HTML AND BreadcrumbList JSON-LD.

STEP 8 — Performance budget
Verify on each page:
  - LCP < 2.0s (mobile)
  - CLS < 0.1
  - TBT < 200ms

Run Lighthouse in CI (Chrome on a fresh build) and fail PRs that drop
SEO < 95 or Performance < 90 on mobile.

DELIVERABLES CHECK
  [ ] sitemap.xml accessible at /sitemap.xml with all published URLs
  [ ] robots.txt correctly blocks /admin and /api
  [ ] Every page has unique title + description + canonical
  [ ] JSON-LD validates clean for Organization, WebSite, FAQPage, Product
  [ ] OG image renders for any page via /api/og
  [ ] Lighthouse SEO ≥ 95, Performance ≥ 90 on mobile
````

---

## Prompt 5 — Industry pages, comparison pages, blog scaffolding

````
Working directory: ~/Projects/cosmic

GOAL
Build out the deep SEO content surface: industry landing pages (one per ICP),
comparison pages (vs each major competitor), and the blog skeleton. Frontend
work in ./frontend, plus a small Filament dashboard addition in ./backend.

STEP 1 — Industry page template
File: app/industries/[slug]/page.tsx

Sections (mirror cosmic style):
  1. Hero (industry-specific headline + subhead from Industry.headline /
     subheadline)
  2. "Who this is for" — bullet list of 3-5 personas/job titles
  3. Industry-specific feature highlights (3-6 cards, pulled from
     Industry.body or related Features tagged with this industry)
  4. Mini comparison strip — "Why teams in [industry] pick Alliances PRO
     over [HubSpot/Pipedrive/X]"
  5. Industry testimonial (filtered from Testimonials by industry_tag)
  6. Pricing teaser (1 plan card + link to /pricing)
  7. CTA — "Start free, [industry]-ready in 10 minutes"
  8. FAQ (industry-tagged FAQs)

Build for these slugs:
  - shopify-agencies
  - sales-teams
  - freelancers
  - education (renders "Coming soon — join waitlist" variant with the
    waitlist form from Prompt 3 Step 7)

STEP 2 — Comparison page template
File: app/compare/[slug]/page.tsx

Sections:
  1. Hero — "Alliances PRO vs [Competitor]" + tagline (from Comparison
     model: headline + winner_summary)
  2. The TL;DR box — 3-sentence summary of when to pick Alliances PRO vs
     competitor
  3. Feature-by-feature comparison table (from Comparison.comparison_table
     JSON)
  4. Pricing comparison block — show your tier pricing next to theirs
  5. "Customers who switched" — testimonials filtered by switched_from tag
     (placeholder until you have data)
  6. Migration help CTA — "Free migration on Pro and Business plans"
  7. FAQ (comparison-specific)

Build for slugs:
  hubspot, pipedrive, zoho-crm, salesforce, close, monday-crm

STEP 3 — Alternatives page template
File: app/alternatives/[slug]/page.tsx

Reuse the comparison layout but with a slightly different hero ("Looking
for a [Competitor] alternative?") and lead with the "switchers" angle.
Build for hubspot + pipedrive initially.

STEP 4 — Blog
File: app/blog/page.tsx (paginated list, 12 posts/page).
File: app/blog/[slug]/page.tsx (single post — render markdown via
react-markdown with rehype-pretty-code for syntax highlighting).

Add a simple category sidebar from BlogPost.category aggregation.

Seed 3 starter posts via the seeder in Prompt 1 (now updated):
  - "How to choose a CRM for a small agency" (Tier 3)
  - "CRM vs project management tool — what each is for" (Tier 3)
  - "How much should a CRM cost for a 10-person team?" (Tier 3)

STEP 5 — Internal linking
Add a simple `RelatedLinks` component used on:
  - Feature pages → link to related industry pages + comparison pages
  - Industry pages → link to features + the most relevant comparison
  - Comparison pages → link back to the "winning" feature pages

This boosts internal PageRank flow significantly for SEO.

STEP 6 — Filament admin convenience (in ./backend)
In the cosmic backend, add a Filament Page (custom, not a Resource) called
"Marketing Dashboard" that shows:
  - Lead count (last 7d / 30d) by source
  - Most viewed pages (placeholder for now — wire to Plausible later)
  - Pending unpublished content count per type
  - Quick links to most-edited resources

DELIVERABLES CHECK
  [ ] /industries/shopify-agencies, /sales-teams, /freelancers all render
      with API-driven content
  [ ] /industries/education shows the waitlist form
  [ ] /compare/hubspot through /compare/monday-crm all render with feature
      tables
  [ ] /alternatives/hubspot + /pipedrive render
  [ ] /blog renders the 3 seeded posts and a single post page works
  [ ] Marketing Dashboard page exists in Filament
````

---

## Prompt 6 — Polish: analytics, A/B test scaffolding, accessibility audit

````
Working directory: ~/Projects/cosmic

GOAL
Pre-launch polish. Wire analytics, set up the A/B testing harness, and run
an accessibility + SEO audit. After this prompt, the site is launch-ready.

STEP 1 — Analytics
Use Plausible (privacy-friendly, no cookie banner needed). Add the script
to root layout via next/script (strategy="afterInteractive"). Track:
  - Pageviews (default)
  - Outbound link clicks
  - Custom events: signup_clicked, demo_requested, pricing_plan_clicked,
    contact_submitted, newsletter_subscribed, waitlist_joined,
    comparison_viewed

Wrap form submit handlers and button clicks to fire window.plausible(...)
events.

STEP 2 — A/B test scaffolding
Use a simple feature-flag wrapper (lib/experiments.ts) that:
  - Reads a cookie `ap_experiment_<name>` or assigns one (50/50).
  - Persists the assignment for 30 days.
  - Reports the variant + outcome to Plausible custom events.

Initial experiment:
  - hero_headline_variant: A = "The CRM platform built for service
    businesses that grow sideways." vs B = "Stop paying for five tools to
    manage one client."

STEP 3 — Accessibility audit
Install + run:
  npx @axe-core/cli http://localhost:3000
Fix all reported issues. Manually test:
  - Tab order on every page
  - Form errors announced via aria-live
  - Color contrast ≥ 4.5:1 for body text (use cosmic theme tokens, verify)
  - Focus visible on every interactive element
  - All images have meaningful alt text or alt="" if decorative

STEP 4 — Performance audit
Run Lighthouse on every page type — homepage, industry, comparison,
pricing, blog, blog post, contact. All must score:
  Performance ≥ 90 (mobile)
  Accessibility ≥ 95
  Best Practices ≥ 95
  SEO ≥ 95

Fix anything below threshold:
  - Convert remaining <img> to next/image
  - Lazy-load below-fold sections
  - Eliminate render-blocking JS
  - Self-host fonts (cosmic already does this — verify)

STEP 5 — Production readiness checklist
  [ ] All env vars documented in .env.example
  [ ] Production API_BASE points to https://api.alliances.pro/api/v1/marketing
  [ ] reCAPTCHA v3 site key + secret set in production env
  [ ] Plausible domain configured for alliances.pro
  [ ] Slack marketing webhook set
  [ ] All forms tested end-to-end on production
  [ ] /sitemap.xml submitted to Google Search Console + Bing Webmaster
  [ ] Custom 404 + 500 pages exist and are friendly
  [ ] Cookie banner ONLY if you keep GA — Plausible needs none
  [ ] Privacy policy + terms of service drafted (not lorem ipsum)
  [ ] DPA + cookie policy drafted
  [ ] Monitoring: Sentry on frontend, Sentry/Bugsnag on backend
  [ ] Uptime: BetterStack or UptimeRobot pinging /api/health

STEP 6 — Final smoke test
From a fresh incognito session:
  1. Land on / → all sections load < 3s
  2. Scroll through → no layout shift
  3. Click Pricing → all 4 plans render
  4. Click Compare → HubSpot page loads
  5. Submit contact form → success state appears + lead in admin
  6. Submit newsletter → success + email arrives
  7. Submit waitlist → success + confirmation email
  8. Verify cosmic theme dark/light toggle works on every page
  9. Verify mobile (≤ 414px) renders cleanly with no horizontal scroll
  10. Verify no console errors or warnings on any page

DELIVERABLES CHECK
  [ ] Plausible recording pageviews + custom events
  [ ] A/B test assignment cookie set, variant rendered, conversion tracked
  [ ] axe-core reports 0 critical issues
  [ ] Lighthouse all categories ≥ thresholds
  [ ] Production .env.example complete
  [ ] Smoke test passes from incognito
````

---

## Quick reference — file map

After running all six prompts, the cosmic repo will look like this. Nothing
in `~/Projects/crm` is touched.

```
~/Projects/cosmic/
├── docker-compose.yml           Orchestrates everything
├── .env.example
├── README.md
├── MARKETING_STRATEGY.md        Source of truth for content + positioning
├── MARKETING_BUILD_PROMPTS.md   This file
│
├── infra/
│   └── nginx/default.conf       Routes /admin + /api → backend, * → frontend
│
├── backend/                     Laravel 13 + Filament 5 (admin + API)
│   ├── Dockerfile
│   ├── .env.example
│   ├── README.md                Bootstrap + common commands
│   ├── app/
│   │   ├── Models/Marketing/    Page, PageSection, Feature, Industry,
│   │   │                         PricingPlan, Faq, Testimonial, Comparison,
│   │   │                         Integration, Lead, SiteSetting, BlogPost
│   │   ├── Http/
│   │   │   ├── Controllers/Api/Marketing/   Public read API + Lead capture
│   │   │   ├── Requests/Marketing/          StoreLeadRequest
│   │   │   └── Resources/Marketing/         API resources
│   │   ├── Filament/
│   │   │   ├── Resources/Marketing/         All admin CRUDs
│   │   │   ├── Pages/MarketingDashboard.php
│   │   │   └── Widgets/RecentLeadsWidget.php
│   │   ├── Jobs/Marketing/ProcessNewMarketingLead.php
│   │   ├── Mail/Marketing/                  NewMarketingLead, NewsletterWelcome,
│   │   │                                     WaitlistConfirmation
│   │   ├── Observers/Marketing/MarketingCacheObserver.php
│   │   └── Providers/MarketingServiceProvider.php
│   ├── database/
│   │   ├── migrations/                      marketing_* tables
│   │   └── seeders/MarketingContentSeeder.php
│   ├── routes/
│   │   ├── api.php                          /api/v1/marketing/*
│   │   └── web.php                          (Filament owns /admin)
│   └── tests/Feature/Marketing/             Pest tests
│
└── frontend/                    Next.js 16.2 marketing site (cosmic theme)
    ├── Dockerfile
    ├── README.md
    ├── package.json + tsconfig.json + next.config.ts
    ├── app/
    │   ├── page.tsx                         Home
    │   ├── pricing/page.tsx
    │   ├── features/[slug]/page.tsx
    │   ├── industries/[slug]/page.tsx
    │   ├── compare/[slug]/page.tsx
    │   ├── alternatives/[slug]/page.tsx
    │   ├── blog/page.tsx + [slug]/page.tsx
    │   ├── about/page.tsx
    │   ├── security/page.tsx
    │   ├── contact/page.tsx
    │   ├── legal/{privacy,terms,dpa,cookies}/page.tsx
    │   └── api/og/route.tsx
    ├── components/
    │   ├── layout/sections/     (cosmic — refactored to consume API)
    │   ├── seo/                 JSON-LD components
    │   ├── ui/                  shadcn-style primitives
    │   └── breadcrumbs.tsx
    ├── lib/
    │   ├── api.ts               Typed API client (fetches from backend)
    │   ├── schemas/             Zod schemas
    │   ├── seo.ts               Metadata helper
    │   └── experiments.ts       A/B test harness
    └── next-sitemap.config.js
```

---

## Tips for running these prompts

1. **Bootstrap first.** Before Prompt 1, follow `backend/README.md` to install
   Laravel 13 into `cosmic/backend/` (it's empty until then).
2. **Run prompts in order.** Prompt 3 needs Prompts 1+2 done first.
3. **Commit after each prompt.** Use a branch per prompt: `feature/marketing-prompt-1`, etc.
4. **If a prompt is too big for one session,** split at the STEP boundaries
   and run consecutively in the same session.
5. **All composer / artisan / npm commands go through Docker.** Never run
   them on the host.
6. **Reference the strategy doc.** When the agent asks "what should the hero
   say?", point it at `MARKETING_STRATEGY.md` section 10.2.

---

**Companion file:** `MARKETING_STRATEGY.md` — the strategy + competitor + content source of truth that these prompts pull from.
