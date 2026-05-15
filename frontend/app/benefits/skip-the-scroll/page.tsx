import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { benefitList } from "@/@data/benefits";
import { FooterSection } from "@/components/layout/sections/footer";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

const SLUG = "skip-the-scroll";

export const metadata: Metadata = buildMetadata({
  title: "Skip the scroll, get the context — Alliances PRO",
  description:
    "An AI summary lives at the top of every lead, deal, and client record. Walk into the call already up to speed.",
  path: `/benefits/${SLUG}`
});

const BODY = `When you open a lead with eight months of history, you have two options: scroll through every email and note hoping the important bit jumps out, or wing the call. Both are bad. Alliances PRO gives you a third option.

## An AI summary sits at the top of every record

Every lead, deal, and client record has an **AI summary** rendered at the top of the page. It's two to four short bullets, refreshed automatically whenever new activity is logged. It pulls from:

- Notes you've left
- Emails sent and received
- Meeting outcomes
- Stage history and deal value
- The last call's transcript or summary (if logged)

You scan it in 10 seconds. You know who you're talking to, what they care about, and what they last asked for — before the call starts.

## What's in the summary

The summary is structured so the same shape appears on every record:

- **Who they are** — role, organization, how you found them
- **Where things stand** — current stage, last interaction, any open follow-up
- **What matters to them** — pain points, objections, requested features
- **Next move** — what they're expecting from you, and when

No marketing fluff. Just the parts a rep needs to walk in informed.

## It updates as work happens

You don't ask for the summary; it regenerates whenever the record changes meaningfully — a new note, a stage change, a logged call. So when you open the lead at 9 AM for a 9:15 call, the summary already reflects yesterday's email exchange.

## Pairs with email drafts

The same context that builds the summary is also what drafts your follow-up emails. So when you finish the call and click **Draft follow-up email**, the draft already knows what was discussed — because it's reading the same record.

## What this looks like day-to-day

- Walking into a 1:1 with your manager? The client summary is your prep doc.
- Picking up a lead from a teammate on vacation? The summary is the handoff.
- Re-engaging a stale lead from 6 months ago? The summary reminds you why you cared.

The outcome: every call starts at the relevant moment, not at "remind me who you are."`;

export default function SkipTheScrollPage() {
  const benefit = benefitList.find((b) => b.slug === SLUG);
  if (!benefit) notFound();

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 pt-32 pb-12 text-center sm:px-6">
        <p className="text-primary mb-3 text-sm font-semibold tracking-wider uppercase">Benefit</p>
        <div className="bg-background ring-border mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl shadow-sm ring-1">
          <Image
            src={benefit.icon}
            alt=""
            aria-hidden
            width={48}
            height={48}
            unoptimized
            className="size-12"
          />
        </div>
        <h1 className="mx-auto max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {benefit.title}
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          {benefit.description}
        </p>
      </section>

      <section className="container mx-auto px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <MarkdownArticle>{BODY}</MarkdownArticle>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20 sm:px-6">
        <div className="from-muted to-muted/50 mx-auto max-w-5xl rounded-2xl border bg-gradient-to-br p-8 text-center sm:p-10">
          <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
            Walk into every call up to speed
          </h2>
          <p className="text-muted-foreground mb-6">
            See pricing or talk to us about how the AI summary fits your team.
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
