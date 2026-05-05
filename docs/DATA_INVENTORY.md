# Data Inventory — Marketing Site

What flows from the API/database vs. what's hard-coded in the frontend, as of 2026-05-05.

## Public API (read)

All endpoints are under `/api/v1/marketing` (CORS-allowed for the production marketing site + localhost).

| Endpoint | Method | Backend controller | Model / table | Filament resource | Frontend usage |
|---|---|---|---|---|---|
| `/blog` | GET | `ListBlogPosts` | `BlogPost` / `marketing_blog_posts` | `BlogPostResource` | Blog index, related posts, homepage Blog teaser |
| `/blog/page-data` | GET | `ListBlogPageData` | `BlogPost` (grouped by category) | — | Blog index sections (Latest / Case Studies / Marketing / Product / Analysis) |
| `/blog/{slug}` | GET | `ShowBlogPost` | `BlogPost` | `BlogPostResource` | Blog detail page |
| `/pricing-plans` | GET | `ListPricingPlans` | `PricingPlan` / `marketing_pricing_plans` | `PricingPlanResource` | Pricing cards on home + `/pricing` |
| `/sitemap` | GET | `GetSitemap` | aggregated | — | Backend sitemap consumed by `app/sitemap.ts` |

## Public API (write)

| Endpoint | Method | Backend controller | Validation | What it writes | What it sends |
|---|---|---|---|---|---|
| `/leads` | POST | `LeadController@store` | `StoreLeadRequest` (source, name, email, message, consent_given, recaptcha_token) | New row in `marketing_leads` with `source ∈ {contact_form, demo_form, newsletter, waitlist}` | Dispatches `ProcessNewMarketingLead` (queued). That job sends `NewMarketingLeadMail` to `MARKETING_NOTIFY_EMAIL` and, for newsletter, `NewsletterWelcomeMail` to the subscriber. |

The same endpoint backs **four** frontend flows distinguished only by `source`:

- **`contact_form`** — `frontend/components/layout/sections/contact-form.tsx`
- **`newsletter`** — `frontend/components/layout/sections/footer-newsletter-form.tsx`
- **`demo_form`** — not currently on the marketing site (reserved for the in-app demo CTA)
- **`waitlist`** — Education / Real Estate / Healthcare CRM waitlist forms (route exists, frontend not wired)

## Database tables (marketing namespace)

| Table | Owner | Note |
|---|---|---|
| `marketing_blog_posts` | `BlogPost` | Includes `is_featured`, `category`, `tags`, `cover_image`, `body` (markdown) |
| `marketing_pricing_plans` | `PricingPlan` | Monthly + yearly cents; features as JSON array |
| `marketing_leads` | `Lead` | All inbound contact + newsletter + demo + waitlist rows |

The `marketing_pages`, `marketing_page_sections`, and `marketing_settings`
tables were retired on 2026-05-05 (migrations
`drop_marketing_pages_and_page_sections` and `drop_marketing_settings`).
Page copy (eyebrow, headline, subheading) and site-wide brand bits (logo,
social handles, contact email, SEO defaults) now live in the Next.js
frontend — `@data/footer.ts`, `@data/contact.ts`, `lib/seo.ts`, plus the
hard-coded defaults next to each marketing page.

(Plus tag/category join tables on blog posts.)

## What's hard-coded in the frontend (NOT from the API)

Things that live as static `@data/*.ts` files, on purpose, because they're brand or template content the marketing team owns directly without going through the admin panel:

| Data file | Used by |
|---|---|
| `@data/footer.ts` | Footer columns + social URLs |
| `@data/navbar.ts` | Top nav + Resources mega-menu |
| `@data/contact.ts` | Contact section (location, hours, support email/phone) |
| `@data/features.ts` | Features section + grid |
| `@data/reviews.ts` | Testimonial carousel |
| `@data/blog.ts` | Static fallback for the homepage Blog teaser when the API returns nothing |
| `@data/help.ts` | `/help` FAQ accordion + `FAQPageSchema` JSON-LD |
| `@data/careers.ts` | `/careers` open roles list + intro copy |
| `@data/changelog.ts` | `/changelog` entries |
| `@data/contact.ts` | Contact section copy |

Promote any of these to the backend later by adding a model + Filament resource — the data shape is already JSON-friendly.

## Where notification mail goes

- `MARKETING_NOTIFY_EMAIL` (backend `.env`) → currently `inafeeur@gmail.com`. All "🚀 New X lead" emails fan out from `ProcessNewMarketingLead`.
- `MAIL_FROM_ADDRESS` → `hello@alliances.pro` (the From line on outgoing welcome / notification mail).
- Dev SMTP: Mailpit at `http://localhost:8026`.
- Production SMTP: not yet configured. Recommended path is Resend (`smtp.resend.com:587` + API key), documented in the deployment guide.

## Auth

The marketing API is unauthenticated for read endpoints (rate-limited via the `marketing-api` middleware group). Writes are unauthenticated by design but protected by reCAPTCHA on `contact_form` / `demo_form` (when `RECAPTCHA_SECRET` is set; skipped in dev).

## Filament admin panel

Login at `/admin/login`. Marketing-team role sees:

- Marketing → Blog Posts (CRUD + publish flag + featured toggle)
- Marketing → Pricing Plans
- Marketing → Pages (section payloads)
- Marketing → Leads (read-only triage; `source` filter; export)
- Marketing → Settings
