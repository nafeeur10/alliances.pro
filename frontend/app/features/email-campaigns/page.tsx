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

const SLUG = "email-campaigns";

export const metadata: Metadata = buildMetadata({
  title: "Email campaigns from your own domain — Alliances PRO",
  description:
    "Build campaigns inside the CRM and send them from your own Gmail, Outlook, or company SMTP. Leads see your domain, not a marketing relay.",
  path: `/features/${SLUG}`
});

const BODY = `Most CRM email blasts come from a marketing relay — and leads can tell. The "via mailgun.net" tag, the generic unsubscribe footer, the inbox placement in Promotions. Alliances PRO does it differently: campaigns send from **your own mailbox**, so leads see the same From line they'd see if you typed the email yourself.

## Connect your own sending account

Plug in:

- **Gmail / Google Workspace** — OAuth, one click
- **Microsoft 365 / Outlook** — OAuth, one click
- **Custom SMTP** — for any provider with credentials

Once connected, every campaign you build sends through that mailbox. The From line is your address. The reply lands in your inbox. The unsubscribe header is RFC-compliant but the email looks personal.

## Build campaigns inside the CRM

- **Pick a segment** — filter leads or clients by stage, source, industry, last activity, custom field
- **Write the email** — rich text, merge fields (first name, org, last interaction), plain-text fallback
- **Schedule or send now** — staggered send to avoid throttling
- **Track** — opens, clicks, replies, bounces — per recipient, per campaign

## Why "your domain" matters

When you send from a marketing relay's domain:

- **Inbox placement suffers** — promotional tab or spam
- **Reply rates drop** — leads suspect a blast
- **Domain reputation is the relay's, not yours**

When you send from your own mailbox:

- Sent items live in your real Gmail or Outlook
- Replies land in your inbox naturally
- You build sender reputation on your own domain

## Who it's for

- Founders writing personal-feeling outreach at modest scale (hundreds, not millions)
- Account managers running re-engagement campaigns on closed-lost or quiet clients
- Service businesses where every email should feel one-to-one even when it's one-to-many

## How it fits with the rest of the CRM

- Campaigns target segments built from **Leads, Organizations, and Clients**.
- Replies log back to the relevant record automatically.
- **AI summary** picks up campaign threads when generating context.
- **Roles and permissions** can restrict who can send campaigns.

## Volume considerations

This is built for **personal-feel volumes** (under ~2,000/day per mailbox to stay safe with Gmail/Outlook quotas), not transactional or marketing-blast volumes. If you need to send 50K/day, this is not the right tool. If you need to send 200 highly relevant emails today, it is.

The outcome: campaigns that look and feel like the personal emails you'd send by hand — at the volume you actually need.`;

export default function EmailCampaignsPage() {
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
            Send from your domain
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
