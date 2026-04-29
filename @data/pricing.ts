export enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

export const plans: PlanProps[] = [
  {
    title: "Starter",
    popular: 0,
    price: 0,
    description:
      "Perfect for freelancers and solo service providers getting started with client management.",
    buttonText: "Start Free Trial",
    benefitList: [
      "Up to 50 clients",
      "Basic contact management",
      "Project tracking",
      "Email support",
      "Mobile app access",
    ],
  },
  {
    title: "Professional",
    popular: 1,
    price: 79,
    description:
      "Ideal for growing service businesses ready to scale operations and automate workflows.",
    buttonText: "Get Started",
    benefitList: [
      "Unlimited clients",
      "Advanced automation",
      "Invoicing & billing",
      "Custom reporting",
      "Priority support",
      "API access",
    ],
  },
  {
    title: "Enterprise",
    popular: 0,
    price: 199,
    description:
      "For established agencies and teams needing advanced features and dedicated support.",
    buttonText: "Contact Sales",
    benefitList: [
      "Everything in Professional",
      "White label solutions",
      "Advanced analytics & AI insights",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
  },
];
