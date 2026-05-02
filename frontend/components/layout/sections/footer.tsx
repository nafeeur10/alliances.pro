import Link from "next/link";
import { DribbbleIcon, FacebookIcon, LinkedinIcon, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/logo";
import { getPublicSettings, pickString } from "@/lib/cms";

interface FooterLinkColumn {
  heading: string;
  links: Array<{ label: string; url: string }>;
}

const FALLBACK_COLUMNS: FooterLinkColumn[] = [
  {
    heading: "Contact",
    links: [
      { label: "Github", url: "#" },
      { label: "Twitter", url: "#" },
      { label: "Instagram", url: "#" }
    ]
  },
  {
    heading: "Platforms",
    links: [
      { label: "iOS", url: "#" },
      { label: "Android", url: "#" },
      { label: "Web", url: "#" }
    ]
  },
  {
    heading: "Help",
    links: [
      { label: "Contact Us", url: "#" },
      { label: "FAQ", url: "#" },
      { label: "Feedback", url: "#" }
    ]
  },
  {
    heading: "Socials",
    links: [
      { label: "Twitch", url: "#" },
      { label: "Discord", url: "#" },
      { label: "Dribbble", url: "#" }
    ]
  }
];

function safeJson<T>(value: unknown, fallback: T): T {
  if (Array.isArray(value)) return value as T;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as T) : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export const FooterSection = async () => {
  const settings = await getPublicSettings();

  const logoProps = {
    text: pickString(settings, "logo_text", "Alliances PRO"),
    iconName: pickString(settings, "logo_icon", "SunDim"),
    imageUrl: "/alliancespro_logo.png"
  };

  const blurb = pickString(
    settings,
    "footer_blurb",
    pickString(
      settings,
      "site_tagline",
      "Meet our AI-powered SaaS solution to lighten your workload, increase efficiency and make more accurate decisions."
    )
  );
  const columns = safeJson<FooterLinkColumn[]>(settings.footer_columns, FALLBACK_COLUMNS);
  const copyright = pickString(
    settings,
    "footer_copyright",
    `© ${new Date().getFullYear()} Alliances PRO. All rights reserved.`
  );

  const facebookUrl = pickString(settings, "facebook_url", "#");
  const twitterUrl = pickString(settings, "twitter_url", "#");
  const dribbbleUrl = pickString(settings, "dribbble_url", "#");
  const linkedinUrl = pickString(settings, "linkedin_url", "#");

  return (
    <footer id="footer" className="container space-y-4 pb-4 lg:pb-8">
      <div className="bg-muted rounded-2xl border p-10">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-4 xl:grid-cols-6">
          <div className="col-span-full space-y-4 xl:col-span-2">
            <Logo {...logoProps} />
            <p className="text-muted-foreground">{blurb}</p>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-2">
              <h3 className="mb-2 text-lg font-bold">{col.heading}</h3>
              {(col.links ?? []).map((l) => (
                <div key={`${col.heading}-${l.label}`}>
                  <Link href={l.url} className="opacity-60 hover:opacity-100">
                    {l.label}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row!">
        <div className="text-muted-foreground flex items-center justify-center gap-1 text-sm sm:justify-start">
          <span>{copyright}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button size="icon" variant="ghost" className="hover:opacity-50" asChild>
            <Link href={facebookUrl} aria-label="Facebook">
              <FacebookIcon />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" className="hover:opacity-50" asChild>
            <Link href={twitterUrl} aria-label="Twitter">
              <Twitter />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" className="hover:opacity-50" asChild>
            <Link href={dribbbleUrl} aria-label="Dribbble">
              <DribbbleIcon />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" className="hover:opacity-50" asChild>
            <Link href={linkedinUrl} aria-label="LinkedIn">
              <LinkedinIcon />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};
