"use client";

/**
 * HexRing — animated isometric hub-and-spokes diagram.
 *
 *   <HexRing />                                    // defaults
 *   <HexRing hub={{ label: "My CRM" }} />          // custom hub label
 *   <HexRing stages={[...]} hub={{...}} />         // fully custom
 */

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";

// ─── Geometry ──────────────────────────────────────────────────────────────
const NODE_W = 88;
const NODE_H = 44;
const NODE_DEPTH = 60;
const SVG_W = 980;
const SVG_H = 880;
const HUB_X = 490;
const HUB_Y = 440;
const RADIUS = 280;

// ─── Types ─────────────────────────────────────────────────────────────────
export type HexIcon = "folder" | "building" | "user" | "funnel" | "dollar" | "chart";

export interface HexStage {
  id: string;
  name: string;
  meta: string;
  icon: HexIcon;
  top: string;
  left: string;
  right: string;
}

export interface HexHub {
  label: string;
}

interface PositionedStage extends HexStage {
  cx: number;
  cy: number;
}

interface HexRingProps {
  stages?: HexStage[];
  hub?: HexHub;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Default content ───────────────────────────────────────────────────────
export const DEFAULT_STAGES: HexStage[] = [
  {
    id: "project",
    name: "Project",
    meta: "Step 01",
    icon: "folder",
    top: "#D4F3BE",
    left: "#A8DC7C",
    right: "#7BC158"
  },
  {
    id: "organisation",
    name: "Organisation",
    meta: "Step 02",
    icon: "building",
    top: "#D1E2FF",
    left: "#9EC3FF",
    right: "#6F9BFF"
  },
  {
    id: "lead",
    name: "Lead",
    meta: "Step 03",
    icon: "user",
    top: "#DAD2FF",
    left: "#A293F3",
    right: "#7B68EE"
  },
  {
    id: "pipeline",
    name: "Pipeline",
    meta: "Step 04",
    icon: "funnel",
    top: "#FFE5C0",
    left: "#FFC97A",
    right: "#FFAE3D"
  },
  {
    id: "deal",
    name: "Deal",
    meta: "Step 05",
    icon: "dollar",
    top: "#FFD0E0",
    left: "#FF9CC0",
    right: "#FF6BA0"
  },
  {
    id: "sales",
    name: "Sales",
    meta: "Step 06",
    icon: "chart",
    top: "#C0F0E0",
    left: "#7BD9B5",
    right: "#3AC78F"
  }
];

const DEFAULT_HUB: HexHub = { label: "Alliances PRO" };

// ─── Helpers ───────────────────────────────────────────────────────────────
function bezierBetween(a: PositionedStage, b: PositionedStage): string {
  const ax = a.cx;
  const ay = a.cy + NODE_H * 0.55;
  const bx = b.cx;
  const by = b.cy + NODE_H * 0.55;
  const dx = bx - ax;
  const dy = by - ay;
  const horizontal = Math.abs(dx) > Math.abs(dy);
  if (horizontal) {
    const sx = ax + Math.sign(dx) * NODE_W * 0.5;
    const ex = bx - Math.sign(dx) * NODE_W * 0.5;
    const mx = (sx + ex) / 2;
    return `M ${sx} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${ex} ${by}`;
  }
  const sy = ay + Math.sign(dy) * NODE_H * 0.6;
  const ey = by - Math.sign(dy) * NODE_H * 0.6;
  const my = (sy + ey) / 2;
  return `M ${ax} ${sy} C ${ax} ${my}, ${bx} ${my}, ${bx} ${ey}`;
}

// ─── Icon library (flat 2D, drawn on the diamond lid) ──────────────────────
function Icon({
  kind,
  cx,
  cy,
  arrowMarker
}: {
  kind: HexIcon;
  cx: number;
  cy: number;
  arrowMarker: string;
}) {
  switch (kind) {
    case "folder":
      return (
        <g>
          <path
            d={`M ${cx - 19} ${cy - 6} L ${cx - 6} ${cy - 6} L ${cx - 3} ${cy - 3} L ${cx + 19} ${cy - 3} L ${cx + 19} ${cy + 12} L ${cx - 19} ${cy + 12} Z`}
            fill="#fff"
            stroke="#070707"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <line
            x1={cx - 15}
            y1={cy + 4}
            x2={cx + 15}
            y2={cy + 4}
            stroke="#070707"
            strokeWidth="1"
          />
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

    case "user":
      return (
        <g>
          <circle cx={cx} cy={cy - 4} r={6} fill="#fff" stroke="#070707" strokeWidth="1.4" />
          <path
            d={`M ${cx - 12} ${cy + 13} a 12 9 0 0 1 24 0`}
            fill="#fff"
            stroke="#070707"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </g>
      );

    case "funnel":
      return (
        <g>
          <path
            d={`M ${cx - 16} ${cy - 9} L ${cx + 16} ${cy - 9} L ${cx + 5} ${cy + 1} L ${cx + 5} ${cy + 12} L ${cx - 5} ${cy + 12} L ${cx - 5} ${cy + 1} Z`}
            fill="#fff"
            stroke="#070707"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <line
            x1={cx - 13}
            y1={cy - 4}
            x2={cx + 13}
            y2={cy - 4}
            stroke="#070707"
            strokeWidth="1"
          />
        </g>
      );

    case "dollar":
      return (
        <g>
          <circle cx={cx} cy={cy + 1} r={13} fill="#fff" stroke="#070707" strokeWidth="1.4" />
          <text
            x={cx}
            y={cy + 7}
            fontSize="18"
            fontWeight="800"
            fontFamily="system-ui, sans-serif"
            textAnchor="middle"
            fill="#070707"
          >
            $
          </text>
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

// ─── Single isometric "coin" node ──────────────────────────────────────────
function Node({ stage, arrowMarker }: { stage: PositionedStage; arrowMarker: string }) {
  const { cx, cy } = stage;
  const w = NODE_W;
  const h = NODE_H;
  const d = NODE_DEPTH;

  const TN: [number, number] = [cx, cy - h];
  const TE: [number, number] = [cx + w, cy];
  const TS: [number, number] = [cx, cy + h];
  const TW: [number, number] = [cx - w, cy];
  const BE: [number, number] = [cx + w, cy + d];
  const BS: [number, number] = [cx, cy + h + d];
  const BW: [number, number] = [cx - w, cy + d];

  const pts = (...arr: Array<[number, number]>) => arr.map((p) => p.join(",")).join(" ");

  return (
    <g className="hex-stage" data-stage={stage.id}>
      <ellipse cx={cx} cy={cy + h + d + 8} rx={w * 0.95} ry={h * 0.4} className="hex-shadow" />
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
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <Icon kind={stage.icon} cx={cx} cy={cy - 1} arrowMarker={arrowMarker} />
      <text className="hex-meta" x={cx} y={cy + h + d + 30}>
        {stage.meta}
      </text>
      <text className="hex-label" x={cx} y={cy + h + d + 50}>
        {stage.name}
      </text>
    </g>
  );
}

// ─── Multi-line hub label centered in the circle ───────────────────────────
function HubLabel({ x, y, label }: { x: number; y: number; label: string }) {
  const lines = String(label).split(/\s+/).filter(Boolean);
  const lineHeight = 16;
  const startY = y + 5 - ((lines.length - 1) * lineHeight) / 2;
  return (
    <text className="hex-hub-text" x={x}>
      {lines.map((line, i) => (
        <tspan key={i} x={x} y={startY + i * lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function HexRing({
  stages = DEFAULT_STAGES,
  hub = DEFAULT_HUB,
  className,
  style
}: HexRingProps) {
  const rawId = useId();
  const arrowMarker = `hex-arrow-${rawId.replace(/[^a-z0-9]/gi, "")}`;
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Position each stage on the circle (top first, then clockwise)
  const positionedStages: PositionedStage[] = stages.map((s, i) => {
    const angle = ((-90 + (360 / stages.length) * i) * Math.PI) / 180;
    return {
      ...s,
      cx: Math.round(HUB_X + RADIUS * Math.cos(angle)),
      cy: Math.round(HUB_Y + RADIUS * Math.sin(angle))
    };
  });

  // Sequential connections N-1 → N (no closing edge — adds visual flow direction)
  const edges: Array<[number, number]> = positionedStages.slice(0, -1).map((_, i) => [i, i + 1]);

  // GSAP animations (client-only, cleaned up on unmount)
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const stageEls = svg.querySelectorAll<SVGGElement>(".hex-stage");
    const pathEls = svg.querySelectorAll<SVGPathElement>(".hex-connection");
    const dotEls = svg.querySelectorAll<SVGCircleElement>(".hex-flow-dot");

    const tweens: gsap.core.Tween[] = [];

    tweens.push(
      gsap.from(stageEls, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.11,
        ease: "back.out(1.5)"
      })
    );

    tweens.push(
      gsap.from(pathEls, {
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.2,
        ease: "power2.out"
      })
    );

    pathEls.forEach((path, i) => {
      const dot = dotEls[i];
      if (!dot) return;
      const len = path.getTotalLength();
      const obj = { t: 0 };
      tweens.push(
        gsap.to(obj, {
          t: 1,
          duration: 2.4,
          ease: "power1.inOut",
          repeat: -1,
          delay: 1.0 + i * 0.32,
          onUpdate: () => {
            const pt = path.getPointAtLength(obj.t * len);
            dot.setAttribute("cx", String(pt.x));
            dot.setAttribute("cy", String(pt.y));
          }
        })
      );
    });

    type Handler = {
      el: SVGGElement;
      enter: () => void;
      leave: () => void;
      click: () => void;
    };
    const handlers: Handler[] = [];

    stageEls.forEach((s) => {
      const enter = () => {
        gsap.to(s, { y: -14, duration: 0.3, ease: "power2.out" });
      };
      const leave = () => {
        gsap.to(s, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      };
      const click = () => {
        gsap.fromTo(
          s,
          { scale: 1 },
          { scale: 1.1, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.inOut" }
        );
      };
      s.addEventListener("mouseenter", enter);
      s.addEventListener("mouseleave", leave);
      s.addEventListener("click", click);
      handlers.push({ el: s, enter, leave, click });
    });

    return () => {
      tweens.forEach((t) => t.kill());
      handlers.forEach(({ el, enter, leave, click }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.removeEventListener("click", click);
      });
    };
  }, [stages, hub.label]);

  return (
    <div className={className} style={style}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
      >
        <defs>
          <marker
            id={arrowMarker}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#070707" />
          </marker>
        </defs>

        {/* Hub */}
        <circle
          cx={HUB_X}
          cy={HUB_Y}
          r={82}
          fill="none"
          stroke="#14181e"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          opacity="0.45"
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
        <HubLabel x={HUB_X} y={HUB_Y} label={hub.label} />

        {/* Spokes from hub to each node */}
        {positionedStages.map((n, i) => (
          <line
            key={`spoke-${i}`}
            x1={HUB_X}
            y1={HUB_Y}
            x2={n.cx}
            y2={n.cy + NODE_H * 0.5}
            stroke="#14181e"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.35"
          />
        ))}

        {/* Sequential connections around the ring */}
        {edges.map(([i, j], idx) => (
          <path
            key={`conn-${idx}`}
            className="hex-connection"
            d={bezierBetween(positionedStages[i], positionedStages[j])}
            stroke="#14181e"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            fill="none"
            opacity="0.5"
          />
        ))}

        {/* Nodes (z-sorted so lower-right paints on top) */}
        {positionedStages
          .map((n, i) => ({ n, i, key: n.cy + n.cx * 0.3 }))
          .sort((a, b) => a.key - b.key)
          .map(({ n, i }) => (
            <Node key={n.id ?? i} stage={n} arrowMarker={arrowMarker} />
          ))}

        {/* Flow dots */}
        {edges.map((_, i) => (
          <circle
            key={`dot-${i}`}
            className="hex-flow-dot"
            r="5"
            cx="-20"
            cy="-20"
            fill="#4188FF"
            style={{ filter: "drop-shadow(0 0 7px rgba(65, 136, 255, 0.55))" }}
          />
        ))}
      </svg>

      <style jsx>{`
        :global(.hex-stage) {
          cursor: pointer;
          transform-box: fill-box;
          transform-origin: center;
        }
        :global(.hex-shadow) {
          fill: #14181e;
          opacity: 0.07;
        }
        :global(.hex-label) {
          font-size: 16px;
          font-weight: 700;
          fill: #070707;
          text-anchor: middle;
          user-select: none;
        }
        :global(.hex-meta) {
          font-size: 10px;
          font-weight: 700;
          fill: #677381;
          text-anchor: middle;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          user-select: none;
        }
        :global(.hex-hub-text) {
          font-size: 13px;
          font-weight: 800;
          fill: #070707;
          text-anchor: middle;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          user-select: none;
        }
      `}</style>
    </div>
  );
}
