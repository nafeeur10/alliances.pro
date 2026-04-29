# Alliances PRO — Brand Guide

> Single source of truth for the alliances.pro visual identity.
> Apply to every marketing surface (website, OG images, email templates,
> social media, slide decks, ads).

---

## 1. The mark

The Alliances PRO logo is a stylized **A** split into two halves with an
embedded handshake/alliance icon:

- **Left half** — deep brand blue (trust, depth, infrastructure)
- **Right half** — mint teal (growth, energy, multiplication)
- **Embedded handshake** — alliance, partnership, "PRO"

The split-A telegraphs the platform thesis: *one identity made of two parts
that work together* — Sales CRM + Education CRM, merchant + agency,
infrastructure + delivery. Use this metaphor in copy when relevant.

### Logo files (to be added)

- `frontend/public/logo/wordmark-light.svg` — full lockup, dark text on light bg
- `frontend/public/logo/wordmark-dark.svg`  — full lockup, light text on dark bg
- `frontend/public/logo/icon-light.svg`     — A-mark only, dark on light
- `frontend/public/logo/icon-dark.svg`      — A-mark only, light on dark
- `frontend/public/logo/og-default.png`     — 1200×630 default OG image
- `frontend/public/favicon.ico` + `apple-touch-icon.png`

### Clear space

Always leave at least **1× the icon's height** of empty space on every side.
Never put text or imagery flush against the mark.

### Don't

- Don't recolor the halves arbitrarily — the blue→teal pairing IS the brand
- Don't apply drop shadows or filters
- Don't outline the icon
- Don't crowd it against busy backgrounds — use a solid background plate when needed
- Don't squish or rotate

---

## 2. Color palette

### Primary (always)

| Role | Hex | OKLCH | Usage |
|---|---|---|---|
| **Brand Blue** (primary) | `#1B3F88` | `oklch(0.39 0.16 263)` | Primary buttons, links, headlines, hero accents |
| **Brand Teal** (accent) | `#3DD9B5` | `oklch(0.80 0.14 175)` | Secondary buttons, highlights, success states, badges |
| **Brand Black** (background — dark) | `#0A0A0A` | `oklch(0.145 0 0)` | Dark mode background, footer, overlay scrims |
| **Brand White** (background — light) | `#FFFFFF` | `oklch(1 0 0)` | Light mode background |

### Supporting (derived from primaries)

| Role | Hex | OKLCH | Usage |
|---|---|---|---|
| Brand Blue · 90 (deep) | `#142D63` | `oklch(0.30 0.13 263)` | Hover state on primary |
| Brand Blue · 50 (mid) | `#5B7BC4` | `oklch(0.58 0.13 263)` | Disabled, secondary text on light |
| Brand Blue · 10 (tint) | `#EEF2FB` | `oklch(0.96 0.02 263)` | Section backgrounds, input focus rings |
| Brand Teal · 90 (deep) | `#0FB994` | `oklch(0.68 0.15 175)` | Hover state on accent |
| Brand Teal · 10 (tint) | `#E5FAF4` | `oklch(0.96 0.04 175)` | Success backgrounds, badges |

### Neutrals

| Role | Hex | OKLCH | Notes |
|---|---|---|---|
| Slate · 950 | `#0F172A` | `oklch(0.20 0.04 264)` | Body text on light |
| Slate · 700 | `#334155` | `oklch(0.41 0.04 264)` | Secondary text |
| Slate · 500 | `#64748B` | `oklch(0.55 0.04 264)` | Muted / placeholder |
| Slate · 300 | `#CBD5E1` | `oklch(0.85 0.02 264)` | Borders, dividers |
| Slate · 100 | `#F1F5F9` | `oklch(0.96 0.01 264)` | Card backgrounds, light shading |

### Semantic

| Role | Hex | Usage |
|---|---|---|
| Success | `#10B981` | Confirmation toasts, success badges |
| Warning | `#F59E0B` | Warnings, "trial expiring" notices |
| Destructive | `#EF4444` | Errors, destructive button confirms |
| Info | `#3DD9B5` (teal) | Informational toasts (use brand teal) |

