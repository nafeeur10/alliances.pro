interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

export const FAQList: FAQProps[] = [
  {
    question: "What types of service businesses is Alliances PRO best suited for?",
    answer:
      "Alliances PRO is perfect for any service-based business including consultants, agencies, freelancers, coaches, contractors, and professional service providers who need to manage client relationships and projects.",
    value: "item-1",
  },
  {
    question: "Can I import my existing client data?",
    answer:
      "Yes! You can easily import client data from CSV files, spreadsheets, or directly from other CRM platforms. Our team can also assist with data migration for Enterprise plans.",
    value: "item-2",
  },
  {
    question: "Does Alliances PRO integrate with my existing tools?",
    answer:
      "Absolutely! We integrate with popular tools including Gmail, Outlook, Google Calendar, QuickBooks, Stripe, Zoom, and many more. Check our integrations page for the full list.",
    value: "item-3",
  },
  {
    question: "How secure is my client data?",
    answer:
      "Security is our top priority. We use bank-level encryption, regular security audits, SOC 2 compliance, and offer role-based access controls to ensure your data is always protected.",
    value: "item-4",
  },
  {
    question: "Can I customize workflows for my specific business needs?",
    answer:
      "Yes! Alliances PRO offers customizable workflows, automated triggers, and flexible pipelines that you can tailor to match your unique service delivery process.",
    value: "item-5",
  },
  {
    question: "What happens if I need to upgrade or downgrade my plan?",
    answer:
      "You can change your plan at any time. Upgrades take effect immediately, and downgrades will apply at the start of your next billing cycle. Your data remains safe during transitions.",
    value: "item-6",
  },
];
