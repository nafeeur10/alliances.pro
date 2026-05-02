import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { FooterSection } from "@/components/layout/sections/footer";
import { PricingBlob } from "@/components/marketing/pricing-blob";
import { PricingCards, type PricingPlanItem } from "@/components/marketing/pricing-cards";
import {
  PricingCompare,
  type ComparePlan,
  type CompareExtraRow
} from "@/components/marketing/pricing-compare";
import { listFaqs, listPricingPlans, type Faq, type PricingPlan } from "@/lib/api";
import { getHomeSections, pickArray, pickString, readPayload } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — simple plans that scale with your pipeline",
  description:
    "Compare Pro and Business plans side by side. Flat per-workspace pricing, 14-day free trial, no credit card required.",
  path: "/pricing",
  type: "website"
});

const FALLBACK_PLANS: PricingPlanItem[] = [
  {
    name: "Pro",
    description: "For solo operators and small teams getting organized.",
    monthly: 19,
    yearly: 190,
    currency: "USD",
    features: [
      "Track up to 1,000 leads",
      "10 projects, 500 organizations",
      "Up to 10 team members",
      "Contacts & call logs included",
      "Email support",
      "14-day free trial"
    ],
    cta: "Start Pro trial",
    ctaUrl: "https://app.alliances.pro/signup?plan=pro"
  },
  {
    name: "Business",
    description: "For growing teams that need automation and unlimited scale.",
    monthly: 39,
    yearly: 390,
    currency: "USD",
    features: [
      "Unlimited leads, deals, orgs",
      "Unlimited projects & members",
      "Email automation",
      "Automated follow-up sequences",
      "Priority support (12h) + WhatsApp",
      "Everything in Pro"
    ],
    cta: "Start Business trial",
    ctaUrl: "https://app.alliances.pro/signup?plan=business",
    popular: true
  }
];

const FALLBACK_EXTRA_ROWS: CompareExtraRow[] = [
  { feature: "Contacts & Call Logs", values: { Pro: true, Business: true } },
  { feature: "Email automation", values: { Pro: false, Business: true } },
  { feature: "Follow-up automation", values: { Pro: false, Business: true } },
  {
    feature: "Support",
    values: { Pro: "Email", Business: "Priority (12h) + WhatsApp" }
  },
  { feature: "Free trial", values: { Pro: "14 days", Business: "14 days" } }
];

const FALLBACK_FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Can I switch plans later?",
    a: "Yes — upgrade or downgrade anytime. We'll prorate the difference."
  },
  {
    q: "What happens after the trial?",
    a: "No auto-charge. You'll be prompted to add a card before your trial ends."
  },
  {
    q: "Do you offer refunds?",
    a: "Cancel within 30 days of your first paid month for a full refund — no questions."
  },
  {
    q: "Need more than Business?",
    a: "Talk to us about Enterprise — SSO, custom limits, dedicated support."
  }
];

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

