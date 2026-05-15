// Single source of truth for the /roadmap page.
// Edit titles, descriptions, status, ETA, and accent colors here.
// Status drives the pill color and label rendered on each card.

export type RoadmapStatus = "planned" | "in_design" | "building" | "beta";

export interface RoadmapItem {
  icon: string; // path to colored SVG under /public, e.g. "/icons/roadmap/whatsapp.svg"
  title: string;
  description: string;
  status: RoadmapStatus;
  /** Approximate ETA, e.g. "Q3 2026" or "Soon". Optional. */
  eta?: string;
  /** Hex used for the soft card background tint, e.g. "#E1F5EE". */
  accentColor: string;
}

export const roadmapSection = {
  eyebrow: "Roadmap",
  headline: "What's coming next",
  description:
    "Here's what we're building so Alliances PRO keeps doing more of the work for you. Dates are best-effort, not contracts."
};

export const STATUS_LABEL: Record<RoadmapStatus, string> = {
  planned: "Planned",
  in_design: "In design",
  building: "Building",
  beta: "Beta"
};

export const upcomingFeatures: RoadmapItem[] = [
  {
    icon: "/icons/roadmap/whatsapp.svg",
    title: "WhatsApp Integration",
    description:
      "Send and receive WhatsApp messages directly on lead, deal, and client records. Threads log automatically, so every conversation is on the timeline.",
    status: "planned",
    eta: "Q3 2026",
    accentColor: "#E7F8EE"
  },
  {
    icon: "/icons/roadmap/slack.svg",
    title: "Slack Integration",
    description:
      "Lead, deal, and client updates pushed to the Slack channel of your choice. Reply from Slack to log a note back to the record.",
    status: "planned",
    eta: "Q3 2026",
    accentColor: "#F1EAF5"
  },
  {
    icon: "/icons/roadmap/automation.svg",
    title: "Follow-up automation",
    description:
      "Rules that create follow-up tasks on their own — when a stage changes, when a lead goes quiet, when a renewal nears. Stop typing the same task twice.",
    status: "building",
    eta: "Q2 2026",
    accentColor: "#FDEBD7"
  },
  {
    icon: "/icons/roadmap/lead-scoring.svg",
    title: "Lead scoring",
    description:
      "Score leads by engagement, source, and fit — so reps work the hottest first and managers see where the pipeline is actually warm.",
    status: "in_design",
    eta: "Q3 2026",
    accentColor: "#E1F2FB"
  },
  {
    icon: "/icons/roadmap/follow-up-scoring.svg",
    title: "Follow-up scoring",
    description:
      "Score follow-up quality and consistency per teammate. Spot dropped balls and reward the reps who stay on top of their pipeline.",
    status: "in_design",
    eta: "Q4 2026",
    accentColor: "#EDE8FB"
  },
  {
    icon: "/icons/roadmap/sms.svg",
    title: "SMS Integration",
    description:
      "Two-way SMS on lead and client records via a Twilio-style provider. Opt-in tracking built in, so compliance stays clean.",
    status: "planned",
    eta: "Q4 2026",
    accentColor: "#E2F6EC"
  }
];
