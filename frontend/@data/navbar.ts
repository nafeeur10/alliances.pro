// Single source of truth for the marketing navbar.
// Edit this file to add/remove menu items, change CTAs, or swap the logo.

interface RouteProps {
  href: string;
  label: string;
}

interface ResourceItem {
  title: string;
  href: string;
  icon?: string;
  gradient?: string;
  description?: string;
}

interface ResourceGroup {
  label: string;
  items: ResourceItem[];
}

interface ResourceFeatured {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: string;
  cta: string;
}

interface NavCta {
  label: string;
  url: string;
}

interface NavLogo {
  text: string;
  iconName: string;
  imageUrl: string;
}

// ---------- Logo ----------
export const navLogo: NavLogo = {
  text: "Alliances PRO",
  iconName: "SunDim",
  imageUrl: "/logo-64.webp"
};

// ---------- Top-level menu items ----------
export const routeList: RouteProps[] = [
  { href: "#benefits", label: "Benefits" },
  { href: "#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About Us" }
];

// ---------- Resources megamenu ----------
// Each group renders as its own column; `resourceFeatured` fills the
// highlighted card on the right. Add a group or item here and it shows up.
export const resourceGroups: ResourceGroup[] = [
  {
    label: "Learn",
    items: [
      {
        title: "Documentation",
        icon: "BookOpen",
        gradient: "from-sky-500 via-indigo-500 to-fuchsia-500",
        description: "User manual & step-by-step guides.",
        href: "/docs"
      },
      {
        title: "Blogs",
        icon: "Newspaper",
        gradient: "from-amber-500 via-orange-500 to-rose-500",
        description: "Playbooks, product updates and field notes.",
        href: "/blog"
      },
      {
        title: "Help Center",
        icon: "LifeBuoy",
        gradient: "from-emerald-500 via-teal-500 to-cyan-500",
        description: "Answers to the questions we get most.",
        href: "/help"
      }
    ]
  },
  {
    label: "Product",
    items: [
      {
        title: "Changelog",
        icon: "History",
        gradient: "from-violet-500 via-purple-500 to-pink-500",
        description: "What we shipped and when.",
        href: "/changelog"
      },
      {
        title: "Roadmap",
        icon: "Map",
        gradient: "from-lime-500 via-green-500 to-emerald-600",
        description: "What's coming next.",
        href: "/roadmap"
      }
    ]
  }
];

export const resourceFeatured: ResourceFeatured = {
  eyebrow: "New release",
  title: "Shopify Partner integration",
  description: "Every install in your CRM, uninstalls flagged, merchants followed up.",
  href: "/blog/shopify-partner-crm-for-app-developers",
  image: "/blog/cover-shopify-partner.svg",
  cta: "Read the update"
};

// ---------- Header CTAs ----------
export const loginCta: NavCta = {
  label: "Log in",
  url: "https://crm.alliances.pro/signin"
};

export const signupCta: NavCta = {
  label: "Get Started",
  url: "https://crm.alliances.pro/signup"
};
