interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
  image: string;
  href: string;
  bgColor?: string;
  slug: string;
  bullets: string[];
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
    title: "Lead Follow-up",
    description:
      "Organize each lead's tasks, track their communication history and notes, and store important files all in one centralized database.",
    image: "/features/lead-follow-up.png",
    href: "/features/lead-management",
    bgColor: "#E6F1FB",
    slug: "lead-management",
    bullets: ["Focused follow-up section", "Mentioned media of communication"]
  },
  {
    icon: "FolderKanban",
    title: "Organization-level lead management",
    description:
      "Every organization holds every lead, every deal, and every shared file — proposals, catalogues, contracts — under one record. Reach the right contact when you need to.",
    image: "/features/organizaition.jpg",
    href: "/features/organization-leads",
    bgColor: "#E1F5EE",
    slug: "organization-leads",
    bullets: ["Unified contact records", "Shared files & deals"]
  },
  {
    icon: "ListTodo",
    title: "Tasks management with overdue alerts",
    description:
      "Track every task across leads, deals, and projects in one table. Overdue items flag in red, push them into the Pipeline, and finish without leaving the page.",
    image: "/features/task.jpg",
    href: "/features/task-management",
    bgColor: "#FAEEDA",
    slug: "task-management",
    bullets: ["Overdue alerts", "Pipeline-ready tasks"]
  },
  {
    icon: "Shield",
    title: "Member roles and permissions",
    description:
      "Invite members, assign custom roles, and pick exactly what each role can do — add, edit, or delete by resource. Granular per-action control, per workspace.",
    image: "/features/roles.jpg",
    href: "/features/roles-and-permissions",
    bgColor: "#EEEDFE",
    slug: "roles-and-permissions",
    bullets: ["Custom role builder", "Per-action control"]
  },
  {
    icon: "Send",
    title: "Email campaigns from your own domain",
    description:
      "Build campaigns inside the CRM and send them from your own Gmail, Outlook, or company SMTP — so leads see your domain in the From line, not a marketing relay.",
    image: "/features/email-marketing.jpg",
    href: "/features/email-campaigns",
    bgColor: "#FBEAF0",
    slug: "email-campaigns",
    bullets: ["Send from your domain", "Gmail / Outlook / SMTP"]
  },
  {
    icon: "Sparkles",
    title: "AI summary and email drafts",
    description:
      "AI summarizes any lead or deal in seconds, then drafts follow-up emails based on the conversation — so you skip the reading and the typing.",
    image: "/features/ai_bot.jpg",
    href: "/features/ai-summary-and-drafts",
    bgColor: "#FAECE7",
    slug: "ai-summary-and-drafts",
    bullets: ["One-click summaries", "AI-drafted follow-ups"]
  }
];

// ---------- CRM cycle (the animated diagram under the section heading) ----------
// The workflow, in order. `name` is the short label under each coin; `title`
// is the heading in the side panel. Colours are the coin faces: top, left, right.
export interface CrmCycleStage {
  id: string;
  name: string;
  title: string;
  optional?: boolean;
  icon: "link" | "app" | "code" | "building" | "mail" | "chart";
  top: string;
  left: string;
  right: string;
  summary: string;
  points: string[];
}

export const crmCycle: { hub: string; stages: CrmCycleStage[] } = {
  hub: "Alliances PRO",
  stages: [
    {
      id: "partner",
      name: "Shopify Partner",
      title: "Connect Shopify Partner",
      icon: "link",
      top: "#D4F3BE",
      left: "#A8DC7C",
      right: "#7BC158",
      summary:
        "Paste your Partner ID and a Partner API token under Settings → Shopify, then test the connection. Installs and uninstalls sync about every 15 minutes.",
      points: ["Partner ID and API token", "Syncs about every 15 minutes"]
    },
    {
      id: "app",
      name: "Connect App",
      title: "Connect App",
      icon: "app",
      top: "#D1E2FF",
      left: "#9EC3FF",
      right: "#6F9BFF",
      summary:
        "Add each app by its App ID, or paste its Partner Dashboard URL. Every store that installs it is tracked from then on.",
      points: ["Add by App ID or URL", "A page for every app"]
    },
    {
      id: "contacts",
      name: "Get Contacts",
      title: "Add Code to Get Contacts",
      optional: true,
      icon: "code",
      top: "#DAD2FF",
      left: "#A293F3",
      right: "#7B68EE",
      summary:
        "Add one snippet to your app's OAuth callback and each merchant's email arrives on install. Prefer not to touch code? Add contacts by hand instead.",
      points: ["Copy-paste Remix or Laravel snippet", "Or add contacts manually"]
    },
    {
      id: "companies",
      name: "Add Companies",
      title: "Add Companies",
      icon: "building",
      top: "#FFE5C0",
      left: "#FFC97A",
      right: "#FFAE3D",
      summary:
        "Every store that installs your app becomes a company, matched by its myshopify.com domain. Add any other merchant yourself.",
      points: ["Created from every install", "Shopify Plan on each company"]
    },
    {
      id: "follow-up",
      name: "Follow-up",
      title: "Follow-up",
      icon: "mail",
      top: "#FFD0E0",
      left: "#FF9CC0",
      right: "#FF6BA0",
      summary:
        "Set follow-up dates, log every contact, and send welcome emails, farewell emails and campaigns. Your team hears about every uninstall.",
      points: ["Follow-up dates and contact logs", "Merchant email campaigns"]
    },
    {
      id: "sales",
      name: "Sales",
      title: "Sales",
      icon: "chart",
      top: "#C0F0E0",
      left: "#7BD9B5",
      right: "#3AC78F",
      summary:
        "Turn merchants into paying customers and win back the ones who uninstalled. Deals and revenue roll into your dashboard.",
      points: ["Deals and revenue on the dashboard", "Win back uninstalled merchants"]
    }
  ]
};
