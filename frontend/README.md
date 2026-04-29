# Alliances PRO Marketing — Frontend

Next.js 15 marketing site (cosmic theme) for [alliances.pro](https://alliances.pro).

Consumes the Laravel marketing API in `../backend` for all content. No marketing
copy is hardcoded — everything is editable through the Filament admin panel.

## First-time setup (run from cosmic repo root)

```bash
cd ~/Projects/cosmic
docker-compose up -d frontend

# Install npm packages (first time only)
docker-compose exec frontend npm ci
```

Open <http://localhost/> (nginx proxies to the Next.js dev server).

## Common commands

```bash
# Install a new package
docker-compose exec frontend npm install <package>

# Type-check
docker-compose exec frontend npx tsc --noEmit

# Lint
docker-compose exec frontend npm run lint

# Build for production
docker-compose exec frontend npm run build
```

**Always run npm inside the container.** See the project's CLAUDE.md.

## Folder layout

```
frontend/
├── app/                        Next.js App Router pages
├── components/
│   ├── layout/sections/        Cosmic section components (refactored to consume API)
│   ├── ui/                     shadcn-style primitives
│   ├── seo/                    JSON-LD components
│   └── icons/
├── lib/
│   ├── api.ts                  Typed API client → ../backend
│   ├── schemas/                Zod schemas
│   ├── seo.ts                  Metadata helper
│   └── experiments.ts          A/B test harness
├── public/
├── @data/                      (legacy hardcoded data — being replaced by API)
├── Dockerfile
├── package.json
└── tsconfig.json
```

## Where to go from here

After running Prompts 1 & 2 against the backend, run **Prompts 3-6** from
`../MARKETING_BUILD_PROMPTS.md` to wire the cosmic sections to the API and
add SEO, industry pages, comparison pages, blog, and analytics.
