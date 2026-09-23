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
  imageSrcSet: string; // responsive WebP versions; regenerate them when the image changes
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  trustChecks: TrustCheck[];
}

export const heroContent: HeroContent = {
  eyebrow: "Shopify Partner CRM · Easiest & Effective",
  headline: "Every Shopify App Install, Straight Into Your CRM",
  subheadline:
    "Alliances PRO syncs installs and uninstalls from your Partner account, collects merchant emails after OAuth, and runs follow-ups so churned stores come back. Also built for agencies and small businesses.",
  imageUrl: "/company-1440.webp",
  imageSrcSet:
    "/company-640.webp 640w, /company-768.webp 768w, /company-1024.webp 1024w, /company-1280.webp 1280w, /company-1440.webp 1440w",
  imageWidth: 1440,
  imageHeight: 722,
  imageAlt:
    "Companies table in Alliances PRO with Shopify merchants, follow-up dates and assigned owners",
  primaryCta: { label: "Start Free Trial", url: "https://crm.alliances.pro/signup" },
  secondaryCta: { label: "Contact Us", url: "#contact" },
  trustChecks: [{ label: "No credit card" }, { label: "14-day trial" }, { label: "Cancel anytime" }]
};
