import { Badge } from "@/components/ui/badge";
import SectionContainer from "@/components/layout/section-container";
import { PricingBlob } from "@/components/marketing/pricing-blob";
import { PricingCards, type PricingPlanItem } from "@/components/marketing/pricing-cards";
import { listPricingPlans } from "@/lib/api";
import { getHomeSections, pickString, readPayload } from "@/lib/cms";

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

export const PricingSection = async () => {
  const [apiPlans, { sections }] = await Promise.all([listPricingPlans(), getHomeSections()]);
  const header = readPayload<Record<string, unknown>>(sections, "pricing");

  const plans: PricingPlanItem[] =
    apiPlans && apiPlans.length > 0
      ? apiPlans.map((p) => ({
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

  const eyebrow = pickString(header, "eyebrow", "Pricing");
  const headline = pickString(header, "headline", "Simple pricing that scales with your pipeline.");
  const sub = pickString(
    header,
    "sub",
    "Start with a 14-day free trial — no credit card required. Switch or cancel anytime."
  );
  const { lead, highlight } = splitHeadline(headline);

  return (
    <SectionContainer id="pricing">
      <div className="relative isolate">
        <PricingBlob />

        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-16">
          <Badge
            variant="outline"
            className="bg-background/60 mb-5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase backdrop-blur"
          >
            <span className="bg-primary mr-2 inline-block size-1.5 rounded-full" />
            {eyebrow}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            {lead ? <span>{lead} </span> : null}
            <span className="from-primary via-primary/70 to-primary bg-linear-to-tr bg-clip-text text-transparent">
              {highlight}
            </span>
          </h2>
          <p className="text-muted-foreground mt-5 text-base md:text-lg">{sub}</p>
        </div>

        <PricingCards plans={plans} showCompareLink compareLabel="Compare full plans" />
      </div>
    </SectionContainer>
  );
};
