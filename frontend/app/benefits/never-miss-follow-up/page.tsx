import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { benefitList } from "@/@data/benefits";
import { FooterSection } from "@/components/layout/sections/footer";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

const SLUG = "never-miss-follow-up";

export const metadata: Metadata = buildMetadata({
  title: "Never miss a follow-up again — Alliances PRO",
  description:
    "Every lead gets a follow-up date, a preferred channel, and a reminder before it's due — so the people who do the work never drop a ball.",
  path: `/benefits/${SLUG}`
});

const BODY = `Most leads don't go cold because they say no. They go cold because nobody followed up on time. Alliances PRO makes the follow-up a first-class field on every lead — not a sticky note, not a memory exercise.

## A follow-up date is required, not optional

When you create or move a lead, Alliances PRO asks for two things up front: **when** you'll follow up next, and **how** — phone, email, WhatsApp, or in person. Both fields are part of the lead record. There's no "I'll remember." If a teammate forgets to set one, the lead surfaces in the **Needs follow-up date** view until they do.

## Reminders on the channel that matters

Before the follow-up date hits, the assigned teammate gets a reminder in two places: an **email** in the morning, and an **in-app notification** when they open the workspace. They see the lead name, the preferred channel, and the last note — enough context to act in 30 seconds, no scrolling required.

If the channel is **WhatsApp**, the reminder includes the lead's number. If it's **phone**, the dialer link is one tap away. The reminder isn't a generic "follow up with someone" — it's "**call** Ahmed today; he asked you to follow up after Eid."

## Overdue is loud, not silent

If the follow-up date passes without an action logged, the lead flips to **overdue** and shows up red across:

- The owner's dashboard
- The lead pipeline (with a red dot on the card)
- The team manager's overdue follow-ups report

You'll notice before the lead does.

## What this looks like day-to-day

- A morning glance shows your three follow-ups for today, sorted by channel.
- Every lead detail page leads with: **Next follow-up · Tomorrow · WhatsApp**.
- After each action, the system asks "When's the next one?" — so a follow-up never closes without scheduling its successor.

The outcome is a pipeline that **stays warm by default**. You don't have to remember anything; the CRM does the remembering, and it picks the channel each lead actually replies on.`;

export default function NeverMissFollowUpPage() {
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
          <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">Try Alliances PRO</h2>
          <p className="text-muted-foreground mb-6">
            Sales CRM live. Education CRM in beta. Join the waitlist or see pricing.
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