### Signature gradient

The "blue → teal" gradient is the single most ownable visual signature of
Alliances PRO. Use it sparingly but boldly:

```css
background: linear-gradient(135deg, #1B3F88 0%, #3DD9B5 100%);
```

**Where to use the gradient:**
- Hero headline accent text (gradient text fill)
- Primary CTA buttons on hero only (the rest of the site uses solid blue)
- Section divider strips (8px tall horizontal bar between major sections)
- OG image background
- Loading bars / progress indicators

**Where NOT to use it:**
- Body text (illegible at small sizes)
- Form inputs / cards (too noisy)
- Long surfaces (becomes oppressive)

---

## 3. Typography

The cosmic theme ships with **Bricolage Grotesque** for headings and **Geist Sans**
for body. Keep both — they read modern and feel "tech-confident."

| Style | Font | Weight | Size (desktop) | Size (mobile) | Tracking |
|---|---|---|---|---|---|
| H1 (hero) | Bricolage Grotesque | 700 | 4rem (64px) | 2.5rem | -0.02em |
| H2 (section) | Bricolage Grotesque | 600 | 2.5rem (40px) | 1.875rem | -0.015em |
| H3 (sub-section) | Bricolage Grotesque | 600 | 1.5rem (24px) | 1.25rem | -0.01em |
| Eyebrow | Geist Sans | 600 | 0.875rem (14px) | 0.75rem | 0.08em uppercase |
| Body | Geist Sans | 400 | 1rem (16px) | 1rem | 0 |
| Body large | Geist Sans | 400 | 1.125rem (18px) | 1rem | 0 |
| Caption | Geist Sans | 400 | 0.875rem (14px) | 0.875rem | 0 |
| Code | Geist Mono | 400 | 0.875rem | 0.875rem | 0 |

Line-height: 1.1 for headings, 1.6 for body.

---

## 4. Component styling rules

### Buttons

- **Primary** — solid Brand Blue (`#1B3F88`), white text, radius 0.625rem,
  hover lifts to Brand Blue · 90, focus ring 2px Brand Teal at 50% opacity.
- **Accent** — solid Brand Teal (`#3DD9B5`), Brand Blue text, hover to
  Brand Teal · 90.
- **Hero CTA only** — gradient (blue → teal), white text, subtle inner
  bezel shadow.
- **Ghost / outline** — 1px Brand Blue border, transparent fill, Brand Blue
  text. Hover fills with Brand Blue · 10.
- **Destructive** — solid `#EF4444`, white text. Use only for confirms.

### Cards

- Background: `#FFFFFF` (light) or `oklch(0.18 0.01 264)` (dark)
- Border: 1px Slate · 300 (light) / `rgba(255,255,255,0.08)` (dark)
- Radius: 0.875rem (slightly larger than buttons)
- Hover: lift 2px (translateY) + shadow `0 12px 32px -12px rgba(27, 63, 136, 0.18)`

### Links (in body text)

