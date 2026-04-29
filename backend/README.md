# Alliances PRO Marketing — Backend

Laravel 13 + Filament 5 admin panel for the alliances.pro marketing site.

This is **not** the Sales CRM backend — that lives in `~/Projects/crm` and stays
untouched. This backend is dedicated to the marketing site only:

- A Filament admin panel for editing every section of the marketing pages
- A public, cached, read-only JSON API consumed by the Next.js frontend
- A contact / demo / waitlist / newsletter capture endpoint
- Email + Slack notifications for new leads

---

## Prerequisites

- Docker + Docker Compose installed
- The `cosmic` repo cloned to `~/Projects/cosmic`

---

## First-time bootstrap (run from the cosmic repo root)

```bash
# 1. Bring the whole stack up (mysql, redis, mailpit will start; backend
#    will fail until Laravel is installed — that's expected)
cd ~/Projects/cosmic
docker-compose up -d mysql redis mailpit

# 2. Install Laravel 13 into the empty backend/ folder
docker-compose run --rm --no-deps backend \
    composer create-project laravel/laravel . "^13.0" --prefer-dist

# 3. Copy env file and generate app key
cp backend/.env.example backend/.env
docker-compose run --rm --no-deps backend php artisan key:generate

# 4. Install all composer packages we need
docker-compose run --rm --no-deps backend composer require \
    filament/filament:^5.0 \
    spatie/laravel-medialibrary:^11 \
    spatie/laravel-sluggable:^3 \
    spatie/laravel-activitylog:^4 \
    spatie/laravel-permission:^6 \
    bezhansalleh/filament-shield:^5 \
    laravel/sanctum:^4 \
    laravel/horizon:^5 \
    laravel/telescope:^5 \
    laravel/pail \
    laravel/pint \
    pusher/pusher-php-server:^7

docker-compose run --rm --no-deps backend composer require --dev \
    pestphp/pest:^3 \
    pestphp/pest-plugin-laravel:^3 \
    larastan/larastan:^3 \
    barryvdh/laravel-debugbar \
    fakerphp/faker

# 5. Install Filament panel (panel id: admin, path: /admin)
docker-compose run --rm --no-deps backend php artisan filament:install --panels

# 6. Publish vendor configs
docker-compose run --rm --no-deps backend php artisan vendor:publish --tag=horizon-config
docker-compose run --rm --no-deps backend php artisan vendor:publish --tag=telescope-config
docker-compose run --rm --no-deps backend php artisan vendor:publish --tag=permission-migrations
docker-compose run --rm --no-deps backend php artisan vendor:publish --tag=medialibrary-migrations

# 7. Now bring the full stack up (backend, frontend, nginx, horizon, scheduler)
docker-compose up -d

# 8. Run migrations and seed initial marketing content (after Prompt 1 below
#    has been executed and the seeders exist)
docker-compose exec backend php artisan migrate --seed

# 9. Create the first super-admin for Filament
docker-compose exec backend php artisan make:filament-user
```

After step 9, open:

- Marketing site: <http://localhost/>
- Filament admin: <http://localhost/admin>
- Mailpit (mail catcher): <http://localhost:8025>

---

## Common commands

```bash
# Composer
docker-compose exec backend composer require <package>
docker-compose exec backend composer dump-autoload

# Artisan
docker-compose exec backend php artisan <command>
docker-compose exec backend php artisan migrate
docker-compose exec backend php artisan tinker

# Tests
docker-compose exec backend ./vendor/bin/pest

# Code style
docker-compose exec backend ./vendor/bin/pint
docker-compose exec backend ./vendor/bin/phpstan analyse

# Tail logs
docker-compose exec backend php artisan pail
```

**Never run `composer`, `artisan`, or `npm` on the host.** Always exec into the
container so the PHP / Node versions and extensions match production.

---

## Folder layout (after bootstrap + Prompt 1)

```
backend/
├── app/
│   ├── Filament/
│   │   ├── Resources/Marketing/      ← admin CRUDs for every content model
│   │   ├── Pages/                    ← custom pages (Marketing Dashboard)
│   │   └── Widgets/                  ← Recent Leads widget, etc.
│   ├── Http/
│   │   ├── Controllers/Api/Marketing/  ← public read API + lead capture
│   │   ├── Requests/Marketing/         ← StoreLeadRequest etc.
│   │   └── Resources/Marketing/        ← Eloquent API resources
│   ├── Jobs/Marketing/               ← ProcessNewMarketingLead (queued)
│   ├── Mail/Marketing/               ← New lead, newsletter, waitlist
│   ├── Models/Marketing/             ← Page, Feature, Industry, Plan, FAQ,
│   │                                   Testimonial, Comparison, Lead, etc.
│   ├── Observers/Marketing/          ← Cache invalidation on save/delete
│   └── Providers/MarketingServiceProvider.php
├── database/
│   ├── migrations/                   ← marketing_pages, marketing_*, etc.
│   └── seeders/MarketingContentSeeder.php
├── routes/
│   ├── api.php                       ← /api/v1/marketing/*
│   └── web.php                       ← (mostly empty — Filament owns /admin)
├── tests/Feature/Marketing/          ← Pest tests
└── ...standard Laravel files
```

---

## Where to go from here

1. Run the bootstrap above
2. Open `~/Projects/cosmic/MARKETING_BUILD_PROMPTS.md`
3. Execute **Prompt 1** (creates marketing models + Filament resources + API)
4. Execute **Prompt 2** (contact form + email + Slack)
5. Then move to the frontend prompts (3-6)

The strategy doc (`MARKETING_STRATEGY.md`) has the source content for the
seeder and all the page copy.
