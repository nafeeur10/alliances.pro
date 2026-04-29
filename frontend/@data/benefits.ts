interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

export const benefitList: BenefitsProps[] = [
  {
    icon: "Users",
    title: "Centralized Client Management",
    description:
      "Keep all client information, communication history, and project details in one unified platform for easy access and management."
  },
  {
    icon: "Workflow",
    title: "Automated Workflows",
    description:
      "Streamline repetitive tasks with intelligent automation. From follow-ups to invoicing, let Alliances PRO handle the routine work."
  },
  {
    icon: "CalendarClock",
    title: "Smart Scheduling & Appointments",
    description:
      "Effortlessly manage appointments, bookings, and service schedules with integrated calendar tools and automated reminders."
  },
  {
    icon: "ChartLine",
    title: "Performance Analytics",
    description:
      "Track business metrics, client satisfaction, revenue trends, and service performance with comprehensive real-time dashboards."
  }
];
