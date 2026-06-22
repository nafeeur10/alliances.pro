import type { Metadata } from "next";

import { FooterSection } from "@/components/layout/sections/footer";
import { docsSections, type DocsSection } from "@/@data/docs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Docs — Alliances PRO",
  description: "Guides and reference documentation for Alliances PRO.",
  path: "/docs"
});

/* ── Per-section gradient SVG icons ─────────────────────────────────────── */

function IconInstallation() {
  return (
    <svg aria-hidden viewBox="0 0 32 32" fill="none" className="h-8 w-8">
      <defs>
        <radialGradient
          id="ig-l"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 12 3)"
        >
          <stop stopColor="#0EA5E9" />
          <stop stopColor="#22D3EE" offset=".527" />
          <stop stopColor="#818CF8" offset="1" />
        </radialGradient>
        <radialGradient
          id="ig-d"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 16 7)"
        >
          <stop stopColor="#0EA5E9" />
          <stop stopColor="#22D3EE" offset=".527" />
          <stop stopColor="#818CF8" offset="1" />
        </radialGradient>
      </defs>
      <g className="dark:hidden">
        <circle cx="12" cy="12" r="12" fill="url(#ig-l)" />
        <path
          d="m8 8 9 21 2-10 10-2L8 8Z"
          fillOpacity="0.5"
          className="fill-white stroke-slate-900"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className="hidden dark:inline">
        <path
          d="m4 4 10.286 24 2.285-11.429L28 14.286 4 4Z"
          fill="url(#ig-d)"
          stroke="url(#ig-d)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function IconLeads() {
  return (
    <svg aria-hidden viewBox="0 0 32 32" fill="none" className="h-8 w-8">
      <defs>
        <radialGradient
          id="lg-l"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 16 3)"
        >
          <stop stopColor="#10B981" />
          <stop stopColor="#06B6D4" offset=".527" />
          <stop stopColor="#3B82F6" offset="1" />
        </radialGradient>
        <radialGradient
          id="lg-d"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 16 5)"
        >
          <stop stopColor="#10B981" />
          <stop stopColor="#06B6D4" offset=".527" />
          <stop stopColor="#3B82F6" offset="1" />
        </radialGradient>
      </defs>
      <g className="dark:hidden">
        <circle cx="16" cy="12" r="12" fill="url(#lg-l)" />
        <path
          d="M16 6a5 5 0 1 1 0 10A5 5 0 0 1 16 6zM8 26c0-5 4-8 8-8s8 3 8 8"
          fillOpacity="0.5"
          className="fill-white stroke-slate-900"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className="hidden dark:inline">
        <path
          d="M16 4a6 6 0 1 1 0 12A6 6 0 0 1 16 4zM6 28c0-6 4-10 10-10s10 4 10 10"
          fill="url(#lg-d)"
          stroke="url(#lg-d)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function IconDeals() {
  return (
    <svg aria-hidden viewBox="0 0 32 32" fill="none" className="h-8 w-8">
      <defs>
        <radialGradient
          id="dg-l"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 16 3)"
        >
          <stop stopColor="#F59E0B" />
          <stop stopColor="#F97316" offset=".527" />
          <stop stopColor="#EC4899" offset="1" />
        </radialGradient>
        <radialGradient
          id="dg-d"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 16 5)"
        >
          <stop stopColor="#F59E0B" />
          <stop stopColor="#F97316" offset=".527" />
          <stop stopColor="#EC4899" offset="1" />
        </radialGradient>
      </defs>
      <g className="dark:hidden">
        <circle cx="16" cy="14" r="12" fill="url(#dg-l)" />
        <path
          d="M6 9h20v5H6zM6 16h20v5H6z"
          fillOpacity="0.5"
          className="fill-white stroke-slate-900"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className="hidden dark:inline">
        <path
          d="M4 7h24v6H4zM4 15h24v6H4zM4 23h24v2H4"
          fill="url(#dg-d)"
          stroke="url(#dg-d)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function IconMarketing() {
  return (
    <svg aria-hidden viewBox="0 0 32 32" fill="none" className="h-8 w-8">
      <defs>
        <radialGradient
          id="mg-l"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 14 3)"
        >
          <stop stopColor="#EC4899" />
          <stop stopColor="#A855F7" offset=".527" />
          <stop stopColor="#6366F1" offset="1" />
        </radialGradient>
        <radialGradient
          id="mg-d"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 16 5)"
        >
          <stop stopColor="#EC4899" />
          <stop stopColor="#A855F7" offset=".527" />
          <stop stopColor="#6366F1" offset="1" />
        </radialGradient>
      </defs>
      <g className="dark:hidden">
        <circle cx="14" cy="12" r="12" fill="url(#mg-l)" />
        <path
          d="M5 12v8h5l9 6V6L10 12H5zM22 12a5 5 0 0 1 0 8"
          fillOpacity="0.5"
          className="fill-white stroke-slate-900"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className="hidden dark:inline">
        <path
          d="M4 11v10h5l9 7V4L9 11H4zM21 11a7 7 0 0 1 0 10"
          fill="url(#mg-d)"
          stroke="url(#mg-d)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function IconSettings() {
  return (
    <svg aria-hidden viewBox="0 0 32 32" fill="none" className="h-8 w-8">
      <defs>
        <radialGradient
          id="sg-l"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 16 3)"
        >
          <stop stopColor="#64748B" />
          <stop stopColor="#3B82F6" offset=".527" />
          <stop stopColor="#06B6D4" offset="1" />
        </radialGradient>
        <radialGradient
          id="sg-d"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 16 5)"
        >
          <stop stopColor="#64748B" />
          <stop stopColor="#3B82F6" offset=".527" />
          <stop stopColor="#06B6D4" offset="1" />
        </radialGradient>
      </defs>
      <g className="dark:hidden">
        <circle cx="16" cy="12" r="12" fill="url(#sg-l)" />
        <path
          d="M16 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 6h6l1 3a7 7 0 0 1 2 1l3-1 3 5-2 2a7 7 0 0 1 0 2l2 2-3 5-3-1a7 7 0 0 1-2 1l-1 3h-6l-1-3a7 7 0 0 1-2-1l-3 1-3-5 2-2a7 7 0 0 1 0-2L5 11l3-5 3 1a7 7 0 0 1 2-1l1-3z"
          fillOpacity="0.5"
          className="fill-white stroke-slate-900"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className="hidden dark:inline">
        <path
          d="M16 13a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM12 4h8l1.5 4a9 9 0 0 1 2.5 1.5L28 8l4 7-3 3a9 9 0 0 1 0 2l3 3-4 7-4-1.5A9 9 0 0 1 21.5 31L20 28h-8l-1.5 3a9 9 0 0 1-2.5-1.5L4 31 0 24l3-3a9 9 0 0 1 0-2L0 16l4-7 4 1.5A9 9 0 0 1 10.5 9L12 4z"
          fill="url(#sg-d)"
          stroke="url(#sg-d)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

