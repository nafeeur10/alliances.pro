/**
 * Tiny cookie-based A/B testing harness. 50/50 assignment, persisted for
 * 30 days, reported to Plausible as `experiment_assigned` (on first
 * exposure) and `experiment_converted` (on conversion).
 *
 * Usage:
 *   const variant = useExperiment("hero_headline_variant");
 *   return variant === "B" ? <HeadlineB/> : <HeadlineA/>;
 *
 * For server-rendered pages, read the cookie via cookies() in an RSC.
 */

"use client";

import { useEffect, useState } from "react";

import { trackEvent } from "@/lib/analytics";

export type ExperimentName = "hero_headline_variant";
export type Variant = "A" | "B";

const COOKIE_PREFIX = "ap_experiment_";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const target = `${name}=`;
  const cookies = document.cookie.split(";");
  for (const raw of cookies) {
    const c = raw.trim();
    if (c.startsWith(target)) return c.slice(target.length);
  }
  return null;
}

function writeCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

function rollVariant(): Variant {
  return Math.random() < 0.5 ? "A" : "B";
}

/**
 * Hook returning the assigned variant for this user. Returns "A" on the
 * very first render (server + initial client paint) so SSR markup matches.
 * Real assignment lands on the next paint.
 */
export function useExperiment(name: ExperimentName): Variant {
  const [variant, setVariant] = useState<Variant>("A");

  useEffect(() => {
    const cookieKey = `${COOKIE_PREFIX}${name}`;
    const stored = readCookie(cookieKey);
    let assigned: Variant;
    let isNew = false;

    if (stored === "A" || stored === "B") {
      assigned = stored;
    } else {
      assigned = rollVariant();
      writeCookie(cookieKey, assigned);
      isNew = true;
    }

    setVariant(assigned);

    if (isNew) {
      trackEvent("experiment_assigned", { experiment: name, variant: assigned });
    }
  }, [name]);

  return variant;
}

/**
 * Report a conversion for the current user's assigned variant. Usually
 * called from the same page that ran useExperiment, after the user takes
 * the goal action (signup click, contact submit, etc.).
 */
export function reportConversion(name: ExperimentName, goal: string): void {
  const cookieKey = `${COOKIE_PREFIX}${name}`;
  const variant = readCookie(cookieKey);
  if (variant !== "A" && variant !== "B") return;
  trackEvent("experiment_converted", { experiment: name, variant, goal });
}
