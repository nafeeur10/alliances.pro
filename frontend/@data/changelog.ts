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
    date: "2026-09-21",
    version: "v2.1",
    type: "Feature",
    title: "Shopify Partner integration",
    body: "Connect your Shopify Partner account and every store that installs your app lands in Companies as a merchant. Uninstalls are flagged automatically, synced about every 15 minutes."
  },
  {
    date: "2026-09-21",
    type: "Feature",
    title: "Merchant email collection",
    body: "Your app sends the store owner's contact details once per install using a token and copy-paste snippets from Settings. Backfill older installs in bulk."
  },
  {
    date: "2026-09-21",
    type: "Feature",
    title: "Merchant follow-ups and campaigns",
    body: "Welcome and farewell emails, uninstall alerts for your team, a merchant audience in email campaigns, and follow-up dates with contact logs on every company."
  },
  {
    date: "2026-09-21",
    type: "Feature",
    title: "Workspace types",
    body: "Choose Shopify App Founder or Generic Sales when you sign up, or switch later in Settings. Switching never deletes data, so switching back restores everything."
  },
  {
    date: "2026-09-21",
    type: "Improvement",
    title: "Spanish screens and cleaner breadcrumbs",
    body: 'All new screens are translated into Spanish. Settings breadcrumbs now read properly, such as "General" instead of "general".'
  },
  {
    date: "2026-09-21",
    type: "Improvement",
    title: "Honest status monitoring",
    body: 'The health check now tests the database, cache, background workers and scheduler, and reports "down" when any of them fails.'
  },
  {
    date: "2026-09-21",
    type: "Fix",
    title: "Large file uploads",
    body: 'Bigger files, such as lead attachments up to 20 MB, no longer fail with a vague "failed to upload" error.'
  },
  {
    date: "2026-09-21",
    type: "Fix",
    title: "Long background jobs finish reliably",
    body: "Long-running jobs like the Shopify sync are no longer cut off partway and retried, so they finish in one pass."
  },
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