- Color: Brand Blue
- Underline on hover only
- Visited: same color (don't differentiate — modern web convention)

### Inputs

- Border: 1px Slate · 300, rounded 0.5rem
- Focus: 2px Brand Teal ring at 50% opacity, no border-color change
- Error: 1px `#EF4444` border + helper text
- Background: white (light) / `oklch(0.22 0.01 264)` (dark)

### Section spacing

- Vertical padding between sections: `py-24` (6rem) desktop, `py-16` mobile
- Use the gradient strip as a visual divider between high-stakes sections (hero ↔ benefits)

---

## 5. Imagery

- **Photography** — clean, well-lit product shots; avoid stock-photo people
  in suits. If using people, use real customers with proper releases.
- **Illustration** — geometric, minimal, 2-color (blue + teal), inspired by
  the split-A. Avoid heavy 3D / glossy renders.
- **Screenshots** — wrap product screenshots in a "browser chrome" frame
  with rounded corners + subtle border (Slate · 300). Drop shadow:
  `0 24px 64px -24px rgba(27, 63, 136, 0.25)`.
- **Iconography** — use [Lucide React](https://lucide.dev) only. 1.5px stroke.
  Match the icon color to the surrounding text.

---

## 6. Voice & tone (brief)

See `MARKETING_STRATEGY.md` §1 "Brand voice" for the full version. TL;DR:

- Confident, not arrogant.
- Practical over poetic.
- Operator-to-operator.
- Anti-bloat.

---

## 7. Accessibility

Every brand color combination must clear **WCAG 2.1 AA contrast**:

| Pairing | Ratio | Check |
|---|---|---|
| Brand Blue text on White | 9.4 : 1 | ✅ AAA |
| Brand Blue background + White text | 9.4 : 1 | ✅ AAA |
| Brand Teal background + Brand Blue text | 4.6 : 1 | ✅ AA (large text only) |
| Brand Teal background + Brand Blue · 90 text | 6.1 : 1 | ✅ AA |
| Slate · 700 text on White | 9.7 : 1 | ✅ AAA |

**Never** put white text on Brand Teal — contrast is only 1.7 : 1, fails WCAG.
Always use Brand Blue (or Brand Blue · 90) text on Teal backgrounds.

Focus rings must be visible (2px minimum, contrast ≥ 3:1 against the
adjacent surface).

---

## 8. Admin-editable theme

Brand colors live in the database (`brand_themes` table — single row) and
are editable from the Filament admin panel at **`/admin → Settings → Brand
Theme`**. Editors get a color-picker for every token below:

| Token | Default | Notes |
|---|---|---|
| primary_color | `#1B3F88` | Brand Blue |
| primary_foreground_color | `#FFFFFF` | Text on primary |
| accent_color | `#3DD9B5` | Brand Teal |
| accent_foreground_color | `#1B3F88` | Text on accent (must contrast!) |
| background_color | `#FFFFFF` | Page background (light mode) |
| foreground_color | `#0F172A` | Body text (light mode) |
| dark_background_color | `#0A0A0A` | Page background (dark mode) |
| dark_foreground_color | `#FFFFFF` | Body text (dark mode) |
| muted_color | `#F1F5F9` | Slate · 100 |
| border_color | `#CBD5E1` | Slate · 300 |
| ring_color | `#3DD9B5` | Focus ring (Brand Teal) |
| destructive_color | `#EF4444` | Errors |
| success_color | `#10B981` | Success |
| gradient_from | `#1B3F88` | Signature gradient start |
| gradient_to | `#3DD9B5` | Signature gradient end |

The frontend reads these at request time from
`GET /api/v1/marketing/theme` and injects them as CSS variables in the root
layout's inline `<style>` tag. Changes propagate to the live site within the
5-minute API cache TTL (or instantly via on-demand revalidation).

**Validation in Filament:**
- Each color picker enforces a valid hex.
- A live "Preview" panel renders a button + card + heading using the
  current edits, so editors see what they're changing before saving.
- Save button warns if the contrast between primary + primary_foreground
  drops below 4.5 : 1 (WCAG AA).

---

## 9. Quick reference card

```
┌─────────────────────────────────────────────────┐
│  ALLIANCES PRO BRAND COLORS                     │
├─────────────────────────────────────────────────┤
│  Primary  Brand Blue   #1B3F88   oklch(0.39 0.16 263)   │
│  Accent   Brand Teal   #3DD9B5   oklch(0.80 0.14 175)   │
│  Bg       Brand White  #FFFFFF                            │
│  Bg dark  Brand Black  #0A0A0A                            │
│  Text     Slate · 950  #0F172A                            │
│                                                           │
│  Signature gradient:                                      │
│  linear-gradient(135deg, #1B3F88, #3DD9B5)                │
└─────────────────────────────────────────────────┘
```
