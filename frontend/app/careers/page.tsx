import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Briefcase } from "lucide-react";

import { careersIntro, openRoles } from "@/@data/careers";
import { FooterSection } from "@/components/layout/sections/footer";
import { SectionShell } from "@/components/marketing/section-shell";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers — Alliances PRO",
  description: careersIntro.subheading,
  path: "/careers"
});

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      <SectionShell
        as="section"
        className="pt-32"
        eyebrow={careersIntro.eyebrow}
        heading={careersIntro.headline}
        subheading={careersIntro.subheading}
      >
        <div className="mx-auto max-w-2xl">
          {openRoles.length > 0 ? (
            <ul className="space-y-3">
              {openRoles.map((role) => (
                <li key={role.title}>
                  <Link
                    href={role.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-background hover:border-primary/40 flex items-center justify-between gap-4 rounded-xl border p-5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-emerald-200/70 bg-white text-emerald-500 dark:border-emerald-500/30">
                        <Briefcase className="size-5" aria-hidden strokeWidth={2.25} />
                      </div>
                      <div>
                        <h3 className="text-foreground font-semibold">{role.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {role.team} · {role.location} · {role.type}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="text-muted-foreground group-hover:text-primary size-5 transition-colors"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-muted/40 rounded-2xl border p-8 text-center">
              <Badge variant="outline" className="mb-3 rounded-full px-3 py-1 text-xs">
                <span className="mr-1.5 inline-block size-1.5 rounded-full bg-amber-500" />
                No open roles right now
              </Badge>
              <h3 className="text-foreground text-lg font-semibold">
                We hire occasionally as we grow.
              </h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-relaxed">
                If you'd like to be considered when a role opens, drop a line to{" "}
                <a className="text-primary hover:underline" href="mailto:careers@alliances.pro">
                  careers@alliances.pro
                </a>{" "}
                with what you'd like to work on.
              </p>
            </div>
          )}
        </div>
      </SectionShell>

      <FooterSection />
    </main>
  );
}
