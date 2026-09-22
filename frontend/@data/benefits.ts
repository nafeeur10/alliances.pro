// Single source of truth for the homepage Benefits section.
// Edit the section header here, plus the four benefit cards below.

interface BenefitItem {
  icon: string; // path to colored SVG under /public, e.g. "/icons/calendar.svg"
  title: string;
  description: string;
  slug: string; // detail page lives at /benefits/<slug>
}

export const benefitsSection = {
  eyebrow: "Benefits",
  headline: "Why Shopify App Developers & Small Businesses Choose Alliances PRO?",
  description:
    "Service businesses don't run on pipelines — they run on follow-ups, ongoing client relationships, and emails that can't be allowed to slip. Alliances PRO is built for that shape of work."
};

export const benefitList: BenefitItem[] = [
  {
    icon: "/icons/alarm-clock.svg",
    title: "Never miss a follow-up again",
    description:
      "Every lead and client gets a follow-up date and a preferred channel. The assigned teammate is reminded by email and notification before it's due — and after Closed Won, renewals and check-ins stay on the same schedule.",
    slug: "never-miss-follow-up"
  },
  {
    icon: "/icons/relationship.svg",
    title: "Every Shopify app install becomes a merchant",
    description:
      "Connect your Shopify Partner account once. Each install lands in Companies as a merchant, each uninstall is flagged, and the store goes onto your follow-up list — so you reach churned merchants while the reason is still fresh.",
    slug: "long-term-client-relationships"
  },
  {
    icon: "/icons/idea.svg",
    title: "AI summaries on every lead, deal and client",
    description:
      "Open any record and read the AI summary at the top instead of scrolling through months of conversation history. The context you need is right there — so every call starts up to speed.",
    slug: "skip-the-scroll"
  },
  {
    icon: "/icons/download.svg",
    title: "No lock-in — export everything to CSV",
    description:
      "Export every lead, deal, and client to CSV anytime. Cancel inside the app — no support ticket required. Your data walks out with you the day you decide, no questions asked.",
    slug: "take-your-data-anywhere"
  }
];
