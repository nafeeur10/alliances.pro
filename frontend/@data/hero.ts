// Single source of truth for the homepage hero section.
// Edit this file to change copy, CTAs, image, or trust checks.

interface HeroCta {
  label: string;
  url: string;
}

interface TrustCheck {
  label: string;
}

interface HeroContent {
  eyebrow: string; // text before the "·" becomes the small pill, text after is the tagline
  headline: string; // main H1 (HeroHeadline animates this)
  subheadline: string; // paragraph under the headline
  imageUrl: string; // hero image (served from /public)
  imageAlt: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  trustChecks: TrustCheck[];
}

export const heroContent: HeroContent = {
  eyebrow: "CRM · Easiest & Effective",
  headline: "Best AI CRM for Small Businesses",
  subheadline:
    "Built with a focus on service businesses. Alliances PRO organizes every client, generates AI summaries on every lead and deal, runs your pipeline to signed deals, and sends bulk email — so you can stop juggling tools and just serve.",
  imageUrl: "/alliances-hero.png",
  imageAlt: "Alliances PRO hero section image",
  primaryCta: { label: "Start Free Trial", url: "https://app.alliances.pro/signup" },
  secondaryCta: { label: "Contact Us", url: "#contact" },
  trustChecks: [{ label: "No credit card" }, { label: "14-day trial" }, { label: "Cancel anytime" }]
};
