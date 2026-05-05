// Reverse-chronological list of product changes. Newest at the top.

export type ChangelogType = "Feature" | "Improvement" | "Fix" | "Update";

export interface ChangelogEntry {
  date: string; // ISO yyyy-mm-dd
  version?: string;
  type: ChangelogType;
  title: string;
  body: string;
}

export const changelogEntries: ChangelogEntry[] = [
  {
    date: "2026-05-03",
    version: "v2.0",
    type: "Feature",
    title: "Workspace v2",
    body: "New pipeline view with 2× card density, redesigned lead drawer with AI summary + next follow-up, Activity timeline, and persistent filters."
  },
  {
    date: "2026-04-29",
    type: "Improvement",
    title: "Bulk stage moves with shift-click",
    body: "Hold shift and click two cards in pipeline view to move every card between them in one go. Keyboard arrow + shift also supported."
  },
  {
    date: "2026-04-22",
    type: "Feature",
    title: "Two-way Gmail sync — labels and stars",
    body: "Gmail labels now sync as workspace tags. Stars on inbound mail surface on the lead timeline so you can see what your inbox already prioritized."
  },
  {
    date: "2026-04-08",
    type: "Improvement",
    title: "Pause-on-reply cadence",
    body: "Automated follow-up sequences now pause automatically when a recipient replies. No more cold-email-ing someone who already responded."
  },
  {
    date: "2026-03-25",
    type: "Update",
    title: "Pricing simplification",
    body: "Two plans, flat rates. Pro $19/mo for up to 10 users, Business $39/mo unlimited. No more per-seat math."
  }
];
