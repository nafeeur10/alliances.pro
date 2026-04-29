import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionShell } from "@/components/marketing/section-shell";
import { RelatedLinks } from "@/components/marketing/related-links";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getComparison,
  getIndustry,
  listFaqs,
  listFeatures,
  listIndustries,
  listPricingPlans,
  listTestimonials
} from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { FAQPageSchema } from "@/components/seo/json-ld";

export const revalidate = 60;

const PERSONAS_BY_SLUG: Record<string, readonly string[]> = {
  "shopify-agencies": [
    "Shopify Plus agency owners",
    "Heads of growth at app-developer shops",
    "Fractional CMOs running e-commerce service teams",
    "Account executives juggling 10+ Shopify clients"
  ],
  "sales-teams": [
    "VPs of Sales at 10–50 person SMBs",
    "Sales operations leads",
    "Account executives outgrowing Pipedrive Essential",
    "Founders running their own pipeline"
  ],
  freelancers: [
    "Solo consultants and fractional execs",
    "Independent designers and developers",
    "1–3 person agencies starting out",
    "Productized service operators"
  ],
  education: [
    "Admissions teams",
    "Program coordinators",
    "Bootcamps and continuing-ed academies",
    "Non-profit education organizations"
  ]
};

const COMPARE_HINT_BY_SLUG: Record<string, string> = {
  "shopify-agencies": "hubspot",
  "sales-teams": "pipedrive",
  freelancers: "hubspot",
  education: "salesforce"
};

const ICP_HEADLINES: Record<string, string> = {
  "shopify-agencies": "Built for the way Shopify agencies actually run.",
  "sales-teams": "The CRM your sales team would design for itself.",
  freelancers: "$19/mo flat. Same tool when you hire your first three teammates.",
  education: "Programs, applicants, enrollments — coming to Alliances PRO."
};

