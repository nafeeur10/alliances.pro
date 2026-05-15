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

const SLUG = "lead-management";

export const metadata: Metadata = buildMetadata({
  title: "Lead Management — Alliances PRO",
  description:
    "Every lead's tasks, communication history, notes, and files live on one record. Centralized so nothing slips between tabs.",
  path: `/features/${SLUG}`
});

const BODY = `Lead Management in Alliances PRO is the workspace where your pipeline lives. Every lead has its own page with everything you need to move the conversation forward — and nothing else competing for your attention.

## What lives on a lead record

- **Contact details** — name, role, organization, channel preferences
- **Tasks** — open, completed, overdue, with due dates and assignees
- **Communication history** — emails (sent + received), call logs, meeting outcomes, WhatsApp threads (when integrated)
- **Notes** — free-form, time-stamped, attributed to whoever wrote them
- **Files** — proposals, contracts, decks, scope docs — attached to the lead or the parent organization
- **Stage history** — every pipeline movement with timestamp and who moved it
- **AI summary** — refreshed automatically as activity is logged

Each section can be filtered, searched, and sorted independently. You don't have to scroll through 50 emails to find the one note from last Tuesday.

## Who it's for

Sales reps, account managers, and founders running their own pipeline. The interface assumes you're moving fast — keyboard shortcuts for common actions, inline edits, no double-clicks to confirm.

## How it fits with the rest of the CRM

- Leads roll up to **Organizations**, so a single org with five contacts shows you all five contact histories in one place.
- Tasks created from a lead surface in the unified **Tasks** view with overdue alerts.
- Closed-Won leads become **Clients**, preserving everything attached.
- The **AI summary and email drafts** feature reads the lead record to write your follow-ups.

## What this looks like day-to-day

- Pipeline kanban view in the morning to triage the day.
- Click into a lead, log the call, set the next follow-up, move on.
- Overdue follow-ups bubble to the top automatically — no separate "overdue" search.

The outcome: every lead is one click from full context, every action is one click from done.`;

export default function LeadManagementPage() {
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
            Try Lead Management
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
