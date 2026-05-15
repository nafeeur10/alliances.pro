import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { featureList } from "@/@data/features";
import Icon from "@/components/icon";
import { FooterSection } from "@/components/layout/sections/footer";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { RelatedLinks } from "@/components/marketing/related-links";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

const SLUG = "organization-leads";

export const metadata: Metadata = buildMetadata({
  title: "Organization-level lead management — Alliances PRO",
  description:
    "Every lead, deal, contact, and shared file rolls up under one organization record. Reach the right person without losing context.",
  path: `/features/${SLUG}`
});

const BODY = `In services, you don't sell to a person — you sell to an organization with multiple decision makers, gatekeepers, and end users. Alliances PRO's organization record is built around that reality.

## What lives on an organization record

- **All contacts at the org**, each with their own role, channel preference, and history
- **All leads** sourced from anyone at the org
- **All deals** in flight or closed
- **Shared files** — proposals, contracts, catalogues, NDAs — visible to every contact's record
- **Industry, size, region** — for segmentation and reporting
- **A single notes thread** for org-level intel that isn't tied to one person

Open the org page and you see the full picture: who you've spoken to, who you haven't, what's in flight, what's signed.

## Why org-level matters

When the procurement contact ghosts you, you can pivot to the ops manager **without losing the deal context** — because both contacts already share the org's history. When the buyer changes jobs and the new buyer takes over, you don't restart. The org remembers.

For account managers handling 50+ accounts, the org list view becomes a triage board: sort by **days since last contact**, filter by **industry**, find quiet accounts before they churn.

## Who it's for

- Account managers running enterprise or mid-market service contracts
- Founders selling to organizations with multiple stakeholders
- Service businesses where one customer = many people you talk to

## How it fits with the rest of the CRM

- **Lead Management** records always link up to an organization.
- **Email campaigns** can target every contact at an org, segmented by role.
- **Client relationships** post-close use the org as the system of record — renewals, expansion, and check-ins all live here.
- **Roles and permissions** can restrict org visibility per team.

## What this looks like day-to-day

- Discovery call with a new contact at an existing org? The org page shows you what your team already knows.
- Re-engaging a quiet account? Org-level view shows the last touch across every contact, not just yours.
- Quarterly review with a renewing client? Org page is the prep doc.

The outcome: institutional memory at the org level — so context survives turnover on both sides.`;

export default function OrganizationLeadsPage() {
  const feature = featureList.find((f) => f.slug === SLUG);
  if (!feature) notFound();

  const related = featureList
    .filter((f) => f.slug !== SLUG)
    .slice(0, 3)
    .map((f) => ({ label: f.title, description: f.description, href: f.href }));

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 pt-32 pb-12 text-center sm:px-6">
        <p className="text-primary mb-3 text-sm font-semibold tracking-wider uppercase">Feature</p>
        <div
          className="ring-border mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl ring-1"
          style={feature.bgColor ? { backgroundColor: feature.bgColor } : undefined}
        >
          <Icon name={feature.icon} className="text-foreground/80 size-10" />
        </div>
        <h1 className="mx-auto max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {feature.title}
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          {feature.description}
        </p>
      </section>

      <section className="container mx-auto px-4 pb-12 sm:px-6">
        <div
          className="mx-auto max-w-5xl overflow-hidden rounded-2xl border"
          style={feature.bgColor ? { backgroundColor: feature.bgColor } : undefined}
        >
          <Image
            src={feature.image}
            alt={feature.title}
            width={1600}
            height={900}
            unoptimized
            className="h-auto w-full object-contain"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <MarkdownArticle>{BODY}</MarkdownArticle>
        </div>
      </section>

      <RelatedLinks heading="Related features" links={related} />

      <section className="container mx-auto px-4 pb-20 sm:px-6">
        <div className="from-muted to-muted/50 mx-auto max-w-5xl rounded-2xl border bg-gradient-to-br p-8 text-center sm:p-10">
          <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
            See the full org picture
          </h2>
          <p className="text-muted-foreground mb-6">
            See pricing or talk to us about Alliances PRO for your team.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/pricing">See pricing</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
