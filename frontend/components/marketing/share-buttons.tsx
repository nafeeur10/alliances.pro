"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Link2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface ShareTarget {
  label: string;
  iconUrl: string;
  build: (encodedUrl: string, encodedTitle: string) => string;
  newTab: boolean;
}

const TARGETS: ShareTarget[] = [
  {
    label: "Share on X",
    iconUrl: "/icons/x.svg",
    build: (u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
    newTab: true
  },
  {
    label: "Share on LinkedIn",
    iconUrl: "/icons/linkedin.svg",
    build: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    newTab: true
  },
  {
    label: "Share on Facebook",
    iconUrl: "/icons/facebook.svg",
    build: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    newTab: true
  },
  {
    label: "Share on WhatsApp",
    iconUrl: "/icons/whatsapp.svg",
    build: (u, t) => `https://wa.me/?text=${t}%20${u}`,
    newTab: true
  }
];

interface Props {
  url: string;
  title: string;
  className?: string;
  /** Rail variant: no top rule, smaller targets, label above the icons. */
  compact?: boolean;
}

export function ShareButtons({ url, title, className, compact = false }: Props) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard might be unavailable (insecure context, permissions); fail silently.
    }
  };

  return (
    <div
      className={cn(
        compact
          ? "flex flex-col gap-3"
          : "border-border/60 mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 border-t pt-6",
        className
      )}
    >
      <span
        className={cn(
          "text-muted-foreground text-[11px] font-medium tracking-wider uppercase",
          compact && "font-semibold tracking-widest"
        )}
      >
        {compact ? "Share" : "Share this article"}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {TARGETS.map((target) => (
          <a
            key={target.label}
            href={target.build(encodedUrl, encodedTitle)}
            target={target.newTab ? "_blank" : undefined}
            rel={target.newTab ? "noopener noreferrer" : undefined}
            aria-label={target.label}
            className={cn(
              "border-border/70 hover:border-primary/40 hover:bg-background flex items-center justify-center rounded-full border bg-white shadow-sm transition-colors",
              compact ? "size-9" : "size-10"
            )}
          >
            <Image
              src={target.iconUrl}
              alt=""
              aria-hidden
              width={20}
              height={20}
              unoptimized
              className="size-5"
            />
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Link copied" : "Copy link"}
          className={cn(
            "text-muted-foreground hover:text-foreground border-border/70 hover:border-primary/40 hover:bg-background flex items-center justify-center rounded-full border bg-white shadow-sm transition-colors",
            compact ? "size-9" : "size-10"
          )}
        >
          {copied ? (
            <Check className="size-5 text-emerald-500" aria-hidden strokeWidth={2.25} />
          ) : (
            <Link2 className="size-5" aria-hidden strokeWidth={2.25} />
          )}
        </button>
      </div>
    </div>
  );
}
