"use client";

/**
 * CrmCycle — the CRM workflow as a self-playing, step-by-step diagram.
 *
 * Isometric "coin" stages sit on a ring around the hub. A single record
 * travels from the first stage to the last, then starts over. The stage it
 * reaches becomes active: the coin lifts, the hub's progress arc advances,
 * and the side panel explains that step.
 *
 * Autoplay pauses while the pointer is over the diagram or panel, while the
 * section is off-screen, and when the viewer presses pause. Clicking a stage
 * (or a step button) jumps straight to it. Reduced-motion users get the
 * static ring and the panel, with no travelling record.
 *
 *   <CrmCycle stages={crmCycle.stages} hub={crmCycle.hub} />
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import type { CrmCycleStage } from "@/@data/features";
import { cn } from "@/lib/utils";

// ─── Geometry ──────────────────────────────────────────────────────────────
const NODE_W = 88;
const NODE_H = 44;
const NODE_DEPTH = 60;
const SVG_W = 980;
const SVG_H = 880;
const HUB_X = 490;
const HUB_Y = 440;
const RADIUS = 280;
const ARC_R = 82;
const ARC_LEN = 2 * Math.PI * ARC_R;
const LIFT = 14;

// ─── Timing (seconds) ──────────────────────────────────────────────────────
const HOLD = 2.4; // time the record spends "inside" a stage
const MOVE = 1.1; // time to travel to the next stage
const FADE = 0.18;

type Point = [number, number];

interface PositionedStage extends CrmCycleStage {
  index: number;
  cx: number;
  cy: number;
}

interface CrmCycleProps {
  stages: CrmCycleStage[];
  hub: string;
  className?: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────
function edgeBetween(a: PositionedStage, b: PositionedStage): string {
  const ay = a.cy + NODE_H * 0.55;
  const by = b.cy + NODE_H * 0.55;
  const dx = b.cx - a.cx;
  const dy = by - ay;

  let p0: Point, p1: Point, p2: Point, p3: Point;
  if (Math.abs(dx) > Math.abs(dy)) {
    const sx = a.cx + Math.sign(dx) * NODE_W * 0.5;
    const ex = b.cx - Math.sign(dx) * NODE_W * 0.5;
    const mx = (sx + ex) / 2;
    [p0, p1, p2, p3] = [
      [sx, ay],
      [mx, ay],
      [mx, by],
      [ex, by]
    ];
  } else {
    const sy = ay + Math.sign(dy) * NODE_H * 0.6;
    const ey = by - Math.sign(dy) * NODE_H * 0.6;
    const my = (sy + ey) / 2;
    [p0, p1, p2, p3] = [
      [a.cx, sy],
      [a.cx, my],
      [b.cx, my],
      [b.cx, ey]
    ];
  }

  return `M ${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${p3[0]} ${p3[1]}`;
}

const pad = (n: number) => String(n).padStart(2, "0");

// ─── Icon library (flat 2D, drawn on the coin's lid) ───────────────────────
function StageIcon({
  kind,
  cx,
  cy,
  arrowMarker
}: {
  kind: CrmCycleStage["icon"];
  cx: number;
  cy: number;
  arrowMarker: string;
}) {
  switch (kind) {
    case "link":
      // Two chain links: the Partner account joined to the CRM.
      return (
        <g transform={`rotate(-35 ${cx} ${cy})`}>
          <rect
            x={cx - 20}
            y={cy - 6}
            width={22}
            height={12}
            rx={6}
            fill="#fff"
            stroke="#070707"
            strokeWidth="1.6"
          />
          <rect
            x={cx - 2}
            y={cy - 6}
            width={22}
            height={12}
            rx={6}
            fill="none"
            stroke="#070707"
            strokeWidth="1.6"
          />
        </g>
      );

    case "app":
      return (
        <g>
          {[
            [-13, -11],
            [1, -11],
            [-13, 1],
            [1, 1]
          ].map(([dx, dy], i) => (
            <rect
              key={i}
              x={cx + dx}
              y={cy + dy}
              width={12}
              height={11}
              rx={2.5}
              fill={i === 3 ? "#070707" : "#fff"}
              stroke="#070707"
              strokeWidth="1.4"
            />
          ))}
        </g>
      );

    case "code":
      return (
        <g
          fill="none"
          stroke="#070707"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x={cx - 20}
            y={cy - 11}
            width={40}
            height={24}
            rx={3}
            fill="#fff"
            strokeWidth="1.4"
          />
          <path d={`M ${cx - 7} ${cy - 4} L ${cx - 13} ${cy + 1} L ${cx - 7} ${cy + 6}`} />
          <path d={`M ${cx + 7} ${cy - 4} L ${cx + 13} ${cy + 1} L ${cx + 7} ${cy + 6}`} />
          <path d={`M ${cx + 2} ${cy - 6} L ${cx - 2} ${cy + 8}`} />
        </g>
      );

    case "building":
      return (
        <g>
          <rect
            x={cx - 15}
            y={cy - 10}
            width={30}
            height={22}
            fill="#fff"
            stroke="#070707"
            strokeWidth="1.4"
            rx={1}
          />
          <rect x={cx - 3} y={cy + 5} width={6} height={8} fill="#070707" />
          {[-9, 4].map((dx) => (
            <g key={dx}>
              <rect x={cx + dx} y={cy - 6} width={4} height={4} fill="#070707" />
              <rect x={cx + dx} y={cy} width={4} height={4} fill="#070707" />
            </g>
          ))}
        </g>
      );

    case "mail":
      return (
        <g>
          <rect
            x={cx - 18}
            y={cy - 10}
            width={36}
            height={24}
            rx={2}
            fill="#fff"
            stroke="#070707"
            strokeWidth="1.4"
          />
          <path
            d={`M ${cx - 17} ${cy - 9} L ${cx} ${cy + 4} L ${cx + 17} ${cy - 9}`}
            fill="none"
            stroke="#070707"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </g>
      );

    case "chart": {
      const heights = [8, 13, 19];
      return (
        <g>
          {[-12, -3, 6].map((dx, i) => (
            <rect
              key={i}
              x={cx + dx}
              y={cy + 9 - heights[i]}
              width={6}
              height={heights[i]}
              fill="#fff"
              stroke="#070707"
              strokeWidth="1.4"
            />
          ))}
          <path
            d={`M ${cx - 15} ${cy + 8} L ${cx + 13} ${cy - 13}`}
            stroke="#070707"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            markerEnd={`url(#${arrowMarker})`}
          />
        </g>
      );
    }

    default:
      return null;
  }
}

// ─── Single isometric coin ─────────────────────────────────────────────────
function Coin({
  stage,
  total,
  active,
  arrowMarker,
  onSelect,
  onHover
}: {
  stage: PositionedStage;
  total: number;
  active: boolean;
  arrowMarker: string;
  onSelect: (i: number) => void;
  onHover: (i: number, over: boolean) => void;
}) {
  const { cx, cy } = stage;
  const w = NODE_W;
  const h = NODE_H;
  const d = NODE_DEPTH;

  const TN: Point = [cx, cy - h];
  const TE: Point = [cx + w, cy];
  const TS: Point = [cx, cy + h];
  const TW: Point = [cx - w, cy];
  const BE: Point = [cx + w, cy + d];
  const BS: Point = [cx, cy + h + d];
  const BW: Point = [cx - w, cy + d];
  const pts = (...arr: Point[]) => arr.map((p) => p.join(",")).join(" ");

  return (
    <g
      className={cn("cycle-stage", active && "is-active")}
      data-index={stage.index}
      role="button"
      tabIndex={0}
      aria-label={`Step ${stage.index + 1} of ${total}: ${stage.title}`}
      aria-pressed={active}
      onClick={() => onSelect(stage.index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(stage.index);
        }
      }}
      onMouseEnter={() => onHover(stage.index, true)}
      onMouseLeave={() => onHover(stage.index, false)}
    >
      {/* Soft glow under the active coin */}
      <ellipse
        className="cycle-glow"
        cx={cx}
        cy={cy + h + d + 8}
        rx={w * 1.15}
        ry={h * 0.55}
        fill={stage.right}
      />
      <ellipse cx={cx} cy={cy + h + d + 8} rx={w * 0.95} ry={h * 0.4} className="cycle-shadow" />
      <g className="cycle-coin">
        <polygon
          points={pts(TE, TS, BS, BE)}
          fill={stage.right}
          stroke="#070707"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <polygon
          points={pts(TW, TS, BS, BW)}
          fill={stage.left}
          stroke="#070707"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <polygon
          points={pts(TN, TE, TS, TW)}
          fill={stage.top}
          stroke="#070707"
          strokeWidth={active ? 2.2 : 1.4}
          strokeLinejoin="round"
        />
        <StageIcon kind={stage.icon} cx={cx} cy={cy - 1} arrowMarker={arrowMarker} />
      </g>
      <text className="cycle-meta" x={cx} y={cy + h + d + 30}>
        Step {pad(stage.index + 1)}
        {stage.optional ? " · Optional" : ""}
      </text>
      <text className="cycle-label" x={cx} y={cy + h + d + 50}>
        {stage.name}
      </text>
    </g>
  );
}

