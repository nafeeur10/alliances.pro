"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

interface ComparisonViewTrackerProps {
  competitor: string;
  variant: "compare" | "alternatives";
}

/**
 * Fires a `comparison_viewed` Plausible event once per page mount. Rendered
 * inline by ComparisonTemplate — no visible UI.
 */
export function ComparisonViewTracker({ competitor, variant }: ComparisonViewTrackerProps) {
  useEffect(() => {
    trackEvent("comparison_viewed", { competitor, variant });
  }, [competitor, variant]);

  return null;
}
