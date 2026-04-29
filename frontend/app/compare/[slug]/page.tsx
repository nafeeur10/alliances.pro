import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComparisonTemplate } from "@/components/marketing/comparison-template";
import {
  getComparison,
  listComparisons,
  listFaqs,
  listPricingPlans,
  listTestimonials
} from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const comparisons = await listComparisons();
  if (!comparisons) return [];
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = await getComparison(slug);
  if (!comparison) {
    return buildMetadata({
      title: "Comparison not found",
      description: "We couldn't find that comparison page.",
      path: `/compare/${slug}`,
      noIndex: true
    });
  }
  return buildMetadata({
    title: comparison.seo_title ?? `Alliances PRO vs ${comparison.competitor_name}`,
    description:
      comparison.seo_description ??
      comparison.headline ??
      `How Alliances PRO compares against ${comparison.competitor_name} on price, features, and migration.`,
    path: `/compare/${comparison.slug}`
  });
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
      variant="compare"
      comparison={comparison}
      pricingPlans={pricing ?? []}
      testimonials={testimonials ?? []}
      faqs={faqs}
    />
  );
}
