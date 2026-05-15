import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  roadmapSection,
  STATUS_LABEL,
  upcomingFeatures,
  type RoadmapStatus
} from "@/@data/roadmap";
import { FooterSection } from "@/components/layout/sections/footer";
import { SectionShell } from "@/components/marketing/section-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Roadmap — What's coming next on Alliances PRO",
  description:
    "WhatsApp, Slack, SMS integrations, follow-up automation, and lead/follow-up scoring — what we're building next on the Alliances PRO CRM.",
  path: "/roadmap"
});

const STATUS_PILL_CLASSES: Record<RoadmapStatus, string> = {
  planned: "bg-slate-100 text-slate-700 ring-slate-200",
  in_design: "bg-sky-100 text-sky-700 ring-sky-200",
  building: "bg-amber-100 text-amber-800 ring-amber-200",
  beta: "bg-emerald-100 text-emerald-800 ring-emerald-200"
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen">
      <SectionShell
        as="section"
        className="pt-32"
        eyebrow={roadmapSection.eyebrow}
        heading={roadmapSection.headline}
        subheading={roadmapSection.description}
      >
        <ul className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {upcomingFeatures.map((item) => (
            <li
              key={item.title}
              className="bg-background/60 relative flex flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
            >
              <div
                className="ring-border mb-5 flex size-16 items-center justify-center rounded-2xl ring-1"
                style={{ backgroundColor: item.accentColor }}
              >
                <Image
                  src={item.icon}
                  alt=""
                  aria-hidden
                  width={40}
                  height={40}
                  unoptimized
                  className="size-10"
                />
              </div>

              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide ring-1 ring-inset",
                    STATUS_PILL_CLASSES[item.status]
                  )}
                >
                  {STATUS_LABEL[item.status]}
                </span>
                {item.eta && (
                  <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    {item.eta}
                  </span>
                )}
              </div>

              <h3 className="text-foreground mb-2 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </li>
          ))}
        </ul>

        <p className="text-muted-foreground mx-auto mt-10 max-w-2xl text-center text-sm">
          We share what we&apos;re working on so you can plan around it — but dates and order can
          move. Want to influence priorities?{" "}
          <Link href="/#contact" className="text-primary font-medium hover:underline">
            Tell us what you&apos;d use most
          </Link>
          .
        </p>

        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/pricing">See pricing</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#contact">Talk to us</Link>
          </Button>
        </div>
      </SectionShell>

      <FooterSection />
    </main>
  );
}
