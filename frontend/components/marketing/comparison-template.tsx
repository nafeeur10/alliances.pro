import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionShell } from "@/components/marketing/section-shell";
import { ComparisonViewTracker } from "@/components/marketing/comparison-view-tracker";
import { RelatedLinks } from "@/components/marketing/related-links";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FAQPageSchema } from "@/components/seo/json-ld";
import type { Comparison, Faq, PricingPlan, Testimonial } from "@/lib/api";

interface ComparisonTemplateProps {
  /** "compare" or "alternatives" — affects breadcrumb + hero copy. */
  variant: "compare" | "alternatives";
  comparison: Comparison;
  pricingPlans: readonly PricingPlan[];
  testimonials: readonly Testimonial[];
  faqs: readonly Faq[];
}

const NEUTRAL_VALUES = new Set(["—", "-", "n/a", "no", "false"]);

function CellMark({ value }: { value: string }) {
  const v = value.trim().toLowerCase();
  if (NEUTRAL_VALUES.has(v)) {
    return <Minus className="text-muted-foreground/60 mx-auto size-4" aria-hidden />;
  }
  if (v === "yes" || v === "true" || v === "✓") {
    return <Check className="text-primary mx-auto size-4" aria-hidden />;
  }
  return <span>{value}</span>;
}

export function ComparisonTemplate({
  variant,
  comparison,
  pricingPlans,
  testimonials,
  faqs
}: ComparisonTemplateProps) {
  const competitor = comparison.competitor_name;
  const baseHref = variant === "compare" ? "/compare" : "/alternatives";
  const heroHeadline =
    variant === "alternatives"
      ? `Looking for a ${competitor} alternative?`
      : `Alliances PRO vs ${competitor}`;
  const heroSub =
    variant === "alternatives"
      ? `Same workflow, honest pricing, no per-seat math. Here's how teams who switched off ${competitor} land on Alliances PRO.`
      : (comparison.headline ??
        `One CRM, every vertical. Flat pricing. See how Alliances PRO stacks up against ${competitor}.`);

  const tldr =
    comparison.winner_summary ??
    `Pick Alliances PRO when you want flat per-workspace pricing (never per seat), built-in email + call logs, and a multi-vertical platform. Pick ${competitor} if its specific workflow integrations are mission-critical to you.`;

  const featured = pricingPlans.find((p) => p.is_featured) ?? pricingPlans[0];
  const switchersTestimonial =
    testimonials.find((t) =>
      [t.author.company ?? "", t.industry_tag ?? "", t.quote].some((s) =>
        s.toLowerCase().includes("switch")
      )
    ) ??
    testimonials[0] ??
    null;

  return (
    <main className="min-h-screen">
      <SectionShell as="section" className="pt-32 pb-12">
        <div className="mx-auto mb-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: variant === "compare" ? "Compare" : "Alternatives", url: baseHref },
              { name: competitor, url: `${baseHref}/${comparison.slug}` }
            ]}
          />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 tracking-wider uppercase">
            {variant === "compare" ? `vs ${competitor}` : `${competitor} alternative`}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {heroHeadline}
          </h1>
          <p className="text-muted-foreground mt-6 text-lg sm:text-xl">{heroSub}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="https://app.alliances.pro/signup">Start 14-day free trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </SectionShell>

      <SectionShell eyebrow="The TL;DR" heading="When to pick which.">
        <div className="border-primary/30 bg-card mx-auto max-w-3xl rounded-xl border-2 p-8">
          <p className="text-lg leading-relaxed">{tldr}</p>
          {comparison.body && (
            <p className="text-muted-foreground mt-4 leading-relaxed">{comparison.body}</p>
          )}
        </div>
      </SectionShell>

      {comparison.comparison_table.length > 0 && (
        <SectionShell heading={`Feature-by-feature: Alliances PRO vs ${competitor}`}>
          <div className="border-border mx-auto max-w-5xl overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold">Feature</th>
                  <th className="px-4 py-3 text-center font-semibold">Alliances PRO</th>
                  <th className="px-4 py-3 text-center font-semibold">{competitor}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.comparison_table.map((row, idx) => (
                  <tr
                    key={`${row.feature}-${idx}`}
                    className="border-border/50 [&:not(:last-child)]:border-b"
                  >
                    <td className="px-4 py-3 font-medium">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      <CellMark value={row.alliances_value} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CellMark value={row.competitor_value} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionShell>
      )}

      {pricingPlans.length > 0 && (
        <SectionShell
          heading="Pricing comparison"
          subheading={`Alliances PRO is flat per workspace. ${competitor} usually charges per seat — costs scale with team size.`}
        >
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {pricingPlans.slice(0, 2).map((plan) => (
              <Card key={plan.id} className={plan.is_featured ? "border-primary/40 border-2" : ""}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-3xl font-bold">
                    ${(plan.monthly_price_cents / 100).toFixed(0)}
                    <span className="text-muted-foreground text-base font-normal">/mo</span>
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  {plan.comparison_note && (
                    <p className="text-muted-foreground mb-3 text-xs italic">
                      {plan.comparison_note}
                    </p>
                  )}
                  <Button asChild className="w-full">
                    <Link href={plan.external_signup_url ?? plan.cta_url ?? "/pricing"}>
                      {plan.cta_label}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionShell>
      )}

      {switchersTestimonial && (
        <SectionShell heading="Customers who switched.">
          <figure className="border-border bg-card mx-auto max-w-3xl rounded-xl border p-8 text-center">
            <blockquote className="text-foreground text-xl leading-relaxed">
              &ldquo;{switchersTestimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="text-muted-foreground mt-4 text-sm">
              — {switchersTestimonial.author.name}
              {switchersTestimonial.author.role ? `, ${switchersTestimonial.author.role}` : ""}
              {switchersTestimonial.author.company
                ? ` at ${switchersTestimonial.author.company}`
                : ""}
            </figcaption>
          </figure>
        </SectionShell>
      )}

      <SectionShell heading="Free migration on Pro and Business plans.">
        <div className="border-primary/30 bg-card mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-xl border p-8 text-center">
          <p className="text-lg">
            Bringing data from {competitor}? Our team handles CSV imports, custom-field mapping, and
            pipeline rebuilds — at no cost on Business, $199 one-time on Pro.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="https://app.alliances.pro/signup">Start free trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Book a migration call</Link>
            </Button>
          </div>
        </div>
      </SectionShell>

      {faqs.length > 0 && (
        <SectionShell heading="Real questions, real answers." className="pb-32">
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.slice(0, 6).map((faq) => (
              <details key={faq.id} className="border-border bg-card group rounded-lg border p-5">
                <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                <p className="text-muted-foreground mt-3 text-sm">{faq.answer}</p>
              </details>
            ))}
          </div>
        </SectionShell>
      )}

      <RelatedLinks
        heading="Other comparisons + alternatives"
        links={[
          { label: "All comparisons", href: "/compare" },
          {
            label: featured ? `${featured.name} pricing` : "Pricing",
            href: "/pricing",
            description: featured?.comparison_note ?? undefined
          },
          { label: "Industries we serve", href: "/industries" }
        ]}
      />

      <FAQPageSchema
        items={faqs.slice(0, 6).map(({ question, answer }) => ({ question, answer }))}
      />
      <ComparisonViewTracker competitor={comparison.slug} variant={variant} />
    </main>
  );
}
