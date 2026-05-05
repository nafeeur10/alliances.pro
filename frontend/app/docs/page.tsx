import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { FooterSection } from "@/components/layout/sections/footer";
import { SectionShell } from "@/components/marketing/section-shell";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Docs — Alliances PRO",
  description: "Developer and integration docs for the Alliances PRO API. Coming soon.",
  path: "/docs"
});

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      <SectionShell
        as="section"
        className="pt-32"
        eyebrow="Developer Docs"
        heading="API and integration docs are on the way."
        subheading="We're documenting the public API, webhooks, and CSV import contract. Until then, the help center covers the workspace itself."
      >
        <div className="mx-auto flex max-w-md flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-sky-200/70 bg-sky-50 text-sky-500 dark:border-sky-500/30 dark:bg-sky-500/10">
            <BookOpen className="size-7" aria-hidden strokeWidth={2} />
          </div>
          <p className="text-muted-foreground text-center text-sm">
            Need something specific now? Email{" "}
            <a className="text-primary hover:underline" href="mailto:hello@alliances.pro">
              hello@alliances.pro
            </a>{" "}
            and we'll send you the relevant interface details.
          </p>
          <Button asChild variant="outline">
            <Link href="/help" className="inline-flex items-center gap-1.5">
              Visit the Help Center
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </SectionShell>

      <FooterSection />
    </main>
  );
}
