import React from "react";

import { cn } from "@/lib/utils";

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  /** Seconds for one full pass of the content. */
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Horizontal marquee in pure CSS. The content is rendered twice, each copy
 * padded by one `gap`, so sliding the strip by exactly -50% lands the second
 * copy where the first began and the loop is seamless.
 */
export function InfiniteSlider({
  children,
  gap = 16,
  duration = 30,
  reverse = false,
  className
}: InfiniteSliderProps) {
  const group = (hidden: boolean) => (
    <div
      className="flex shrink-0 items-center"
      style={{ gap, paddingRight: gap }}
      aria-hidden={hidden || undefined}
    >
      {children}
    </div>
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="infinite-slider flex w-max"
        style={{
          animation: `infinite-slider ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`
        }}
      >
        {group(false)}
        {group(true)}
      </div>
      <style>{`
@keyframes infinite-slider { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .infinite-slider { animation: none !important; } }`}</style>
    </div>
  );
}
