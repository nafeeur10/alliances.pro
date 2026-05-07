import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Stethoscope, Users } from "lucide-react";

import { FooterSection } from "@/components/layout/sections/footer";
import { SectionShell } from "@/components/marketing/section-shell";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries — Alliances PRO",
  description:
    "How small agencies, consultancies, and service operators run their pipeline on Alliances PRO.",
  path: "/industries"
});

interface Industry {
  icon: typeof Users;
  iconBgClass: string;
  iconTextClass: string;
  name: string;
  pitch: string;
}

const INDUSTRIES: readonly Industry[] = [
  {
    icon: Users,
    iconBgClass:
      "bg-violet-50 border-violet-200/70 dark:bg-violet-500/10 dark:border-violet-500/30",
    iconTextClass: "text-violet-500 dark:text-violet-300",
    name: "Agencies",
    pitch:
      "Track every client engagement, retainer, and renewal in one place. Stop juggling Notion, spreadsheets, and Slack threads."
  },
  {
    icon: Building2,
    iconBgClass:
      "bg-emerald-50 border-emerald-200/70 dark:bg-emerald-500/10 dark:border-emerald-500/30",
    iconTextClass: "text-emerald-500 dark:text-emerald-300",
    name: "Consultancies",
    pitch:
      "Map your pipeline by stage, project, and consultant. AI summaries surface the next action so you stop dropping intros."
  },
  {
    icon: Stethoscope,
    iconBgClass: "bg-sky-50 border-sky-200/70 dark:bg-sky-500/10 dark:border-sky-500/30",
    iconTextClass: "text-sky-500 dark:text-sky-300",
    name: "Service operators",
    pitch:
      "Plumbers, photographers, coaches, contractors. Capture leads from the website, schedule follow-ups, never lose a booking."
  }
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen">
      <SectionShell
        as="section"
        className="pt-32"
        eyebrow="Industries"
        heading="Built for the people who run service businesses."
        subheading="Deep-dive industry pages are coming. Until then, here's how we think about the three groups we serve today."
      >
        <div className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 gap-6 md:grid-cols-3">
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="bg-background flex flex-col gap-4 rounded-2xl border p-6"
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-xl border ${industry.iconBgClass}`}
                >
                  <Icon
                    className={`size-6 ${industry.iconTextClass}`}
                    aria-hidden
                    strokeWidth={2}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-foreground text-lg font-semibold">{industry.name}</h3>
                  <Badge variant="outline" className="text-[10px]">
                    Deep dive coming
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{industry.pitch}</p>
              </div>
            );
          })}
        </div>

        <p className="text-muted-foreground mt-12 text-center text-sm">
          Don't see your industry?{" "}
          <Link className="text-primary hover:underline" href="/#contact">
            Tell us what you do
          </Link>{" "}
          — we add new pages based on real conversations.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/#features"
            className="text-primary inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            See product features
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </SectionShell>

      <FooterSection />
    </main>
  );
}
