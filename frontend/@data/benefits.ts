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
  headline: "Why Choose Alliances PRO?",
  description:
    "Service businesses don't run on pipelines — they run on follow-ups, ongoing client relationships, and emails that can't be allowed to slip. Alliances PRO is built for that shape of work."
};

export const benefitList: BenefitItem[] = [
  {
    icon: "/icons/alarm-clock.svg",
    title: "Never miss a follow-up again",
    description:
      "Every lead gets a follow-up date and a preferred channel, and the assigned teammate is reminded by email and notification before the date, so follow-ups land on time, on the channel the lead actually replies to.",
    slug: "never-miss-follow-up"
  },
  {
    icon: "/icons/relationship.svg",
    title: "Build long-term client relationships, not just deals",
    description:
      "After Closed Won, the client stays on your follow-up radar. Set the next check-in date, track renewals, and keep every stakeholder at the organization on one record — so you stay close long after the deal closes.",
    slug: "long-term-client-relationships"
  },
  {
    icon: "/icons/idea.svg",
    title: "Skip the scroll, get the context",
    description:
      "Open any lead, deal, or client record. Read the AI summary at the top instead of scrolling through months of conversation history. The context you need is right there — so every call starts up to speed.",
    slug: "skip-the-scroll"
  },
  {
    icon: "/icons/download.svg",
    title: "No lock-in, take your data anywhere",
    description:
      "Export every lead, deal, and client to CSV anytime. Cancel inside the app — no support ticket required. Your data walks out with you the day you decide — day one or day three hundred, no questions asked.",
    slug: "take-your-data-anywhere"
  }
];
