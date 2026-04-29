export enum ProService {
  YES = 1,
  NO = 0,
}

interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}

export const serviceList: ServiceProps[] = [
  {
    title: "Client Onboarding",
    description:
      "Streamlined onboarding workflows to get new clients set up quickly with automated welcome emails and document collection.",
    pro: 0,
  },
  {
    title: "Service Delivery Management",
    description:
      "Track service delivery milestones, manage deliverables, and ensure consistent quality across all client projects.",
    pro: 0,
  },
  {
    title: "Custom Reporting",
    description:
      "Generate detailed reports on client activity, revenue, service performance, and team productivity.",
    pro: 0,
  },
  {
    title: "Advanced Analytics & Insights",
    description:
      "AI-powered insights and predictive analytics to identify trends, optimize pricing, and forecast revenue.",
    pro: 1,
  },
  {
    title: "White Label Solutions",
    description:
      "Fully customizable branded client portals and communication tools to match your company's identity.",
    pro: 1,
  },
  {
    title: "Priority Support & Training",
    description:
      "Dedicated account manager, priority support, and personalized training sessions for your team.",
    pro: 1,
  },
];
