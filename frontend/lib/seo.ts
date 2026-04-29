import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://alliances.pro";

export const SITE_NAME = "Alliances PRO";

export const SITE_DESCRIPTION =
  "The CRM platform built for service businesses that grow sideways. Sales CRM today, Education CRM tomorrow — one login, one bill, never per-seat.";

export const SOCIAL = {
  twitter: "@alliancespro",
  twitterUrl: "https://twitter.com/alliancespro",
  linkedinUrl: "https://linkedin.com/company/alliancespro",
  githubUrl: "https://github.com/alliancespro",
  youtubeUrl: "https://youtube.com/@alliancespro"
} as const;

type OgType = "website" | "article" | "product";

export interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: OgType;
  /** When true, search engines will not index the page. */
  noIndex?: boolean;
  /** Optional published time for article pages. */
  publishedTime?: string;
  /** Optional modified time for article pages. */
  modifiedTime?: string;
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/**
 * Returns a fully-resolved OG image URL. If `image` is omitted, falls back
 * to the dynamic /api/og endpoint with the title/subtitle baked in.
 */
function resolveOgImage(input: BuildMetadataInput): string {
  if (input.image) return absoluteUrl(input.image);

  const params = new URLSearchParams({
    title: input.title,
    subtitle: SITE_NAME
  });
  return absoluteUrl(`/api/og?${params.toString()}`);
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const ogImage = resolveOgImage(input);
  const type = input.type ?? "website";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: input.title
    },
    description: input.description,
    applicationName: SITE_NAME,
    alternates: {
      canonical: url
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: type === "product" ? "website" : type,
      url,
      siteName: SITE_NAME,
      title: input.title,
      description: input.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: input.title
        }
      ],
      ...(type === "article" && input.publishedTime
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime }
        : {})
    },
    twitter: {
      card: "summary_large_image",
      site: SOCIAL.twitter,
      creator: SOCIAL.twitter,
      title: input.title,
      description: input.description,
      images: [ogImage]
    }
  };
}
