export interface DocsArticle {
  title: string;
  slug: string;
  description?: string;
}

export interface DocsSection {
  title: string;
  description: string;
  articles: DocsArticle[];
}

export const docsSections: DocsSection[] = [
  {
    title: "Installation",
    description: "Step-by-step guides to setting up your workspace and getting started quickly.",
    articles: []
  },
  {
    title: "Lead Management",
    description: "Capture, track, and convert leads from every source in one place.",
    articles: []
  },
  {
    title: "Deal Management",
    description: "Manage your pipeline, move deals through stages, and close more revenue.",
    articles: []
  },
  {
    title: "Marketing",
    description: "Run campaigns, manage contact lists, and track engagement across channels.",
    articles: []
  },
  {
    title: "Settings",
    description: "Configure notifications, profile preferences, and workspace-level options.",
    articles: [
      {
        title: "Notification Settings",
        slug: "settings-notifications",
        description: "Control Daily Digest email and the Feedback button from your profile."
      }
    ]
  }
];
