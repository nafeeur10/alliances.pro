// Designed default cover art for blog cards. Renders a branded gradient
// with the post title overlaid plus the Alliances PRO mark centered as a
// brand watermark. Theme is picked deterministically from the post slug
// so every card looks distinct, but the same post always renders the
// same cover.

import Image from "next/image";

import type { BlogPostSummary } from "@/lib/api";

interface CoverTheme {
  // Tailwind classes for the gradient background.
  bg: string;
  // Color used for the decorative blurred shapes.
  accent: string;
}

const THEMES: CoverTheme[] = [
  {
    bg: "bg-gradient-to-br from-[#1B3F88] to-[#3DD9B5]",
    accent: "bg-white/15"
  },
  {
    bg: "bg-gradient-to-br from-[#0F2D6B] via-[#1B3F88] to-[#2D6BB8]",
    accent: "bg-[#3DD9B5]/30"
  },
  {
    bg: "bg-gradient-to-br from-[#0F766E] via-[#14B8A6] to-[#1B3F88]",
    accent: "bg-white/15"
  },
  {
    bg: "bg-gradient-to-tr from-[#1B3F88] via-[#2D6BB8] to-[#3DD9B5]",
    accent: "bg-white/20"
  },
  {
    bg: "bg-gradient-to-br from-[#312E81] via-[#1B3F88] to-[#0EA5E9]",
    accent: "bg-[#3DD9B5]/30"
  }
];

// Tiny deterministic hash so the same slug always picks the same theme.
function slugHash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

interface Props {
  post: Pick<BlogPostSummary, "title" | "slug" | "category">;
  className?: string;
}

export function BlogCoverArt({ post, className }: Props) {
  const theme = THEMES[slugHash(post.slug) % THEMES.length];

  return (
    <div
      role="img"
      aria-label={post.title}
      className={`${theme.bg} relative flex h-full w-full flex-col justify-between overflow-hidden p-5 ${className ?? ""}`}
    >
      {/* Decorative shapes */}
      <div
        aria-hidden
        className={`${theme.accent} absolute -top-12 -right-12 size-40 rounded-full blur-2xl`}
      />
      <div
        aria-hidden
        className={`${theme.accent} absolute -bottom-16 -left-16 size-44 rounded-full blur-3xl`}
      />

      {/* Top row: eyebrow on the left, brand mark in the top-right corner */}
      <div className="relative flex items-start justify-between gap-3">
        <span className="text-[10px] font-semibold tracking-[0.2em] text-white/80 uppercase">
          {post.category ?? "Article"}
        </span>
        <div
          aria-hidden
          className="pointer-events-none flex shrink-0 items-center justify-center rounded-full bg-white/85 p-1.5 shadow-md backdrop-blur-sm"
        >
          <Image src="/logo.png" alt="" width={28} height={28} unoptimized className="size-7" />
        </div>
      </div>

      {/* Title */}
      <h4 className="relative line-clamp-3 text-lg leading-tight font-bold text-white sm:text-xl">
        {post.title}
      </h4>
    </div>
  );
}
