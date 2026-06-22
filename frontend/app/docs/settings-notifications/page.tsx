import type { Metadata } from "next";
import Image from "next/image";

import { FooterSection } from "@/components/layout/sections/footer";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { buildMetadata } from "@/lib/seo";

const DOC_PATH = "/docs/settings-notifications";
const DOC_TITLE = "Notification Settings — Alliances PRO";
const DOC_DESCRIPTION =
  "Learn how to stop the Daily Digest email and how to show or hide the Feedback button from your profile settings.";

export const metadata: Metadata = buildMetadata({
  title: DOC_TITLE,
  description: DOC_DESCRIPTION,
  path: DOC_PATH,
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
`;

export default function SettingsNotificationsPage() {
  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-20">
        <div className="container">
          <div className="mx-auto max-w-(--breakpoint-xl)">
            <div className="mb-8">
              <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-widest uppercase">
                Settings
              </p>
              <h1 className="text-foreground text-3xl font-bold tracking-tight">
                Notification Settings
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                Control Daily Digest email and the Feedback button from your profile.
              </p>
            </div>

            <MarkdownArticle>{DOC_BODY}</MarkdownArticle>

            <div className="mt-10">
              <h2 className="text-foreground mb-4 text-2xl font-bold tracking-tight">Screenshot</h2>
              <Image
                src="/docs/notification.png"
                alt="Notification settings screen showing Daily Digest Email and Feedback Button toggles"
                width={623}
                height={373}
                unoptimized
                className="rounded-2xl border"
              />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
