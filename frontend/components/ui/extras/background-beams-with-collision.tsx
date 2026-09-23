import React from "react";

import { cn } from "@/lib/utils";

/**
 * Falling beams that burst when they hit the bottom edge.
 *
 * Pure CSS: each beam gets its own keyframes, and its burst (glow + particles)
 * runs on the same cycle so it fires exactly when the beam lands. Keyframes
 * only touch transform and opacity with fixed values (no var()), so Chrome
 * runs every animation on the compositor, off the main thread. This used to
 * be framer-motion with a 50 ms getBoundingClientRect() poll per beam, which
 * forced a layout on every tick and kept React re-rendering the hero.
 */

type Beam = {
  x: number; // px from the left edge
  fall: number; // seconds from top to bottom edge
  rest: number; // seconds of quiet after the burst
  delay?: number;
  className?: string;
};

const BEAMS: Beam[] = [
  { x: 30, fall: 3.5, rest: 3, delay: 2 },
  { x: 600, fall: 1.5, rest: 3, delay: 4 },
  { x: 100, fall: 3.5, rest: 7, className: "h-6" },
  { x: 400, fall: 2.5, rest: 14, delay: 4 },
  { x: 800, fall: 5.5, rest: 2, className: "h-20" },
  { x: 1000, fall: 2, rest: 2, className: "h-12" },
  { x: 1200, fall: 3, rest: 4, delay: 2, className: "h-6" }
];

const BURST = 1.6; // seconds the burst takes to fade
const PARTICLES = 8;
const SPARK_REACH = 40; // px a spark travels at scale 1

// Deterministic scatter so server output is stable between renders. Each
// spark flies up and out at an angle; distance varies through scale.
function particle(beam: number, i: number) {
  const seed = Math.sin((beam + 1) * 97.13 + (i + 1) * 12.9898) * 43758.5453;
  const r = seed - Math.floor(seed);
  const r2 = (r * 7.31) % 1;
  return {
    angle: Math.round(-165 + (150 * (i + r)) / PARTICLES), // fan across the upper half
    scale: +(0.5 + r2 * 0.9).toFixed(2)
  };
}

const pct = (n: number) => `${Math.min(n, 100).toFixed(3)}%`;

function beamCss(b: Beam, i: number) {
  const cycle = b.fall + BURST + b.rest;
  const land = (b.fall / cycle) * 100;
  const after = land + 0.01;
  const burstEnd = ((b.fall + BURST) / cycle) * 100;
  const sparkEnd = ((b.fall + BURST * 0.8) / cycle) * 100;

  return `
@keyframes bb-fall-${i} {
  0% { transform: translateY(calc(-100% - 120px)); opacity: 1; }
  ${pct(land)} { transform: translateY(0); opacity: 1; }
  ${pct(after)} { transform: translateY(0); opacity: 0; }
  100% { transform: translateY(0); opacity: 0; }
}
@keyframes bb-glow-${i} {
  0%, ${pct(land)} { opacity: 0; }
  ${pct(after)} { opacity: 1; animation-timing-function: ease-out; }
  ${pct(burstEnd)}, 100% { opacity: 0; }
}
@keyframes bb-spark-${i} {
  0%, ${pct(land)} { transform: translateX(0); opacity: 0; }
  ${pct(after)} { transform: translateX(0); opacity: 1; animation-timing-function: ease-out; }
  ${pct(sparkEnd)}, 100% { transform: translateX(${SPARK_REACH}px); opacity: 0; }
}
.bb-${i} { --bb-anim: ${cycle}s linear ${b.delay ?? 0}s infinite both; }`;
}

const CSS =
  BEAMS.map(beamCss).join("\n") +
  `
@media (prefers-reduced-motion: reduce) {
  .bb-track, .bb-glow, .bb-spark { animation: none !important; opacity: 0 !important; }
}`;

export function BackgroundBeamsWithCollision({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("relative flex w-full items-center justify-center overflow-hidden", className)}
    >
      <style>{CSS}</style>

      {BEAMS.map((b, i) => (
        <React.Fragment key={i}>
          {/* The track spans the container's height; sliding it by its own
              height moves the beam from above the top edge to the bottom. */}
          <div
            aria-hidden
            className={`bb-${i} bb-track pointer-events-none absolute inset-y-0 w-px will-change-transform`}
            style={{ left: b.x, animation: `bb-fall-${i} var(--bb-anim)` }}
          >
            <div
              className={cn(
                "from-primary via-secondary absolute bottom-0 left-0 h-14 w-px rounded-full bg-gradient-to-t to-transparent",
                b.className
              )}
            />
          </div>

          <div
            aria-hidden
            className={`bb-${i} pointer-events-none absolute bottom-0 z-50 h-2 w-2`}
            style={{ left: b.x, transform: "translate(-50%, 50%)" }}
          >
            <div
              className="bb-glow via-primary absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent to-transparent blur-sm"
              style={{ animation: `bb-glow-${i} var(--bb-anim)` }}
            />
            {Array.from({ length: PARTICLES }, (_, p) => {
              const { angle, scale } = particle(i, p);
              return (
                // The wrapper aims and sizes the flight; the spark only moves
                // along its own x axis.
                <span
                  key={p}
                  className="absolute top-0 left-0"
                  style={{ transform: `rotate(${angle}deg) scale(${scale})` }}
                >
                  <span
                    className="bb-spark bg-primary block h-1 w-1 rounded-full"
                    style={{ animation: `bb-spark-${i} var(--bb-anim)` }}
                  />
                </span>
              );
            })}
          </div>
        </React.Fragment>
      ))}

      {children}
    </div>
  );
}
