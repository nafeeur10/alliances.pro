"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import type { CrmCycleStage } from "@/@data/features";

const CrmCycle = dynamic(() => import("./crm-cycle"), { ssr: false });

interface Props {
  stages: CrmCycleStage[];
  hub: string;
}

/**
 * The diagram is the page's largest interactive island: hydrating its SVG on
 * load cost ~19% of the homepage's total blocking time, for something that
 * sits well below the fold. This renders the steps as plain cards on the
 * server (so the copy is still in the HTML) and swaps in the real diagram
 * when it comes within range. The min-height matches the diagram, so the
 * swap doesn't move the page.
 */
export function CrmCycleLazy({ stages, hub }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "500px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[760px] lg:min-h-[680px]">
      {show ? (
        <CrmCycle stages={stages} hub={hub} />
      ) : (
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage, i) => (
            <li key={stage.id} className="bg-background/60 rounded-2xl border p-5">
              <span
                className="mb-3 flex size-10 items-center justify-center rounded-xl border border-black/80 text-sm font-bold text-black"
                style={{
                  background: `linear-gradient(135deg, ${stage.top}, ${stage.left} 55%, ${stage.right})`
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold">{stage.title}</h3>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {stage.summary}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
