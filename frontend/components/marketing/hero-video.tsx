"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

interface HeroVideoProps {
  youtubeId: string;
  title: string;
}

// Click-to-load facade: shows the YouTube thumbnail and only mounts the
// iframe (and its ~1MB of player JS) once the visitor presses play.
export function HeroVideo({ youtubeId, title }: HeroVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="border-border/60 relative aspect-video w-full overflow-hidden rounded-xl border bg-black shadow-2xl">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            trackEvent("demo_video_played", { location: "hero" });
            setPlaying(true);
          }}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
            alt=""
            width={480}
            height={360}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
          <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-rose-600 shadow-lg ring-4 ring-white/30 transition-transform group-hover:scale-110 md:size-20">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 size-7 fill-white md:size-9"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
