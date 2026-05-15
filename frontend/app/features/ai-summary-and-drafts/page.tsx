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

const SLUG = "ai-summary-and-drafts";

export const metadata: Metadata = buildMetadata({
  title: "AI summary and email drafts — Alliances PRO",
  description:
    "AI summarizes any lead or deal in seconds, then drafts follow-up emails based on the actual conversation. Skip the reading and the typing.",
  path: `/features/${SLUG}`
});

const BODY = `Reading old emails to figure out where you left off is the worst-paid hour of your week. Writing the follow-up afterwards is the second worst. Alliances PRO replaces both with AI that reads the record for you and drafts what's next.

## Summary at the top of every record

Every lead, deal, and client record has an **AI summary** rendered at the top of the page. Two to four short bullets covering:

- Who they are and how they came in
- Current stage and last interaction
- What they care about (pain points, objections, asks)
- What they're expecting from you next

It updates automatically when new activity is logged. No "regenerate" button to remember. By the time you open the record at 9 AM for a 9:15 call, the summary already reflects yesterday's email exchange.

## Drafts based on the actual conversation

Click **Draft follow-up** on any record. The AI reads the recent communication and writes a follow-up email in **your voice** that:

- References the specific thing they said (not generic "circling back" copy)
- Suggests the next concrete step
- Matches the tone of your prior emails
- Includes any context they asked you to send (e.g., pricing, case study link)

You read it, tweak a sentence, send. The whole loop takes 30 seconds instead of 10 minutes.

## What it's good at

- **Long lead histories** — 6+ months of back-and-forth condensed in two bullets
- **Handoffs** — picking up a teammate's lead while they're on vacation
- **Re-engagement** — surfacing what mattered to a lead from a year ago
- **Routine follow-ups** — "thanks for the call, here's a recap" type drafts

## What it's not

- **Not a writer for cold outreach** — drafts work best when there's existing conversation to read.
- **Not a replacement for judgment** — every draft is yours to edit before sending. The CRM never auto-sends AI-generated email.
- **Not a black box** — the summary tells you what sources it drew from, so you can verify.

## Privacy and your data

AI calls process the content of the record being summarized. No record data is used to train external models. You can disable AI features per workspace if compliance requires it.

## Who it's for

- Reps and account managers running 30+ active records
- Founders moving fast across many conversations
- Anyone who'd rather review and refine than start from a blank page

## How it fits with the rest of the CRM

- Reads from **Lead Management, Email Campaigns, Tasks**, and notes.
- Plays well with **Email campaigns from your own domain** — drafts can fill in personalized fields for a campaign.
- The same context engine that powers summaries powers the **Skip the scroll** benefit on the marketing site.

The outcome: less reading old threads, less staring at blank compose windows, more time on the conversation that matters.`;

export default function AiSummaryAndDraftsPage() {
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
            Stop reading old threads
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
