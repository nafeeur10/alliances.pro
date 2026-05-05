// Single source of truth for the /help (FAQ) page.
// Hand-edit the questions and answers here.

export interface HelpFaqItem {
  question: string;
  answer: string;
}

export const helpFaqs: HelpFaqItem[] = [
  {
    question: "What is Alliances PRO?",
    answer:
      "Alliances PRO is a flat-rate CRM built for small agencies, consultancies, and service teams. We replace per-seat-priced tools with one fair price — $19/mo for up to 10 users, or $39/mo for unlimited users."
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes — a 14-day free trial on either plan. No credit card required. Cancel anytime during the trial and you won't be charged."
  },
  {
    question: "What's included in the $39/mo Business plan?",
    answer:
      "Unlimited users, unlimited leads, unlimited projects, email automation, automated follow-up sequences, AI summaries, and priority support including WhatsApp. Everything in Pro plus the no-cap usage."
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes — upgrade or downgrade any time from the workspace billing page. Upgrades are prorated; downgrades take effect at the next billing cycle."
  },
  {
    question: "How do I import my existing contacts?",
    answer:
      "Import from CSV, Google Contacts, HubSpot, Pipedrive, or Salesforce. The first import maps fields automatically; you can adjust before committing. There's no row limit on imports."
  },
  {
    question: "Does Alliances PRO integrate with Gmail?",
    answer:
      "Yes — two-way Gmail sync. Outbound emails sent from inside the workspace appear in your Gmail Sent folder; inbound replies thread back into the lead's timeline. Labels and stars are exposed."
  },
  {
    question: "Where is my data stored?",
    answer:
      "On encrypted-at-rest Postgres in our primary region. Daily backups retained 30 days. Workspace owners can export everything as CSV at any time."
  },
  {
    question: "How does support work?",
    answer:
      "Pro plan: email support, 24-hour weekday response. Business plan: priority email + WhatsApp support, 12-hour response. Both plans include the help center and changelog."
  },
  {
    question: "Can I cancel any time?",
    answer:
      "Yes. Cancel from the billing page. You keep access until the end of the current billing period; no early-cancellation fees."
  },
  {
    question: "Do you offer education or non-profit discounts?",
    answer:
      "Yes — 30% off the Business plan for accredited schools, universities, and registered non-profits. Email sales@alliances.pro with verification."
  }
];
