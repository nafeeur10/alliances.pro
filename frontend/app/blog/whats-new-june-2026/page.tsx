import type { Metadata } from "next";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

import { FooterSection } from "@/components/layout/sections/footer";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArticleSchema } from "@/components/seo/json-ld";
import { authorInitials } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

const POST_PATH = "/blog/whats-new-june-2026";
const POST_TITLE = "What's New in Alliances CRM — June 2026 Product Update";
const POST_DESCRIPTION =
  "A round-up of everything we shipped to Alliances CRM in the last few weeks — Google Sign-In, Spanish (i18n), Redis-backed dashboards, a read-only demo workspace, password resets, duplicate-lead protection, email open tracking, and more.";
const POST_COVER = "/blog/product-update-01.png";
const PUBLISHED_AT = "2026-06-07T00:00:00.000Z";
const PUBLISHED_DISPLAY = "June 7, 2026";
const READING_MINUTES = 6;
const AUTHOR = "Nafeeur";
const AUTHOR_AVATAR = "/avatars/nafeeur.png";

export const metadata: Metadata = buildMetadata({
  title: POST_TITLE,
  description: POST_DESCRIPTION,
  path: POST_PATH,
  type: "article",
  image: POST_COVER,
  publishedTime: PUBLISHED_AT
});

const POST_BODY = `Over the past few weeks we've shipped a steady stream of features, performance fixes, and polish to Alliances CRM. Here's a rundown of everything that's now live in production.

## 1. Google Sign-In — One-Click Login

New users can now sign up and log in with their **Google account** — no email or password required. The OAuth flow is fully wired up, and we hotfixed an edge-case render loop on the callback page, so sign-in is smooth end to end.

**Why it matters:** Lower onboarding friction for trial users. No passwords to remember.

## 2. Spanish Language Support (i18n)

The entire auth flow, page labels, and forms now support both **English and Spanish**. On top of that, every workspace owner can **override labels per workspace** (e.g. rename "Leads" to "Prospects").

We also split out the **country code + phone number picker** into its own component so international users get a proper phone input experience.

**Why it matters:** LATAM market expansion is now a realistic next step.

## 3. Dashboard Performance — 500 Fix + Redis Cache

Hot workspace endpoints (dashboard stats, sidebar counts) are now backed by **Redis cache**. We also tracked down and fixed a long-standing dashboard 500 error.

**Why it matters:** Noticeably faster dashboard loads for larger workspaces.

## 4. Demo / Showcase Account with Seeded Data

Visitors can now experience the full CRM without signing up, via a **read-only demo workspace** pre-seeded with leads, deals, organizations, and tasks. A server-side **write guard** prevents any data mutation from the demo account.

**Why it matters:** Perfect for sales demos, the public marketing site, and investor pitches.

## 5. Forgot Password / Reset Password Flow

The full **forgot password → reset link → new password** flow is now live, complete with email templates and tested end to end.

## 6. Duplicate Lead Protection

You can no longer create a Lead with a **duplicate email or phone** inside the same workspace. Backend validation enforces it, and the frontend surfaces a clear error message.

**Why it matters:** Better data hygiene — accidental duplicates from bulk imports or CSV uploads are blocked at the source.

## 7. Email Tab Redesign + Open Tracking

The Email tab on Leads and Contacts has been refreshed, and every outgoing email now carries **open status tracking** — you can see who opened your email and when. The reply catch-up flow also got some improvements.

> ⚠️ This feature is in production but still needs heavier real-world testing. Feedback welcome.

## 8. Polymorphic Deal Assignee + Searchable People Picker

Previously, Deals could only be assigned to registered users. Now **any workspace member** — registered or invited — can be set as the assignee. We also added a **searchable picker** that surfaces every person in the workspace in one place.

**Why it matters:** Cleaner deal ownership tracking for larger teams.

## 9. Inline "+ New Role" Button on the Member Invite Form

If the role you need doesn't exist when you're inviting a member, you no longer have to navigate to a separate page. A **side sheet opens inline** from the invite form so you can create the role right there.

## 10. Super Admin Tools

Three new capabilities landed in the admin panel:

- **Lifetime Free Access grant** — flip a switch to unlock paid features for a user permanently.
- **Trial End Date override** — \`trial_ends_at\` can now be edited manually (useful for sales requests, special deals, and so on).
- **Users sidebar menu** — wider, padded user-management pages with a proper client-side guard.

We also shipped a bug fix: **lifetime users were getting blocked by the trial-expired gate** — that's resolved.

## 11. Call Log Avatars + Pro Monthly Member Gate Fix

Every entry in the Call Log now shows a proper **avatar** next to it. We also fixed a bug where **Pro Monthly paid workspaces** were being incorrectly blocked by the member access gate.

## 12. Feedback Widget — Bottom-Left, Crisp + Web3Forms Wired

The floating feedback widget moved to the **bottom-left** corner (it was clashing with Crisp chat in the bottom-right). Both the Web3Forms key and Crisp ID are now properly wired in the production environment.

## 13. Production Polish

- Default avatar now ships via \`storage/app/public\`.
- Paddle **live client token** is properly injected at production build time.
- Faker is now a runtime dependency, so the demo seeder works in production.
- Member invitation emails now show the **real inviter's email** (no more placeholder).
- The deploy script strips stray \`.env.local\` files before the frontend build, keeping builds clean.

## 14. Small but Important UI Fix

We added consistent **left/right padding** across the entire app — some pages were running content right up to the screen edge on mobile and tablet.

## What's Next

- Full QA + analytics for the Email tab and open tracking.
- More languages beyond Spanish.
- A richer, more diverse seeded dataset in the demo workspace.

Got feedback? Drop it via the widget in the bottom-left corner of the app — we read every message.
`;