export async function generateStaticParams() {
  const industries = await listIndustries();
  if (!industries) return [];
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) {
    return buildMetadata({
      title: "Industry not found",
      description: "We couldn't find that industry page.",
      path: `/industries/${slug}`,
      noIndex: true
    });
  }
  return buildMetadata({
    title: industry.seo_title ?? `${industry.name} — Alliances PRO`,
    description:
      industry.seo_description ??
      industry.subheadline ??
      "A CRM tuned to your business — not the average of all businesses.",
    path: `/industries/${industry.slug}`
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [industry, features, pricing, testimonials, faqsMap, compareSlug] = await Promise.all([
    getIndustry(slug),
    listFeatures(),
    listPricingPlans(),
    listTestimonials(),
    listFaqs(),
    Promise.resolve(COMPARE_HINT_BY_SLUG[slug])
  ]);

  if (!industry) notFound();

  const compareTarget = compareSlug ? await getComparison(compareSlug) : null;
  const personas = PERSONAS_BY_SLUG[slug] ?? [];
  const tagline = ICP_HEADLINES[slug] ?? industry.headline ?? "";
  const isWaitlistVariant = slug === "education";
  const featuredFeatures = (features ?? []).slice(0, 6);
  const filteredTestimonial = (testimonials ?? []).find((t) => t.industry_tag === slug) ?? null;
  const proPlan = (pricing ?? []).find((p) => !p.is_featured) ?? (pricing ?? [])[0] ?? null;
  const allFaqs = faqsMap ? Object.values(faqsMap).flat() : [];

  return (
    <main className="min-h-screen">
      <SectionShell as="section" className="pt-32 pb-12">
        <div className="mx-auto mb-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: "Industries", url: "/industries" },
              { name: industry.name, url: `/industries/${industry.slug}` }
            ]}
          />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 tracking-wider uppercase">
            For {industry.name}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {industry.headline ?? tagline}
          </h1>
          {industry.subheadline && (
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg sm:text-xl">
              {industry.subheadline}
            </p>
          )}
          {!isWaitlistVariant && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="https://app.alliances.pro/signup">Start 14-day free trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
          )}
        </div>
      </SectionShell>

      {personas.length > 0 && (
        <SectionShell heading="Who this is for" eyebrow="Built for the workflow you already run">
          <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
            {personas.map((persona) => (
              <li
                key={persona}
                className="border-border bg-card flex items-start gap-3 rounded-lg border p-4"
              >
                <Check className="text-primary mt-0.5 size-5 shrink-0" aria-hidden />
                <span>{persona}</span>
              </li>
            ))}
          </ul>
        </SectionShell>
      )}

      {featuredFeatures.length > 0 && (
        <SectionShell
          eyebrow="Everything in one workspace"
          heading="Vertical-aware data, not generic CRM dressed up with tags."
          subheading={industry.body ?? undefined}
        >
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredFeatures.map((feature) => (
              <Card key={feature.id} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.tagline}</p>
                  <Link
                    href={`/features/${feature.slug}`}
                    className="text-primary mt-3 inline-flex items-center gap-1 text-sm font-medium"
                  >
                    Learn more <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionShell>
      )}

      {compareTarget && !isWaitlistVariant && (
        <SectionShell
          eyebrow={`Why ${industry.name} pick Alliances PRO`}
          heading={`Alliances PRO vs ${compareTarget.competitor_name}`}
          subheading={compareTarget.headline ?? undefined}
        >
          <div className="mx-auto max-w-3xl text-center">
            {compareTarget.winner_summary && (
              <p className="text-muted-foreground mb-6">{compareTarget.winner_summary}</p>
            )}
            <Button asChild size="lg" variant="outline">
              <Link href={`/compare/${compareTarget.slug}`}>
                See the full comparison <ArrowRight className="ml-2 size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </SectionShell>
      )}

      {filteredTestimonial && (
        <SectionShell heading="Operators in your space ship faster on it.">
          <figure className="border-border bg-card mx-auto max-w-3xl rounded-xl border p-8 text-center">
            <blockquote className="text-foreground text-xl leading-relaxed">
              &ldquo;{filteredTestimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="text-muted-foreground mt-4 text-sm">
              — {filteredTestimonial.author.name}
              {filteredTestimonial.author.role ? `, ${filteredTestimonial.author.role}` : ""}
              {filteredTestimonial.author.company
                ? ` at ${filteredTestimonial.author.company}`
                : ""}
            </figcaption>
          </figure>
        </SectionShell>
      )}

      {!isWaitlistVariant && proPlan && (
        <SectionShell heading="Honest pricing — flat per workspace." eyebrow="Pricing teaser">
          <Card className="border-primary/30 mx-auto max-w-md">
            <CardHeader>
              <CardTitle>{proPlan.name}</CardTitle>
              <p className="text-muted-foreground mt-1 text-sm">{proPlan.description}</p>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ${(proPlan.monthly_price_cents / 100).toFixed(0)}
                <span className="text-muted-foreground text-base font-normal">/mo</span>
              </p>
              {proPlan.comparison_note && (
                <p className="text-muted-foreground mt-2 text-sm">{proPlan.comparison_note}</p>
              )}
              <Button asChild className="mt-4 w-full">
                <Link href={proPlan.external_signup_url ?? proPlan.cta_url ?? "/pricing"}>
                  {proPlan.cta_label}
                </Link>
              </Button>
              <Button asChild variant="link" className="text-muted-foreground mt-2 w-full">
                <Link href="/pricing">See full pricing →</Link>
              </Button>
            </CardContent>
          </Card>
        </SectionShell>
      )}

      {isWaitlistVariant && (
        <SectionShell
          eyebrow="Coming soon"
          heading={`Join the ${industry.name} waitlist`}
          subheading="We&rsquo;ll email you the moment private beta opens. Beta access is free for waitlisted accounts."
        >
          <WaitlistForm waitlistFor="education_crm" />
        </SectionShell>
      )}

      {!isWaitlistVariant && (
        <SectionShell heading={`Start free, ${industry.name.toLowerCase()}-ready in 10 minutes.`}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="https://app.alliances.pro/signup">Start your trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Talk to a human</Link>
            </Button>
          </div>
        </SectionShell>
      )}

      {allFaqs.length > 0 && (
        <SectionShell heading="Real questions, real answers." className="pb-32">
          <div className="mx-auto max-w-3xl space-y-3">
            {allFaqs.slice(0, 6).map((faq) => (
              <details key={faq.id} className="border-border bg-card group rounded-lg border p-5">
                <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                <p className="text-muted-foreground mt-3 text-sm">{faq.answer}</p>
              </details>
            ))}
          </div>
        </SectionShell>
      )}

      <RelatedLinks
        heading="Keep exploring"
        links={(() => {
          const links: import("@/components/marketing/related-links").RelatedLink[] = [
            ...featuredFeatures.slice(0, 3).map((f) => ({
              label: f.name,
              href: `/features/${f.slug}`,
              description: f.tagline ?? undefined
            })),
            {
              label: "All industries",
              href: "/industries",
              description: "Other verticals we serve"
            }
          ];
          if (compareTarget) {
            links.splice(3, 0, {
              label: `vs ${compareTarget.competitor_name}`,
              href: `/compare/${compareTarget.slug}`,
              description: compareTarget.headline ?? undefined
            });
          }
          return links;
        })()}
      />

      <FAQPageSchema
        items={allFaqs.slice(0, 8).map(({ question, answer }) => ({ question, answer }))}
      />
    </main>
  );
}
