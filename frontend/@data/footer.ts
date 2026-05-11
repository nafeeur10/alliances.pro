// Single source of truth for the marketing footer.
// Edit logo, blurb, link columns, social URLs and copyright here.

interface FooterLogo {
  text: string;
  iconName: string;
  imageUrl: string;
}

interface FooterLink {
  label: string;
  url: string;
}

export interface FooterLinkColumn {
  heading: string;
  links: FooterLink[];
}

export interface FooterSocial {
  label: string;
  url: string;
  iconUrl: string;
}

interface FooterNewsletter {
  placeholder: string;
  ctaLabel: string;
  microcopy: string;
}

// ---------- Logo ----------
export const footerLogo: FooterLogo = {
  text: "Alliances PRO",
  iconName: "SunDim",
  imageUrl: "/logo.png"
};

// ---------- Blurb ----------
export const footerBlurb =
  "Meet our AI-powered SaaS solution to lighten your workload, increase efficiency and make more accurate decisions.";

// ---------- Link columns ----------
export const footerColumns: FooterLinkColumn[] = [
  {
    heading: "Alliances PRO",
    links: [
      { label: "Home", url: "/" },
      { label: "Our Story", url: "/about" },
      { label: "Pricing", url: "/pricing" },
      { label: "Features", url: "/#features" },
      { label: "Industries", url: "#" },
      { label: "Teams", url: "#" }
    ]
  },
  {
    heading: "Blogs",
    links: [
      { label: "Latest Articles", url: "/blog" },
      { label: "Case Studies", url: "/blog" },
      { label: "Marketing", url: "/blog" },
      { label: "Product Updates", url: "/blog" },
      { label: "CRM Analysis", url: "/blog" },
      { label: "Sales", url: "/blog" }
    ]
  },
  {
    heading: "Resources",
    links: [
      { label: "Documents", url: "/docs" },
      { label: "FAQs", url: "/help" },
      { label: "Contact Us", url: "/#contact" }
    ]
  },
  {
    heading: "Others",
    links: [
      { label: "Terms of Service", url: "/terms" },
      { label: "Privacy Policy", url: "/privacy" },
      { label: "Refund Policy", url: "/refund" },
      { label: "Careers", url: "/careers" }
    ]
  }
];

// ---------- Social ----------
// Order is preserved in render.
export const footerSocial: FooterSocial[] = [
  {
    label: "LinkedIn",
    url: "https://linkedin.com/showcase/alliances-pro",
    iconUrl: "/icons/linkedin.svg"
  },
  { label: "X", url: "https://x.com/alliances_pro", iconUrl: "/icons/x.svg" },
  {
    label: "Facebook",
    url: "https://www.facebook.com/alliancespro",
    iconUrl: "/icons/facebook.svg"
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/@AlliancesPRO",
    iconUrl: "/icons/youtube.svg"
  },
  {
    label: "Reddit",
    url: "https://www.reddit.com/user/ArticleAvailable6643/",
    iconUrl: "/icons/reddit.svg"
  }
];

// ---------- Newsletter ----------
export const footerNewsletter: FooterNewsletter = {
  placeholder: "you@example.com",
  ctaLabel: "Subscribe",
  microcopy: "One playbook a month. No spam, unsubscribe anytime."
};

// ---------- Copyright ----------
// Year is computed at render time so it stays current.
export const footerCopyright = (year: number = new Date().getFullYear()) =>
  `© ${year} Alliances PRO. All rights reserved.`;