export default function ProductUpdateJune2026Page() {
  return (
    <main className="min-h-screen">
      <ArticleSchema
        headline={POST_TITLE}
        description={POST_DESCRIPTION}
        url={POST_PATH}
        image={POST_COVER}
        authorName={AUTHOR}
        datePublished={PUBLISHED_AT}
        readingMinutes={READING_MINUTES}
      />

      {/* ---------- Hero ---------- */}
      <section className="pt-28 pb-10 lg:pt-36">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
              <Badge
                variant="outline"
                className="bg-background/60 rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase backdrop-blur"
              >
                <span className="bg-primary mr-2 inline-block size-1.5 rounded-full" />
                Product Update
              </Badge>
            </div>

            <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {POST_TITLE}
            </h1>

            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              Google Sign-In, Spanish (i18n), Redis-backed dashboards, a read-only demo workspace,
              password resets, duplicate-lead protection, email open tracking — and a long list of
              quieter polish. Here's the full rundown.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
              <div className="flex items-center gap-3 text-left">
                <Avatar className="size-10 border border-violet-200/70 dark:border-violet-500/30">
                  <AvatarImage src={AUTHOR_AVATAR} alt={AUTHOR} />
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
                    {authorInitials(AUTHOR)}
                  </AvatarFallback>
                </Avatar>
                <div className="leading-tight">
                  <div className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
                    Author
                  </div>
                  <div className="text-foreground text-sm font-semibold">{AUTHOR}</div>
                </div>
              </div>

              <span className="text-muted-foreground/50 hidden sm:inline" aria-hidden>
                ·
              </span>
              <div className="flex items-center gap-3 text-left">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-emerald-200/70 bg-white text-emerald-500 shadow-sm dark:border-emerald-500/30 dark:bg-white">
                  <Calendar className="size-5" aria-hidden strokeWidth={2.25} />
                </div>
                <div className="leading-tight">
                  <div className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
                    Published
                  </div>
                  <div className="text-foreground text-sm font-semibold">{PUBLISHED_DISPLAY}</div>
                </div>
              </div>

              <span className="text-muted-foreground/50 hidden sm:inline" aria-hidden>
                ·
              </span>
              <div className="flex items-center gap-3 text-left">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-sky-200/70 bg-white text-sky-500 shadow-sm dark:border-sky-500/30 dark:bg-white">
                  <Clock className="size-5" aria-hidden strokeWidth={2.25} />
                </div>
                <div className="leading-tight">
                  <div className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
                    Time to read
                  </div>
                  <div className="text-foreground text-sm font-semibold">
                    {READING_MINUTES} min read
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-2xl border shadow-sm">
              <Image
                src={POST_COVER}
                alt="Alliances CRM product update cover"
                width={1600}
                height={900}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Body ---------- */}
      <section className="pb-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <MarkdownArticle>{POST_BODY}</MarkdownArticle>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