const SECTION_ICONS: Record<string, () => React.JSX.Element> = {
  Installation: IconInstallation,
  "Lead Management": IconLeads,
  "Deal Management": IconDeals,
  Marketing: IconMarketing,
  Settings: IconSettings
};

/* ── Card ─────────────────────────────────────────────────────────────────── */

function SectionCard({ section }: { section: DocsSection }) {
  const Icon = SECTION_ICONS[section.title] ?? IconInstallation;
  const firstArticle = section.articles[0];
  const href = firstArticle ? `/docs/${firstArticle.slug}` : null;

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white p-6 ring-1 ring-slate-900/5 dark:bg-white/2.5 dark:ring-white/10">
      <Icon />
      <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
        {href ? (
          <a href={href}>
            <span className="absolute -inset-px rounded-xl" />
            {section.title}
          </a>
        ) : (
          section.title
        )}
      </h2>
      <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">{section.description}</p>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-20">
        <div className="container">
          <div className="mx-auto max-w-(--breakpoint-xl)">
            <div className="mb-10">
              <p className="text-primary mb-2 text-xs font-semibold tracking-widest uppercase">
                Documentation
              </p>
              <h1 className="text-foreground text-3xl font-bold tracking-tight">
                Welcome to Alliances PRO Docs
              </h1>
              <p className="text-muted-foreground mt-3 max-w-xl text-base">
                Step-by-step guides to help you set up and get the most out of Alliances PRO.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {docsSections.map((section) => (
                <SectionCard key={section.title} section={section} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
