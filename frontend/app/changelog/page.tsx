import type { Metadata } from "next";

import { changelogEntries, type ChangelogType } from "@/@data/changelog";
import { FooterSection } from "@/components/layout/sections/footer";
import { SectionShell } from "@/components/marketing/section-shell";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Changelog — Alliances PRO",
  description: "What we shipped and when. Newest first.",
  path: "/changelog"
});

const TYPE_STYLES: Record<ChangelogType, string> = {
  Feature:
    "border-emerald-300/60 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  Improvement: "border-sky-300/60 bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
  Fix: "border-amber-300/60 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  Update:
    "border-violet-300/60 bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function ChangelogPage() {
  return (
    <main className="min-h-screen">
      <SectionShell
        as="section"
        className="pt-32"
        eyebrow="Changelog"
        heading="What we shipped."
        subheading="Notable changes, newest first. Subscribe to the newsletter to get these in your inbox once a month."
      >
        <ol className="border-border/60 mx-auto max-w-3xl space-y-10 border-l pl-8">
          {changelogEntries.map((entry, idx) => (
            <li key={`${entry.date}-${idx}`} className="relative">
              <span className="bg-background border-primary/40 absolute -left-[2.1rem] mt-1.5 size-3 rounded-full border-2" />
              <div className="text-muted-foreground mb-2 flex flex-wrap items-center gap-3 text-xs">
                <span>{formatDate(entry.date)}</span>
                {entry.version ? (
                  <span className="text-foreground/80 font-mono text-[11px]">{entry.version}</span>
                ) : null}
                <Badge
                  variant="outline"
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase ${TYPE_STYLES[entry.type]}`}
                >
                  {entry.type}
                </Badge>
              </div>
              <h3 className="text-foreground text-lg font-semibold">{entry.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{entry.body}</p>
            </li>
          ))}
        </ol>
      </SectionShell>

      <FooterSection />
    </main>
  );
}
