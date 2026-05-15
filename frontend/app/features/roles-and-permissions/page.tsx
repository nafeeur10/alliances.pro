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

const SLUG = "roles-and-permissions";

export const metadata: Metadata = buildMetadata({
  title: "Member roles and permissions — Alliances PRO",
  description:
    "Invite members, build custom roles, and pick exactly what each role can do — add, edit, or delete by resource. Per-action control, per workspace.",
  path: `/features/${SLUG}`
});

const BODY = `Permissions in most CRMs are coarse: admin or not. Alliances PRO gives you granular, per-action, per-resource control — so reps can do their job without seeing what they shouldn't, and managers don't have to babysit access requests.

## Invite members, assign roles

Add a teammate by email. Pick a role (or build a new one). They get a workspace invite that respects their role from the first click. No "promote to admin, demote to user" dance.

Default roles you can start from:

- **Owner** — full control of the workspace, billing, integrations
- **Manager** — full team and pipeline visibility, can manage members
- **Member** — works their own pipeline, sees their own data
- **Viewer** — read-only access, useful for finance or leadership

Customize any of them, or build a fresh role from scratch.

## Per-action, per-resource control

For each role, you set permissions per **resource** (Leads, Deals, Clients, Tasks, Campaigns, Files, etc.) and per **action** (View, Create, Edit, Delete, Export).

So you can build a "**Junior Rep**" role that can:

- View their own leads
- Create and edit their own leads
- But **not** delete leads
- And **not** export the lead database

You can build a "**Finance**" role that can:

- View all closed deals (for revenue reconciliation)
- Export deal lists
- But **not** edit any pipeline records

You can build a "**Client Success**" role that can:

- View all clients
- Edit notes and tasks on clients
- But **not** touch the active sales pipeline

## Per-workspace, not per-org

If you run multiple workspaces (e.g., sales CRM and education CRM), permissions are scoped per workspace. A user can be an admin in one and a viewer in another. No leaky permission inheritance.

## Who it's for

- Teams of 5+ where everyone shouldn't see everything
- Agencies and consultancies handling multiple client pipelines in one workspace
- Service businesses with compliance or audit requirements

## How it fits with the rest of the CRM

- Roles apply across **Leads, Deals, Clients, Tasks, Email Campaigns** — every resource.
- Audit logs (coming soon) will surface who did what.
- Combined with **organization-level leads**, you can restrict visibility by team and territory.

The outcome: a workspace your team can actually share, with confidence about who sees what.`;

export default function RolesAndPermissionsPage() {
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
            Share your workspace, safely
          </h2>
          <p className="text-muted-foreground mb-6">
            See pricing or talk to us about role design for your team.
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
