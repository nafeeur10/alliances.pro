import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FooterSection } from "@/components/layout/sections/footer";
import { SectionShell } from "@/components/marketing/section-shell";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Teams — Alliances PRO",
  description: "Pipeline workflows that scale from solo operators to teams of fifty.",
  path: "/teams"
});

export default function TeamsPage() {
  return (
    <main className="min-h-screen">
      <SectionShell
        as="section"
        className="pt-32"
        eyebrow="Teams"
        heading="Built for teams of one to fifty."
        subheading="Alliances PRO scales from a solo operator to a 50-person agency without changing how the workspace feels. The deep dive on team workflows is coming soon."
      >
        <div className="mx-auto flex max-w-md flex-col items-center gap-4">
          <p className="text-muted-foreground text-center text-sm">
            Want to know how we think about teams? The story behind the product is on the about page.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <Link href="/about" className="inline-flex items-center gap-1.5">
                Read about the team
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </SectionShell>

      <FooterSection />
    </main>
  );
}
