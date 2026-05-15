import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { benefitList } from "@/@data/benefits";
import { FooterSection } from "@/components/layout/sections/footer";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

const SLUG = "long-term-client-relationships";

export const metadata: Metadata = buildMetadata({
  title: "Build long-term client relationships, not just deals — Alliances PRO",
  description:
    "Closed Won isn't the end. Track renewals, schedule check-ins, and keep every stakeholder on one record long after the deal closes.",
  path: `/benefits/${SLUG}`
});

const BODY = `Most CRMs treat **Closed Won** as the finish line. The deal moves out of the pipeline, the rep moves on, and nobody opens the record again until the customer churns. Alliances PRO is built the other way: a closed deal is when the relationship actually starts.

## After Closed Won, the client stays on your radar

When a deal closes, the **client record** is preserved with everything attached — the deal, the contract, the contacts, the notes, the files. It doesn't disappear into an archive. Instead it shows up in your **Active Clients** view, with a **next check-in date** that you set the day the deal closes.

The default check-in is 30 days out. You can change it, and Alliances PRO reminds you when it's due — on the same channel system follow-up reminders use.

## Renewals don't sneak up on you

For service contracts, set a **renewal date** on the client record. Alliances PRO walks the clock backward:

- **90 days out:** record flags as "Renewal upcoming"
- **30 days out:** assigned account owner gets a renewal email + in-app notification
- **0 days out:** record shows a red **renewal due** state

You see the renewal coming with enough runway to actually have a conversation — not the day before the auto-bill.

## One record per organization, every stakeholder included

The procurement contact you sold to and the operations manager who actually uses the product can both live on the **same client record**. So can the finance person who pays the invoice. Each contact has a role, a channel preference, and their own communication history — but they're all visible on one page.

When the procurement contact leaves and a new one shows up, you don't lose the relationship. The org record stays; the contact changes.

## What this looks like day-to-day

- A weekly **Active Clients** dashboard ranks accounts by **days since last touch** — so accounts going quiet bubble up before they ghost.
- Every client record leads with: **Next check-in · in 12 days · Quarterly review call**.
- Renewal forecasts roll up automatically into the **manager's revenue retention report**.

The outcome: clients feel attended to, not abandoned. Renewals happen on purpose. Expansion conversations start before the customer goes shopping for an alternative.`;

export default function LongTermRelationshipsPage() {
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
            Keep clients close after the deal closes
          </h2>
          <p className="text-muted-foreground mb-6">
            See pricing or talk to us about how Alliances PRO fits your service business.
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
