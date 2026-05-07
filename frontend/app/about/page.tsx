import type { Metadata } from "next";
import { Compass, Target } from "lucide-react";

import { FooterSection } from "@/components/layout/sections/footer";
import { TeamSection } from "@/components/layout/sections/team";
import { Badge } from "@/components/ui/badge";
import { getHomeSections, pickString, readPayload } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Alliances PRO",
  description: "Who we are, why we built Alliances PRO, and the team behind the platform.",
  path: "/about",
  type: "website"
});

function splitHeadline(headline: string): { lead: string; highlight: string } {
  const trimmed = headline.trim();
  if (!trimmed) return { lead: "", highlight: "" };
  const tokens = trimmed.split(/\s+/);
  if (tokens.length < 2) return { lead: "", highlight: trimmed };
  const highlightCount = tokens.length >= 5 ? 2 : 1;
  return {
    lead: tokens.slice(0, tokens.length - highlightCount).join(" "),
    highlight: tokens.slice(tokens.length - highlightCount).join(" ")
  };
}

export default async function AboutPage() {
  const { sections } = await getHomeSections();
  const aboutPayload = readPayload<Record<string, unknown>>(sections, "about");

  const eyebrow = pickString(aboutPayload, "eyebrow", "About us");
  const headline = pickString(aboutPayload, "headline", "Built by operators, for operators.");
  const intro = pickString(
    aboutPayload,
    "sub",
    "Alliances PRO started as the CRM we wished we had — one workspace that follows a customer past the sale, with flat per-workspace pricing instead of per-seat math. We're a small team that ships every week."
  );

  const { lead, highlight } = splitHeadline(headline);

  return (
    <>
      <section className="container pt-16 pb-12 lg:pt-28 lg:pb-20">
        <div className="relative isolate">
          <div
            aria-hidden
            className="bg-primary/15 pointer-events-none absolute -top-16 left-1/2 -z-10 h-72 w-[80%] -translate-x-1/2 rounded-full blur-3xl"
          />

          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="bg-background/60 mb-5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase backdrop-blur"
            >
              <span className="bg-primary mr-2 inline-block size-1.5 rounded-full" />
              {eyebrow}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              {lead ? <span>{lead} </span> : null}
              <span className="from-primary via-primary/70 to-primary bg-linear-to-tr bg-clip-text text-transparent">
                {highlight}
              </span>
            </h1>
            <p className="text-muted-foreground mt-6 text-base md:text-lg">{intro}</p>
          </div>
        </div>
      </section>

      <section className="container pb-16 lg:pb-24">
        <div className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 gap-6 md:grid-cols-2">
          <article className="bg-background relative overflow-hidden rounded-2xl border p-8">
            <div className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-gradient-to-br from-emerald-400/10 to-transparent blur-3xl" />
            <div className="relative">
              <div className="flex size-12 items-center justify-center rounded-xl border border-emerald-200/70 bg-white text-emerald-500 shadow-sm dark:border-emerald-500/30">
                <Target className="size-6" aria-hidden strokeWidth={2.25} />
              </div>
              <h2 className="text-foreground mt-5 text-2xl font-bold tracking-tight">
                Our mission
              </h2>
              <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                Build the CRM that small agencies and service teams actually like using — one
                workspace that follows a customer end to end, priced fairly per workspace instead of
                per seat, and shipped weekly so the product keeps getting better with the team using
                it.
              </p>
            </div>
          </article>

          <article className="bg-background relative overflow-hidden rounded-2xl border p-8">
            <div className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-gradient-to-br from-sky-400/10 to-transparent blur-3xl" />
            <div className="relative">
              <div className="flex size-12 items-center justify-center rounded-xl border border-sky-200/70 bg-white text-sky-500 shadow-sm dark:border-sky-500/30">
                <Compass className="size-6" aria-hidden strokeWidth={2.25} />
              </div>
              <h2 className="text-foreground mt-5 text-2xl font-bold tracking-tight">Our vision</h2>
              <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                A world where running a service business doesn't require five disconnected SaaS
                tools and a per-seat tax on hiring. We see Alliances PRO becoming the default
                workspace for the next million teams that grow from solo operators to fifty-person
                agencies — without ever changing how the workspace feels.
              </p>
            </div>
          </article>
        </div>
      </section>

      <TeamSection />

      <FooterSection />
    </>
  );
}
