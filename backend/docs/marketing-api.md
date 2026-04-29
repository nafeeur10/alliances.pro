# Alliances PRO — Marketing API

Public read-only JSON API consumed by the Next.js marketing site at
`https://alliances.pro` (and `http://localhost:3000` in dev).

- **Base URL (dev):** `http://localhost/api/v1/marketing`
- **Base URL (prod):** `https://alliances.pro/api/v1/marketing`
- **Auth:** None — the endpoints are public.
- **Throttle:** 120 requests / minute / IP (returns `429 Too Many Requests` on overflow).
- **Cache:** Each response is cached in Redis for 5 minutes under the `marketing` cache tag. The tag is flushed automatically when any Marketing model is created, updated, or deleted (see `app/Observers/Marketing/MarketingCacheObserver.php`).
- **CORS:** Allowed origins are read from `APP_MARKETING_ORIGINS` (comma-separated). Defaults to `http://localhost`, `http://localhost:3000`, `https://alliances.pro`, `https://www.alliances.pro`.

Every response is wrapped:

```json
{
  "data": <endpoint payload>,
  "meta": { "cached_at": "2026-04-29T10:13:59+00:00" }
}
```

## Endpoints

### Pages

#### `GET /pages/{slug}`

Returns one page with eager-loaded, ordered, visible sections. Only published
pages are returned (404 otherwise).

**Sample (`GET /pages/home`):**

```json
{
  "data": {
    "id": 1,
    "slug": "home",
    "title": "Alliances PRO — The CRM Platform for Service Businesses",
    "meta_title": "Alliances PRO — The CRM Platform for Service Businesses",
    "meta_description": "One CRM, every vertical. Flat $19/mo for 10 users…",
    "og_image": "/og/home.png",
    "is_published": true,
    "published_at": "2026-04-29T10:02:08+00:00",
    "sections": [
      {
        "id": 1, "key": "hero", "order": 0, "type": "hero",
        "is_visible": true,
        "payload": {
          "eyebrow": "Multi-vertical CRM platform · Trusted by …",
          "headline": "The CRM platform built for service businesses that grow sideways.",
          "subheadline": "One login. One inbox. One bill…",
          "primary_cta": { "label": "Start 14-day free trial", "url": "https://app.alliances.pro/signup" },
          "secondary_cta": { "label": "Watch 2-min product tour", "url": "#tour" },
          "trust_strip": "Used by 1,200+ teams across 30 countries"
        }
      }
    ]
  },
  "meta": { "cached_at": "2026-04-29T10:13:59+00:00" }
}
```

### Features

- `GET /features` — published features ordered by `order`.
- `GET /features/{slug}` — single feature.

### Industries

- `GET /industries` — published industries ordered by `order`.
- `GET /industries/{slug}` — single industry.

### Pricing plans

- `GET /pricing-plans` — published plans ordered by `order`. Each plan exposes
  `monthly_price_cents`, `yearly_price_cents`, `currency`, `features` (array of
  strings), `limits` (key/value object), `cta_label`, `cta_url`,
  `external_signup_url`, `comparison_note`, `is_featured`.

### FAQs

#### `GET /faqs`

Returns published FAQs grouped by category. Items without a category fall under
`Other`.

```json
{
  "data": {
    "Pricing": [
      { "id": 3, "question": "Do you charge per user?", "answer": "**No.** …", "category": "Pricing", "order": 2 }
    ],
    "Trial": [ … ],
    "Other": [ … ]
  },
  "meta": { "cached_at": "…" }
}
```

### Testimonials

- `GET /testimonials` — published, ordered. Each entry has nested `author`
  object (`name`, `role`, `company`, `avatar`).

### Comparisons

- `GET /comparisons` — list of published comparisons (`slug`, `competitor_name`,
  `headline`, `seo_description` only — slim payload).
- `GET /comparisons/{slug}` — full comparison, including `comparison_table`
  (array of `{ feature, alliances_value, competitor_value }` rows) and `body`.

### Integrations

- `GET /integrations` — published integrations grouped by `category`.

### Blog

- `GET /blog?page=N&per_page=M` — paginated published posts (`per_page` is
  clamped to 1–50, default 15). Response includes `pagination` block with
  `current_page`, `per_page`, `total`, `last_page`. Body is omitted from the
  index payload — only the show endpoint includes the full body.
- `GET /blog/{slug}` — single post including `body`.

### Settings

#### `GET /settings`

Returns all `SiteSetting` rows as a key → `{ value, group, type }` map. `value`
is automatically casted (e.g. `bool` → boolean, `json` → decoded array).

```json
{
  "data": {
    "site_name": { "value": "Alliances PRO", "group": "general", "type": "text" },
    "twitter_url": { "value": "https://twitter.com/alliancespro", "group": "social", "type": "url" }
  },
  "meta": { "cached_at": "…" }
}
```

### Sitemap

#### `GET /sitemap`

Flat list of every published, public-facing URL. Designed for the Next.js site
to consume when generating `sitemap.xml`.

```json
{
  "data": [
    { "path": "/", "updated_at": "2026-04-29T10:02:08+00:00" },
    { "path": "/features/lead-management", "updated_at": "…" },
    { "path": "/industries/shopify-agencies", "updated_at": "…" },
    { "path": "/compare/hubspot", "updated_at": "…" },
    { "path": "/blog/launch-day", "updated_at": "…" }
  ],
  "meta": { "cached_at": "…" }
}
```

### Lead capture (planned — Prompt 2)

- `POST /leads` — accepts contact / demo / waitlist submissions. Validation,
  notifications, and Slack/email delivery are scaffolded out in the next
  prompt.

## Error responses

| Status | When |
|---|---|
| `404 Not Found` | Slug doesn't exist or the record is unpublished. |
| `429 Too Many Requests` | More than 120 requests per minute from the same IP. |
| `500 Internal Server Error` | Bug — surfaced to logs in `storage/logs/laravel.log`. |

## Cache invalidation

Editing **any** Marketing model in Filament admin (`/admin`) immediately flushes
the `marketing` cache tag, so the next request rebuilds and re-caches. There is
no manual flush endpoint — the model observer handles it transparently.
