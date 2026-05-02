interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

export const featureList: FeaturesProps[] = [
  {
    icon: "Contact",
    title: "Contact Management",
    description:
      "Organize client contacts, track communication history, and store important details all in one centralized database."
  },
  {
    icon: "FolderKanban",
    title: "Project Tracking",
    description:
      "Manage service projects from start to finish with visual pipelines, task assignments, and progress tracking."
  },
  {
    icon: "FileText",
    title: "Invoicing & Billing",
    description:
      "Generate professional invoices, track payments, and manage billing cycles with automated reminders for overdue payments."
  },
  {
    icon: "MessagesSquare",
    title: "Client Communication Hub",
    description:
      "Centralize all client communications including emails, messages, and notes with automated follow-up reminders."
  },
  {
    icon: "Plug",
    title: "Seamless Integrations",
    description:
      "Connect with your favorite tools including email, calendars, payment processors, and accounting software."
  },
  {
    icon: "Shield",
    title: "Enterprise Security",
    description:
      "Bank-level encryption, role-based access control, and compliance with industry standards to keep your data secure."
  }
];