function format(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function currencySymbol(code: string): string {
  if (!code) return "$";
  const map: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", BDT: "৳" };
  return map[code.toUpperCase()] ?? `${code} `;
}

function parseCellValue(raw: unknown): boolean | string {
  if (typeof raw === "boolean") return raw;
  if (raw === null || raw === undefined) return false;
  const s = String(raw).trim();
  if (!s) return false;
  const low = s.toLowerCase();
  if (["yes", "true", "✓", "y"].includes(low)) return true;
  if (["no", "false", "—", "-", "n"].includes(low)) return false;
  return s;
}

function normaliseCompareRow(row: unknown): CompareExtraRow | null {
  if (!row || typeof row !== "object") return null;
  const r = row as Record<string, unknown>;
  const feature = typeof r.feature === "string" ? r.feature : null;
  if (!feature) return null;

  const values: Record<string, boolean | string> = {};
  const raw = r.values;
  if (Array.isArray(raw)) {
    // Filament repeater shape: [{ plan, value }]
    for (const item of raw) {
      if (item && typeof item === "object") {
        const e = item as Record<string, unknown>;
        const plan = typeof e.plan === "string" ? e.plan.trim() : null;
        if (plan) values[plan] = parseCellValue(e.value);
      }
    }
  } else if (raw && typeof raw === "object") {
    // Object map shape: { Pro: true, Business: "..." }
    for (const [plan, value] of Object.entries(raw as Record<string, unknown>)) {
      values[plan] = parseCellValue(value);
    }
  }

  return { feature, values };
}

function planToCompare(p: PricingPlanItem): ComparePlan {
  const monthlyEquivalent = p.yearly > 0 ? p.yearly / 12 : p.monthly;
  return {
    name: p.name,
    limits: {},
    priceLabel: `${currencySymbol(p.currency)}${format(monthlyEquivalent)}`,
    priceSub: "/mo"
  };
}

function pickPricingFaqs(grouped: Record<string, Faq[]> | null) {
  if (!grouped) return null;
  const pricing = grouped["Pricing"];
  if (pricing && pricing.length > 0) return pricing;
  // Fall back to flat list across all categories — first 6
  const flat = Object.values(grouped).flat();
  return flat.length > 0 ? flat.slice(0, 6) : null;
}

export default async function PricingPage() {
  const [apiPlans, faqsGrouped, { sections }] = await Promise.all([
    listPricingPlans(),
    listFaqs(),
    getHomeSections()
  ]);
  const header = readPayload<Record<string, unknown>>(sections, "pricing");

  const plans: PricingPlanItem[] =
    apiPlans && apiPlans.length > 0
      ? apiPlans.map((p: PricingPlan) => ({
          name: p.name,
          description: p.description ?? "",
          monthly: Math.round((p.monthly_price_cents ?? 0) / 100),
          yearly: Math.round((p.yearly_price_cents ?? 0) / 100),
          currency: p.currency || "USD",
          features: p.features ?? [],
          cta: p.cta_label || "Start Free Trial",
          ctaUrl: p.cta_url ?? p.external_signup_url ?? "#",
          popular: p.is_featured
        }))
      : FALLBACK_PLANS;

  // Build comparison view using each plan's `limits` JSON (from API), then
  // append admin-controlled extra rows from the page-section payload.
  const comparePlans: ComparePlan[] = plans.map((p) => {
    const apiPlan = (apiPlans ?? []).find((a) => a.name === p.name);
    return {
      ...planToCompare(p),
      limits: (apiPlan?.limits ?? {}) as Record<string, unknown>
    };
  });
  const rawExtraRows = pickArray<unknown>(header, "compare_rows", []);
  const extraRows: CompareExtraRow[] =
    rawExtraRows.length > 0
      ? rawExtraRows.map(normaliseCompareRow).filter((r): r is CompareExtraRow => r !== null)
      : FALLBACK_EXTRA_ROWS;

  // Pricing FAQs
  const pricingFaqs = pickPricingFaqs(faqsGrouped);
  const faqItems = pricingFaqs
    ? pricingFaqs.map((f) => ({ q: f.question, a: f.answer }))
    : FALLBACK_FAQS;

  // Header copy
  const eyebrow = pickString(header, "eyebrow", "Pricing");
  const headline = pickString(header, "headline", "Simple pricing that scales with your pipeline.");
  const sub = pickString(
    header,
    "sub",
    "Start with a 14-day free trial — no credit card required. Switch or cancel anytime."
  );
  const { lead, highlight } = splitHeadline(headline);

  const compareEyebrow = pickString(header, "compare_eyebrow", "Compare plans");
  const compareTitle = pickString(header, "compare_title", "All the details, side by side.");
  const faqEyebrow = pickString(header, "faq_eyebrow", "FAQ");
  const faqTitle = pickString(header, "faq_title", "Questions, answered.");

  return (
    <>
      <section className="relative isolate container pt-16 pb-12 lg:pt-28 lg:pb-20">
        <PricingBlob />
        <div className="relative">
          <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-16">
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
            <p className="text-muted-foreground mt-5 text-base md:text-lg">{sub}</p>
          </div>

          <PricingCards plans={plans} />
        </div>
      </section>

      <PricingCompare
        plans={comparePlans}
        extraRows={extraRows}
        eyebrow={compareEyebrow}
        title={compareTitle}
      />

      <section className="container py-16 lg:py-24">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-primary text-sm font-medium tracking-wider uppercase">{faqEyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{faqTitle}</h2>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="AccordionRoot">
            {faqItems.map(({ q, a }, i) => (
              <AccordionItem key={`pf-${i}`} value={`pf-${i}`}>
                <AccordionTrigger className="text-left text-lg">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
