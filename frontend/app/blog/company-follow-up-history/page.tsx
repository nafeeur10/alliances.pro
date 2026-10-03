import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

import { FooterSection } from "@/components/layout/sections/footer";
import { ArticleRail, RailSeparator } from "@/components/marketing/article-rail";
import { ContentIndex } from "@/components/marketing/content-index";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { ShareButtons } from "@/components/marketing/share-buttons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArticleSchema } from "@/components/seo/json-ld";
import { authorInitials } from "@/lib/blog";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { extractHeadings } from "@/lib/toc";

const POST_PATH = "/blog/company-follow-up-history";
const POST_TITLE = "Follow-ups That Tell the Whole Story";
const POST_DESCRIPTION =
  "Follow-up summaries, emails logged to company history automatically, a redesigned follow-up history, one main contact per company and test emails for your mailbox settings.";
const POST_COVER = "/blog/cover-follow-up-history-v2.svg";
const PUBLISHED_AT = "2026-10-03T00:00:00.000Z";
const PUBLISHED_DISPLAY = "October 3, 2026";
const READING_MINUTES = 3;
const AUTHOR = "Nafeeur";
const AUTHOR_AVATAR = "/avatars/nafeeur-96.webp";

export const metadata: Metadata = buildMetadata({
  title: POST_TITLE,
  description: POST_DESCRIPTION,
  path: POST_PATH,
  type: "article",
  image: POST_COVER,
  publishedTime: PUBLISHED_AT
});

const POST_BODY = `Knowing that a follow-up was done is useful. Knowing what happened is more useful. This update puts your next step first and records every conversation with a company, whoever on your team had it.

Here's what shipped on October 3.

## 1. Follow-ups come first

Open any company and **Follow-ups** is now the first tab. Your next action is the first thing you see, before leads, notes or files.

**Why it matters:** The question you ask most often when you open a company is "what do I do next?" Now you don't have to look for the answer.

## 2. "What happened?" on every completed follow-up

When you mark a follow-up as complete, Alliances PRO asks **What happened?** Write a line or two, such as who you spoke to, what they said and what's next. Your summary is saved to the company's history.

**Why it matters:** Anyone on your team can pick up the account and see the outcome, not just a tick that says it was done.

## 3. Every email counts as contact

Every email you send to a company or its contacts from the CRM is added to the company's follow-up history automatically. Campaign emails are included too.

When you send an email, you can also tick a box to **mark the company's pending follow-up as complete** in the same step.

**Why it matters:** A company you've only worked by email won't show up as "never contacted" any more, and you don't have to log the same conversation twice.

## 4. A history you can scan

The follow-up history has been redesigned as a clean list. Each entry shows who you spoke to, when, their contact details, the summary and your original notes.

Each entry also has an icon for how it happened: **Email**, **WhatsApp**, **Call** or **Meeting**.

## 5. One main contact per company

Each company now has exactly one main contact, clearly marked with their name and job title in the **Leads** tab. Importing more contacts into an existing company keeps its current main contact.

## 6. Email settings you can trust

- **Send a test email** before you save your email settings, so you know your mailbox works before you rely on it.
- **Clearer setup.** The form tells you exactly which details are missing, and warns you when your settings won't work with your provider, such as Gmail.

The full list is in the [changelog](/changelog).

## Try it today

Next time you complete a follow-up, add a quick summary so your whole team knows what happened.

Not using Alliances PRO yet? [Start your free 14-day trial](https://crm.alliances.pro/signup). You don't need a credit card.
`;

export default function CompanyFollowUpHistoryPage() {
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
          {/* Breadcrumb sits at the very top of the page, above the hero. */}
          <nav aria-label="Breadcrumb" className="text-muted-foreground mb-8 text-sm">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="px-1.5" aria-hidden>
              /
            </span>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <span className="px-1.5" aria-hidden>
              /
            </span>
            <span className="text-foreground/80 inline-block max-w-[52ch] truncate align-bottom">
              {POST_TITLE}
            </span>
          </nav>

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
              Completing a follow-up now asks what happened, every email you send is added to the
              company&apos;s history, and Follow-ups is the first tab you see.
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
                alt="A What happened? summary saved to a company's follow-up history"
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
      {/* Content index pinned left, the article running the full width beside it. */}
      <section className="pb-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
            <ArticleRail>
              <div className="flex items-center gap-3">
                <Avatar className="size-11 border border-violet-200/70 dark:border-violet-500/30">
                  <AvatarImage src={AUTHOR_AVATAR} alt={AUTHOR} />
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
                    {authorInitials(AUTHOR)}
                  </AvatarFallback>
                </Avatar>
                <div className="leading-tight">
                  <div className="text-foreground text-sm font-semibold">{AUTHOR}</div>
                  <div className="text-muted-foreground text-xs">Author</div>
                </div>
              </div>

              <RailSeparator />
              <ContentIndex headings={extractHeadings(POST_BODY)} />

              <RailSeparator />
              <ShareButtons compact url={absoluteUrl(POST_PATH)} title={POST_TITLE} />

              <RailSeparator />
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                ← All articles
              </Link>
            </ArticleRail>

            <div className="min-w-0" id="article-body">
              <MarkdownArticle>{POST_BODY}</MarkdownArticle>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
