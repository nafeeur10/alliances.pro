// Featured blog posts shown in the homepage Blog section.
// Edit titles, excerpts, slugs, and cover images here.
// The full archive lives at /blog and is driven by the CMS.

interface BlogPost {
  slug: string; // resolves to /blog/<slug>
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string; // ISO date — used for display + ordering
  cover: string; // path under /public, e.g. "/blog/cover-1.jpg"
}

export const blogSection = {
  eyebrow: "Blogs and Stories",
  headline: "Playbooks, deep dives, and field notes.",
  description:
    "Practical writing for service businesses — pipelines, follow-ups, agency ops, and how to pick the right CRM stack."
};

export const featuredBlogPosts: BlogPost[] = [
  {
    slug: "service-business-crm-stack",
    title: "The CRM stack that actually fits a service business",
    excerpt:
      "Pipedrive + Mailchimp + a dialer is three bills, three logins, three places your reps copy-paste from. Here's what to consolidate first — and what to leave alone.",
    category: "Playbooks",
    readTime: "7 min read",
    date: "2026-04-22",
    cover: "/blog/cover-stack.svg"
  },
  {
    slug: "follow-up-cadences-that-dont-feel-like-a-bot",
    title: "Follow-up cadences that don't feel like a bot",
    excerpt:
      "The biggest tell that a sequence isn't tuned: \"Day 3 follow-up\" lands after the prospect already replied. Here's how to wire pause-on-reply into your CRM in an afternoon.",
    category: "Email automation",
    readTime: "5 min read",
    date: "2026-04-14",
    cover: "/blog/cover-cadence.svg"
  },
  {
    slug: "ditch-per-seat-pricing",
    title: "Per-seat CRM pricing was a tax. Here's what we built instead.",
    excerpt:
      "When your CRM bill grows linearly with hires, the CRM is a tax on hiring. Why we shipped a flat-rate workspace — and the math on when it pays off.",
    category: "Inside Alliances PRO",
    readTime: "4 min read",
    date: "2026-04-03",
    cover: "/blog/cover-pricing.svg"
  }
];
