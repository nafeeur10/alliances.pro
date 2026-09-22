import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";

import { FooterSection } from "@/components/layout/sections/footer";
import { DocPager } from "@/components/docs/doc-nav";
import { ArticleRail, RailAuthor, RailSeparator } from "@/components/marketing/article-rail";
import { ContentIndex } from "@/components/marketing/content-index";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { ShareButtons } from "@/components/marketing/share-buttons";
import { DEFAULT_DOC_AUTHOR, getDocNeighbours, readingMinutes } from "@/lib/docs";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { extractHeadings } from "@/lib/toc";

const DOC_PATH = "/docs/settings-notifications";
const DOC_TITLE = "Notification Settings — Alliances PRO";
const DOC_DESCRIPTION =
  "Learn how to stop the Daily Digest email and how to show or hide the Feedback button from your profile settings.";

export const metadata: Metadata = buildMetadata({
  title: DOC_TITLE,
  description: DOC_DESCRIPTION,
  path: DOC_PATH
});

const DOC_BODY = `## How to Stop Daily Digest Email

The Daily Digest email delivers a summary of your CRM activity — new leads, deal updates, and tasks — once per day. If you'd rather not receive it, you can turn it off in seconds.

**Steps:**

1. Click your **profile picture** in the top-right corner of any page.
2. You will land on your **Profile** page.
3. Scroll down to the **Notifications** section.
4. Toggle **Daily Digest Email** to the **off** position.

The change takes effect immediately — no save button required. You can re-enable it at any time by toggling it back on.

---

## How to Show or Hide the Feedback Button

The Feedback button floats on every page and lets you send quick suggestions or bug reports to the team. If you find it distracting, you can hide it from the same Notifications section.

**Steps:**

1. Click your **profile picture** in the top-right corner of any page.
2. You will land on your **Profile** page.
3. Scroll down to the **Notifications** section.
4. Toggle **Feedback Button** to **hide** or **show** it.

Again, the change is instant and reversible.

## Screenshot

![Notification settings screen showing Daily Digest Email and Feedback Button toggles](/docs/notification.png?width=623)
`;

export default function SettingsNotificationsPage() {
  const headings = extractHeadings(DOC_BODY);
  const { prev, next } = getDocNeighbours("settings-notifications");

  return (
    <main className="min-h-screen">
      {/* ---------- Hero ---------- */}
      <section className="pt-32 pb-12">
        <div className="container">
          <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="px-1.5" aria-hidden>
              /
            </span>
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <span className="px-1.5" aria-hidden>
              /
            </span>
            <span className="text-foreground/80">Notification Settings</span>
          </nav>

          <p className="text-primary mt-4 text-xs font-semibold tracking-widest uppercase">
            Docs · Settings
          </p>

          <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Notification Settings
          </h1>

          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
            Control Daily Digest email and the Feedback button from your profile.
          </p>

          <div className="text-muted-foreground mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-sky-500" aria-hidden strokeWidth={2} />
              {readingMinutes(DOC_BODY)} min read
            </span>
          </div>
        </div>
      </section>

      {/* ---------- Body ---------- */}
      <section className="pb-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
            <ArticleRail>
              <RailAuthor {...DEFAULT_DOC_AUTHOR} />

              <RailSeparator />
              <ContentIndex headings={headings} label="Contents" />

              <RailSeparator />
              <ShareButtons compact url={absoluteUrl(DOC_PATH)} title="Notification Settings" />
            </ArticleRail>

            <div className="min-w-0">
              <div id="article-body">
                <MarkdownArticle>{DOC_BODY}</MarkdownArticle>
              </div>

              <DocPager prev={prev} next={next} />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
