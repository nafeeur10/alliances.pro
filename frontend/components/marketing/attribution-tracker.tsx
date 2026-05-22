"use client";

import { useEffect } from "react";

import { captureAttribution } from "@/lib/attribution";

/**
 * Persists first-touch campaign attribution (utm_* + referrer) on mount so
 * lead forms can attach it to submissions. Renders nothing.
 */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