// ─── Hub ───────────────────────────────────────────────────────────────────
function Hub({
  label,
  arcRef,
  arcColor
}: {
  label: string;
  arcRef: React.RefObject<SVGCircleElement | null>;
  arcColor: string;
}) {
  const lines = label.split(/\s+/).filter(Boolean);
  const lineHeight = 16;
  const startY = HUB_Y + 5 - ((lines.length - 1) * lineHeight) / 2;
  return (
    <g>
      <circle
        cx={HUB_X}
        cy={HUB_Y}
        r={ARC_R}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        opacity="0.35"
      />
      {/* Progress through one lap of the cycle; starts at 12 o'clock. */}
      <circle
        ref={arcRef}
        cx={HUB_X}
        cy={HUB_Y}
        r={ARC_R}
        fill="none"
        stroke={arcColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={ARC_LEN}
        strokeDashoffset={ARC_LEN}
        transform={`rotate(-90 ${HUB_X} ${HUB_Y})`}
        style={{ transition: "stroke 0.4s ease" }}
      />
      <circle cx={HUB_X} cy={HUB_Y} r={62} fill="#fff" stroke="#070707" strokeWidth="1.5" />
      <circle
        cx={HUB_X}
        cy={HUB_Y}
        r={54}
        fill="#FBFDFF"
        stroke="#070707"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <text className="cycle-hub-text" x={HUB_X}>
        {lines.map((line, i) => (
          <tspan key={i} x={HUB_X} y={startY + i * lineHeight}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function CrmCycle({ stages, hub, className }: CrmCycleProps) {
  const rawId = useId().replace(/[^a-z0-9]/gi, "");
  const iconArrow = `cycle-icon-arrow-${rawId}`;
  const edgeArrow = `cycle-edge-arrow-${rawId}`;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const arcRef = useRef<SVGCircleElement | null>(null);
  const tokenRef = useRef<SVGCircleElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const hovering = useRef(false);
  const onScreen = useRef(false);
  const userPausedRef = useRef(false);

  const total = stages.length;

  // Stages on the circle: first at the top, then clockwise.
  const positioned: PositionedStage[] = stages.map((s, i) => {
    const angle = ((-90 + (360 / total) * i) * Math.PI) / 180;
    return {
      ...s,
      index: i,
      cx: Math.round(HUB_X + RADIUS * Math.cos(angle)),
      cy: Math.round(HUB_Y + RADIUS * Math.sin(angle))
    };
  });

  // Every stage feeds the next; after the last one the record starts over.
  const edges = positioned.slice(0, -1).map((s, i) => edgeBetween(s, positioned[i + 1]));

  // Play only when nothing is holding the timeline back.
  const syncPlayback = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (hovering.current || !onScreen.current || userPausedRef.current) tl.pause();
    else tl.play();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Entrance + the travelling record.
  useEffect(() => {
    const svg = svgRef.current;
    const token = tokenRef.current;
    const arc = arcRef.current;
    if (!svg || !token || !arc) return;

    const stageEls = svg.querySelectorAll<SVGGElement>(".cycle-stage");
    const pathEls = Array.from(svg.querySelectorAll<SVGPathElement>(".cycle-connection"));

    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.from(stageEls, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.11,
          ease: "back.out(1.5)"
        });
        gsap.from(pathEls, { opacity: 0, duration: 0.6, stagger: 0.08, delay: 0.2 });
      }

      if (reducedMotion) {
        gsap.set(token, { opacity: 0 });
        return;
      }

      const place = (path: SVGPathElement, t: number) => {
        const pt = path.getPointAtLength(t * path.getTotalLength());
        token.setAttribute("cx", String(pt.x));
        token.setAttribute("cy", String(pt.y));
      };

      const tl = gsap.timeline({
        repeat: -1,
        paused: true,
        delay: 1.4,
        onUpdate: () => {
          arc.setAttribute("stroke-dashoffset", String(ARC_LEN * (1 - tl.progress())));
        }
      });

      for (let i = 0; i < total; i++) {
        tl.addLabel(`s${i}`);
        tl.call(() => setActive(i));
        tl.set(token, { opacity: 0 });
        tl.to({}, { duration: HOLD });
        const path = pathEls[i];
        // The last stage has no outgoing edge: hold, then the timeline repeats.
        if (!path) continue;
        tl.call(() => place(path, 0));
        tl.to(token, { opacity: 1, duration: FADE });
        const proxy = { t: 0 };
        tl.to(proxy, {
          t: 1,
          duration: MOVE,
          ease: "power1.inOut",
          onUpdate: () => place(path, proxy.t)
        });
        tl.to(token, { opacity: 0, duration: FADE });
      }

      tlRef.current = tl;

      const io = new IntersectionObserver(
        ([entry]) => {
          onScreen.current = entry.isIntersecting;
          syncPlayback();
        },
        { threshold: 0.25 }
      );
      if (rootRef.current) io.observe(rootRef.current);
      return () => io.disconnect();
    }, svg);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, [total, reducedMotion, syncPlayback]);

  // Lift the active coin; settle the rest.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.querySelectorAll<SVGGElement>(".cycle-stage").forEach((el) => {
      const on = Number(el.dataset.index) === active;
      const coin = el.querySelector(".cycle-coin");
      if (!coin) return;
      if (reducedMotion) gsap.set(coin, { y: on ? -LIFT : 0 });
      else
        gsap.to(coin, {
          y: on ? -LIFT : 0,
          duration: on ? 0.35 : 0.5,
          ease: on ? "power2.out" : "elastic.out(1, 0.5)"
        });
    });
    // Without the timeline (reduced motion), the arc still shows the step.
    if (reducedMotion && arcRef.current) {
      arcRef.current.setAttribute(
        "stroke-dashoffset",
        String(ARC_LEN * (1 - (active + 1) / total))
      );
    }
  }, [active, reducedMotion, total]);

  const select = useCallback(
    (i: number) => {
      const next = ((i % total) + total) % total;
      setActive(next);
      const tl = tlRef.current;
      if (tl) {
        // seek() skips callbacks, so the state is set above.
        tl.seek(`s${next}`);
        if (tokenRef.current) gsap.set(tokenRef.current, { opacity: 0 });
        syncPlayback();
      }
    },
    [total, syncPlayback]
  );

  const togglePause = () => {
    userPausedRef.current = !userPausedRef.current;
    setUserPaused(userPausedRef.current);
    syncPlayback();
  };

  const setHovering = (over: boolean) => {
    hovering.current = over;
    syncPlayback();
  };

  const onCoinHover = (i: number, over: boolean) => {
    if (i === active || reducedMotion) return;
    const coin = svgRef.current?.querySelector(`.cycle-stage[data-index="${i}"] .cycle-coin`);
    if (!coin) return;
    gsap.to(coin, over ? { y: -8, duration: 0.25 } : { y: 0, duration: 0.4 });
  };

  const current = stages[active];

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]",
        className
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground block h-auto w-full overflow-visible"
        role="group"
        aria-label={`${hub} workflow: ${stages.map((s) => s.title).join(", then ")}`}
      >
        <defs>
          <marker
            id={iconArrow}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#070707" />
          </marker>
          <marker
            id={edgeArrow}
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="currentColor" opacity="0.6" />
          </marker>
        </defs>

        <Hub label={hub} arcRef={arcRef} arcColor={current?.right ?? "#4188FF"} />

        {/* Spokes from hub to each stage */}
        {positioned.map((n) => (
          <line
            key={`spoke-${n.id}`}
            x1={HUB_X}
            y1={HUB_Y}
            x2={n.cx}
            y2={n.cy + NODE_H * 0.5}
            stroke="currentColor"
            strokeWidth={n.index === active ? 1.8 : 1.2}
            strokeDasharray="4 6"
            opacity={n.index === active ? 0.6 : 0.22}
            style={{ transition: "opacity 0.3s ease" }}
          />
        ))}

        {/* The cycle: stage → next stage, last → first */}
        {edges.map((e, i) => (
          <path
            key={`edge-${i}`}
            className={cn("cycle-connection", !reducedMotion && "is-flowing")}
            d={e}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            fill="none"
            opacity="0.5"
            markerEnd={`url(#${edgeArrow})`}
          />
        ))}

        {/* Coins, z-sorted so lower-right paints on top */}
        {positioned
          .map((n) => ({ n, key: n.cy + n.cx * 0.3 }))
          .sort((a, b) => a.key - b.key)
          .map(({ n }) => (
            <Coin
              key={n.id}
              stage={n}
              total={total}
              active={n.index === active}
              arrowMarker={iconArrow}
              onSelect={select}
              onHover={onCoinHover}
            />
          ))}

        {/* The record travelling through the steps */}
        <circle
          ref={tokenRef}
          r="7"
          cx="-20"
          cy="-20"
          fill="#4188FF"
          stroke="#fff"
          strokeWidth="2"
          opacity="0"
          style={{ filter: "drop-shadow(0 0 8px rgba(65, 136, 255, 0.6))" }}
        />
      </svg>

      {/* ── Step panel ── */}
      {current ? (
        <div className="bg-background/80 rounded-2xl border p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="flex items-center gap-4">
            <span
              className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-black/80 text-base font-bold text-black shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${current.top}, ${current.left} 55%, ${current.right})`
              }}
            >
              {pad(active + 1)}
            </span>
            <div>
              <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                Step {pad(active + 1)} of {pad(total)}
              </p>
              <h3 className="flex flex-wrap items-center gap-2 text-xl font-bold tracking-tight">
                {current.title}
                {current.optional ? (
                  <span className="text-muted-foreground rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase">
                    Optional
                  </span>
                ) : null}
              </h3>
            </div>
          </div>

          <p className="text-muted-foreground mt-5 min-h-[4.5rem] text-sm leading-relaxed sm:text-base">
            {current.summary}
          </p>

          <ul className="mt-4 flex flex-col gap-2">
            {current.points.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium">
                <span
                  className="size-2.5 shrink-0 rounded-full border border-black/70"
                  style={{ backgroundColor: current.right }}
                />
                {point}
              </li>
            ))}
          </ul>

          {/* Step rail — one segment per stage, the active one filled. */}
          <div className="mt-6 flex gap-1.5" role="tablist" aria-label="Workflow steps">
            {stages.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Step ${i + 1}: ${s.title}`}
                onClick={() => select(i)}
                className="group h-6 flex-1 cursor-pointer"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    i === active ? "" : "bg-border group-hover:bg-muted-foreground/40"
                  )}
                  style={i === active ? { backgroundColor: s.right } : undefined}
                />
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-muted-foreground text-xs">
              {active === total - 1 ? "Last step" : `Next: ${stages[active + 1].title}`}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => select(active - 1)}
                aria-label="Previous step"
                className="hover:bg-muted flex size-8 cursor-pointer items-center justify-center rounded-full border transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>
              {!reducedMotion ? (
                <button
                  type="button"
                  onClick={togglePause}
                  aria-label={userPaused ? "Play the cycle" : "Pause the cycle"}
                  className="hover:bg-muted flex size-8 cursor-pointer items-center justify-center rounded-full border transition-colors"
                >
                  {userPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => select(active + 1)}
                aria-label="Next step"
                className="hover:bg-muted flex size-8 cursor-pointer items-center justify-center rounded-full border transition-colors"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Global so the keyframes name isn't scoped; every class is cycle-prefixed. */}
      <style jsx global>{`
        .cycle-stage {
          cursor: pointer;
          outline: none;
        }
        .cycle-stage:focus-visible .cycle-label {
          text-decoration: underline;
        }
        .cycle-coin {
          transform-box: fill-box;
        }
        .cycle-shadow {
          fill: currentColor;
          opacity: 0.07;
        }
        .cycle-glow {
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .cycle-stage.is-active .cycle-glow {
          opacity: 0.45;
        }
        .cycle-label {
          font-size: 16px;
          font-weight: 700;
          fill: currentColor;
          text-anchor: middle;
          user-select: none;
        }
        .cycle-meta {
          font-size: 10px;
          font-weight: 700;
          fill: currentColor;
          opacity: 0.55;
          text-anchor: middle;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          user-select: none;
        }
        .cycle-stage.is-active .cycle-meta {
          opacity: 0.9;
        }
        .cycle-hub-text {
          font-size: 13px;
          font-weight: 800;
          fill: #070707;
          text-anchor: middle;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          user-select: none;
        }
        .cycle-connection.is-flowing {
          animation: cycle-march 1.2s linear infinite;
        }
        @keyframes cycle-march {
          to {
            stroke-dashoffset: -24;
          }
        }
      `}</style>
    </div>
  );
}
