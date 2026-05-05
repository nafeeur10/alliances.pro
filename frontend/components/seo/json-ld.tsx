import { absoluteUrl, SITE_NAME, SITE_URL, SOCIAL } from "@/lib/seo";

/**
 * Renders a single JSON-LD <script> block. Server-side only — pass plain
 * objects with no client refs.
 */
export function JsonLd<T extends Record<string, unknown>>({ data }: { data: T }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify produces safe output here — keys/values are plain JSON.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl("/og/logo.png"),
        sameAs: [SOCIAL.twitterUrl, SOCIAL.linkedinUrl, SOCIAL.githubUrl, SOCIAL.youtubeUrl],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "sales@alliances.pro",
            availableLanguage: ["en"]
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "support@alliances.pro",
            availableLanguage: ["en"]
          }
        ]
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": absoluteUrl("/#organization") },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbListSchema({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: item.name,
          item: absoluteUrl(item.url)
        }))
      }}
    />
  );
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function FAQPageSchema({ items }: { items: readonly FaqItem[] }) {
  if (items.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }}
    />
  );
}

export interface ProductOfferInput {
  name: string;
  url: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
}

export function ProductSchema({
  name,
  description,
  offers,
  aggregateRating
}: {
  name: string;
  description: string;
  offers: readonly ProductOfferInput[];
  aggregateRating?: { ratingValue: number; reviewCount: number };
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        brand: { "@type": "Brand", name: SITE_NAME },
        offers: offers.map((offer) => ({
          "@type": "Offer",
          name: offer.name,
          url: absoluteUrl(offer.url),
          price: (offer.priceMonthly / 100).toFixed(2),
          priceCurrency: offer.currency,
          priceSpecification: [
            {
              "@type": "UnitPriceSpecification",
              price: (offer.priceMonthly / 100).toFixed(2),
              priceCurrency: offer.currency,
              billingDuration: "P1M",
              unitText: "month"
            },
            {
              "@type": "UnitPriceSpecification",
              price: (offer.priceYearly / 100).toFixed(2),
              priceCurrency: offer.currency,
              billingDuration: "P1Y",
              unitText: "year"
            }
          ],
          availability: "https://schema.org/InStock"
        })),
        ...(aggregateRating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: aggregateRating.ratingValue,
                reviewCount: aggregateRating.reviewCount
              }
            }
          : {})
      }}
    />
  );
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  url: string;
  image: string;
  authorName: string;
  datePublished: string;
  dateModified?: string;
  /** Optional reading time in minutes. Emitted as ISO 8601 duration. */
  readingMinutes?: number;
  /** Optional word count. */
  wordCount?: number;
}

export function ArticleSchema(input: ArticleSchemaInput) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: input.headline,
        description: input.description,
        image: absoluteUrl(input.image),
        mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(input.url) },
        author: { "@type": "Person", name: input.authorName },
        publisher: { "@id": absoluteUrl("/#organization") },
        datePublished: input.datePublished,
        dateModified: input.dateModified ?? input.datePublished,
        ...(input.readingMinutes && input.readingMinutes > 0
          ? { timeRequired: `PT${Math.round(input.readingMinutes)}M` }
          : {}),
        ...(input.wordCount && input.wordCount > 0 ? { wordCount: input.wordCount } : {})
      }}
    />
  );
}
