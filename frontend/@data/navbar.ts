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
  description?: string;
}

interface ResourceGroup {
  label: string;
  items: ResourceItem[];
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
  imageUrl: "/logo.png"
};

// ---------- Top-level menu items ----------
export const routeList: RouteProps[] = [
  { href: "#benefits", label: "Benefits" },
  { href: "#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "#blog", label: "Blogs" },
  { href: "/about", label: "About Us" }
];

// ---------- Resources mega-menu ----------
export const resourceGroups: ResourceGroup[] = [
  {
    label: "Get help",
    items: [
      {
        title: "Help Center",
        icon: "LifeBuoy",
        description: "Browse guides, FAQs and how-tos.",
        href: "/help"
      },
      {
        title: "Docs",
        icon: "BookOpen",
        description: "Developer & integration documentation.",
        href: "/docs"
      },
      {
        title: "Changelog",
        icon: "GitCommitHorizontal",
        description: "What we've shipped, version by version.",
        href: "/changelog"
      }
    ]
  },
  {
    label: "Stay updated",
    items: [
      {
        title: "Announcements",
        icon: "Megaphone",
        description: "Product news and important updates.",
        href: "/announcements"
      },
      {
        title: "Blog",
        icon: "Newspaper",
        description: "Playbooks, deep dives and field notes.",
        href: "/blog"
      },
      {
        title: "Career",
        icon: "Briefcase",
        description: "Open roles at Alliances PRO.",
        href: "/careers"
      }
    ]
  }
];

// ---------- Header CTAs ----------
export const loginCta: NavCta = {
  label: "Log in",
  url: "https://app.alliances.pro/login"
};

export const signupCta: NavCta = {
  label: "Get Started",
  url: "https://app.alliances.pro/signup"
};
