"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { groupHeadings, type TocHeading } from "@/lib/toc";

interface Props {
  headings: TocHeading[];
  /** Element whose scroll position drives the reading-progress bar. */
  targetId?: string;
  label?: string;
  className?: string;
}

/**
 * Left-rail content index: grouped headings, scroll-spy, and a reading-progress
 * bar. The active section is simply the last heading scrolled past — read live
 * from geometry on every frame rather than cached from IntersectionObserver,
 * because a jump-scroll (clicking an index link) never fires a crossing event.
 */
export function ContentIndex({
  headings,
  targetId = "article-body",
  label = "Contents",
  className
}: Props) {
  const groups = useMemo(() => groupHeadings(headings), [headings]);
  const flat = useMemo(() => groups.flatMap((g) => [g.heading, ...g.children]), [groups]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  // Explicit open/closed state per group. A group the reader opened by hand
  // stays open until the scroll position moves them into a different group.
  const [overrides, setOverrides] = useState<Record<number, boolean>>({});
  const lastGroup = useRef(-1);

  const activeId = flat[activeIndex]?.id;
  const currentGroup = useMemo(() => {
    const idx = groups.findIndex(
      (g) => g.heading.id === activeId || g.children.some((c) => c.id === activeId)
    );
    return idx === -1 ? 0 : idx;
  }, [groups, activeId]);

  const update = useCallback(() => {
    let next = 0;
    for (let i = 0; i < flat.length; i++) {
      const el = document.getElementById(flat[i].id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= 130) next = i;
      else break;
    }
    setActiveIndex(next);

    const article = document.getElementById(targetId);
    if (article) {
      const box = article.getBoundingClientRect();
      const span = box.height - window.innerHeight;
      const pct = span > 0 ? (-box.top / span) * 100 : box.top <= 0 ? 100 : 0;
      setProgress(Math.max(0, Math.min(100, Math.round(pct))));
    }
  }, [flat, targetId]);

  useEffect(() => {
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  // Crossing into a new group re-syncs the rail: the new group opens, the hand
  // opened ones fold back. Without this a long read ends with everything open.
  useEffect(() => {
    if (lastGroup.current === currentGroup) return;
    lastGroup.current = currentGroup;
    setOverrides({});
  }, [currentGroup]);

  if (flat.length === 0) return null;

  const isOpen = (i: number) => overrides[i] ?? i === currentGroup;

  return (
    <nav aria-labelledby="content-index-label" className={cn("min-w-0", className)}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p
          id="content-index-label"
          className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase"
        >
          {label}
        </p>
        <span className="text-muted-foreground font-mono text-[11px] tabular-nums">
          {progress}%
        </span>
      </div>

      <div
        className="bg-muted mb-4 h-1 overflow-hidden rounded-full"
        role="progressbar"
        aria-labelledby="content-index-label"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span
          className="block h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="space-y-1">
        {groups.map((group, i) => {
          const open = isOpen(i);
          const current = i === currentGroup;
          const active = group.heading.id === activeId;
          const read = flat.indexOf(group.heading) < activeIndex;

          return (
            <li key={group.heading.id}>
              <div
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors",
                  current && "bg-muted/60"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px] tabular-nums transition-colors",
                    current
                      ? "bg-gradient-to-br from-emerald-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent"
                      : "text-muted-foreground/60"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <a
                  href={`#${group.heading.id}`}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "min-w-0 flex-1 text-sm leading-snug transition-colors",
                    active
                      ? "text-primary font-semibold"
                      : read
                        ? "text-muted-foreground hover:text-foreground"
                        : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  {group.heading.text}
                </a>

                {group.children.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setOverrides((o) => ({ ...o, [i]: !open }))}
                    aria-expanded={open}
                    aria-label={`${open ? "Collapse" : "Expand"} ${group.heading.text}`}
                    className="text-muted-foreground hover:text-foreground -mr-1 flex size-6 shrink-0 items-center justify-center rounded-md transition-colors"
                  >
                    <ChevronDown
                      className={cn("size-3.5 transition-transform", open && "rotate-180")}
                      aria-hidden
                    />
                  </button>
                ) : null}
              </div>

              {group.children.length > 0 && open ? (
                <ul className="border-border mt-1 ml-[1.15rem] space-y-0.5 border-l pl-3">
                  {group.children.map((child) => {
                    const childActive = child.id === activeId;
                    return (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          aria-current={childActive ? "location" : undefined}
                          className={cn(
                            "block py-1 text-[13px] leading-snug transition-colors",
                            childActive
                              ? "text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {child.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
