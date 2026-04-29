# Alliances PRO — Marketing Site

Self-contained marketing site for [alliances.pro](https://alliances.pro), the
multi-vertical CRM platform.

This repo is **independent of the Sales CRM product** (`~/Projects/crm`). It
ships the public marketing site (Next.js) and a dedicated Filament 5 admin
panel (Laravel 13) for editing every section of the site without touching code.

```
~/Projects/cosmic/
├── frontend/           Next.js 16.2 marketing site (cosmic theme)
├── backend/            Laravel 13 + Filament 5 admin + public marketing API
├── infra/
│   └── nginx/          Routes /admin + /api → backend, * → frontend
├── docker-compose.yml  Orchestrates everything
├── MARKETING_STRATEGY.md       Positioning, competitor analysis, page copy
└── MARKETING_BUILD_PROMPTS.md  Step-by-step prompts to build it
```

## Quick start

```bash
# 1. Install dependencies and bring infra up
cd ~/Projects/cosmic
docker-compose up -d mysql redis mailpit

# 2. Bootstrap the backend (one-time)
#    Full instructions in backend/README.md
docker-compose run --rm --no-deps backend \
    composer create-project laravel/laravel . "^13.0" --prefer-dist
cp backend/.env.example backend/.env
docker-compose run --rm --no-deps backend php artisan key:generate

# 3. Bring the full stack up
docker-compose up -d

# 4. Run prompts from MARKETING_BUILD_PROMPTS.md to populate the rest
```

After bootstrap:

| URL | Purpose |
|---|---|
| <http://localhost/> | Marketing site (Next.js) |
| <http://localhost/admin> | Filament admin |
| <http://localhost/api/v1/marketing/...> | Public read API |
| <http://localhost:8025> | Mailpit (mail catcher) |

## Working with this repo

- **Always run composer / artisan / npm inside Docker.** Never on the host.
  See `backend/README.md` and `frontend/README.md` for command patterns.
- **Marketing content** is edited in the Filament admin at `/admin`.
  No code changes needed for content updates.
- **Site copy and strategy** live in `MARKETING_STRATEGY.md` — single source
  of truth for messaging.
- **Build sequence** lives in `MARKETING_BUILD_PROMPTS.md` — six self-contained
  prompts you paste into Claude Code, one per session.

## Deploy

See `DEPLOYMENT_GUIDE.md` (will be rewritten in Prompt 6 to cover the new
two-app structure).
