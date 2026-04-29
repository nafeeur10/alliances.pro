import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComparisonTemplate } from "@/components/marketing/comparison-template";
import { getComparison, listFaqs, listPricingPlans, listTestimonials } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

const SUPPORTED_SLUGS = new Set(["hubspot", "pipedrive"]);

export function generateStaticParams() {
  return Array.from(SUPPORTED_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!SUPPORTED_SLUGS.has(slug)) {
    return buildMetadata({
      title: "Alternative not found",
      description: "We couldn't find that alternative page.",
      path: `/alternatives/${slug}`,
      noIndex: true
    });
  }
  const comparison = await getComparison(slug);
  if (!comparison) {
    return buildMetadata({
      title: `${slug} alternative`,
      description: "Looking for a CRM alternative? Try Alliances PRO.",
      path: `/alternatives/${slug}`,
      noIndex: true
    });
  }
  return buildMetadata({
    title: `${comparison.competitor_name} alternative — Alliances PRO`,
    description:
      comparison.seo_description ??
      `Looking for a ${comparison.competitor_name} alternative? Alliances PRO is flat per workspace, never per seat — most teams cut their CRM bill 60%+.`,
    path: `/alternatives/${comparison.slug}`
  });
}

export default async function AlternativesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SUPPORTED_SLUGS.has(slug)) notFound();

  const [comparison, pricing, testimonials, faqsMap] = await Promise.all([
    getComparison(slug),
    listPricingPlans(),
    listTestimonials(),
    listFaqs()
  ]);

  if (!comparison) notFound();

  const faqs = faqsMap ? Object.values(faqsMap).flat() : [];

  return (
    <ComparisonTemplate
      variant="alternatives"
      comparison={comparison}
      pricingPlans={pricing ?? []}
      testimonials={testimonials ?? []}
      faqs={faqs}
    />
  );
}
