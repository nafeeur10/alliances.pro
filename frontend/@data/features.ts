interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
  image: string;
  href: string;
  bgColor?: string;
  slug: string;
}

export const featuresSection = {
  eyebrow: "Features",
  headline: "Everything You Need to Succeed",
  description:
    "Our comprehensive CRM platform provides all the tools you need to manage clients, streamline operations, and grow your service business."
};

export const featureList: FeaturesProps[] = [
  {
    icon: "Contact",
    title: "Lead Management",
    description:
      "Organize each lead's tasks, track their communication history and notes, and store important files all in one centralized database.",
    image: "/features/lead-management.png",
    href: "/features/lead-management",
    bgColor: "#E6F1FB",
    slug: "lead-management"
  },
  {
    icon: "FolderKanban",
    title: "Organization-level lead management",
    description:
      "Every organization holds every lead, every deal, and every shared file — proposals, catalogues, contracts — under one record. Reach the right contact when you need to.",
    image: "/features/organization-lead-management.png",
    href: "/features/organization-leads",
    bgColor: "#E1F5EE",
    slug: "organization-leads"
  },
  {
    icon: "ListTodo",
    title: "Tasks management with overdue alerts",
    description:
      "Track every task across leads, deals, and projects in one table. Overdue items flag in red, push them into the Pipeline, and finish without leaving the page.",
    image: "/features/tasks-management.png",
    href: "/features/task-management",
    bgColor: "#FAEEDA",
    slug: "task-management"
  },
  {
    icon: "Shield",
    title: "Member roles and permissions",
    description:
      "Invite members, assign custom roles, and pick exactly what each role can do — add, edit, or delete by resource. Granular per-action control, per workspace.",
    image: "/features/roles-permissions.png",
    href: "/features/roles-and-permissions",
    bgColor: "#EEEDFE",
    slug: "roles-and-permissions"
  },
  {
    icon: "Send",
    title: "Email campaigns from your own domain",
    description:
      "Build campaigns inside the CRM and send them from your own Gmail, Outlook, or company SMTP — so leads see your domain in the From line, not a marketing relay.",
    image: "/features/email-campaigns.png",
    href: "/features/email-campaigns",
    bgColor: "#FBEAF0",
    slug: "email-campaigns"
  },
  {
    icon: "Sparkles",
    title: "AI summary and email drafts",
    description:
      "AI summarizes any lead or deal in seconds, then drafts follow-up emails based on the conversation — so you skip the reading and the typing.",
    image: "/features/ai-summary.png",
    href: "/features/ai-summary-and-drafts",
    bgColor: "#FAECE7",
    slug: "ai-summary-and-drafts"
  }
];
