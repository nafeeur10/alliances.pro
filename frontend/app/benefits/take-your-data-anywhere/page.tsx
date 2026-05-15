import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { benefitList } from "@/@data/benefits";
import { FooterSection } from "@/components/layout/sections/footer";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

const SLUG = "take-your-data-anywhere";

export const metadata: Metadata = buildMetadata({
  title: "No lock-in, take your data anywhere — Alliances PRO",
  description:
    "Export every lead, deal, and client to CSV anytime. Cancel from inside the app. Your data is yours from day one to day three hundred.",
  path: `/benefits/${SLUG}`
});

const BODY = `Lock-in is how older CRMs keep customers who would rather leave. Alliances PRO doesn't do that. Your data is yours, your account is yours to close, and both decisions live in the app — not behind a support ticket.

## Export anything to CSV, any time

From the lead, deal, or client list view, click **Export** and you get a CSV of every record visible in the current view, with every field. Filters apply: export just one segment, or export the entire database.

You can export:

- **Leads** — every field, custom fields included
- **Deals** — including stage history and value changes
- **Clients** — with all linked contacts and notes
- **Tasks** — with statuses and due dates
- **Communication history** — emails, calls, meeting outcomes

No "request a data dump and we'll email you in 7 business days." It's a button.

## Cancel inside the app

Your **billing page** has a **Cancel subscription** button. One click, confirm, done. No phone call. No retention specialist. No "are you sure?" loop designed to wear you down.

After cancellation:

- Your workspace stays read-only until the end of your paid period.
- You can export everything during that window.
- After the period ends, the workspace is suspended for 30 days (you can reactivate by re-subscribing), then deleted.

We don't hold your data hostage to make leaving painful.

## Why we built it this way

Service businesses run on relationships and reputation. A CRM that holds your customer list hostage is a CRM you can't trust to handle the relationship in the first place. We'd rather earn the renewal every month than trap you for a year.

Practically, this also means:

- **Switching costs are real and we accept that.** If we don't earn your business, you should be able to leave on a Tuesday afternoon.
- **Your team can audit your own data** without filing a request.
- **Compliance teams** can extract what they need for retention policies on their own schedule.

## What this looks like day-to-day

- A finance audit asks for all closed deals last quarter — you export in 90 seconds.
- You're testing another CRM for one team — you export their leads and import into the other tool, no friction.
- You decide to leave — you click cancel, you export, you go. No ill will, no ghost subscriptions on your card.

The outcome: you stay because the product is working, not because leaving is expensive.`;

export default function TakeYourDataAnywherePage() {
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
            Your data, your terms
          </h2>
          <p className="text-muted-foreground mb-6">
            See pricing or talk to us about our export and cancellation policies.
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
