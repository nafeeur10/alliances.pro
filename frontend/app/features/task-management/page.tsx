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

const SLUG = "task-management";

export const metadata: Metadata = buildMetadata({
  title: "Tasks management with overdue alerts — Alliances PRO",
  description:
    "Every task across leads, deals, and projects in one table. Overdue items flag red. Finish without leaving the page.",
  path: `/features/${SLUG}`
});

const BODY = `Tasks in most CRMs are an afterthought. Alliances PRO treats them as the connective tissue between leads, deals, clients, and team members — because in services, **the next task is the work**.

## One unified task table

All tasks across the workspace live in a single table you can filter by:

- **Owner** — yours, a teammate's, or unassigned
- **Status** — open, in progress, done
- **Linked record** — lead, deal, client, or standalone
- **Due date** — today, this week, overdue, no date
- **Priority** — low / medium / high

Filter once, save as a view. The "My open today" view becomes your morning checklist.

## Overdue flagged in red

Tasks past their due date show up **red across every surface** — the unified table, the lead record they're tied to, the owner's dashboard, the manager's overdue report. You can't miss them, and your manager can't either.

The overdue flag isn't a notification you can swipe away. It stays red until the task is done or rescheduled. **Dismissing requires action**, not just acknowledgement.

## Push tasks into the Pipeline

A task linked to a deal can be pushed onto the deal's pipeline card, so it travels with the deal through stages. When the deal moves to "Negotiation," the negotiation prep tasks appear on the card automatically. When it closes, the onboarding tasks take their place.

## Finish without leaving the page

Inline task actions — mark done, reassign, reschedule, comment — all happen in the same view. No modal cascade, no page reload. If you have 12 tasks to triage in the morning, you triage them in 90 seconds.

## Who it's for

- Account managers with rolling task lists across many clients
- Founders running their own pipeline who need a single source of truth
- Teams where one person's task blocks another's deal

## How it fits with the rest of the CRM

- Tasks created on a lead show up in **Lead Management** and the unified task view.
- Overdue follow-ups (a special task type) tie into the **Never miss a follow-up** workflow.
- Manager dashboards surface team-wide overdue counts.

The outcome: tasks stop slipping. Overdue items get attention because they're impossible to ignore.`;

export default function TaskManagementPage() {
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
            Stop tasks from slipping
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
