/**
 * Analytics — events are sent to both Plausible (privacy-friendly, no
 * cookies) and Google Analytics 4. Both scripts are loaded in
 * app/layout.tsx via next/script.
 *
 * trackEvent() fires to each provider independently and is a no-op for a
 * provider whose script isn't ready yet (e.g. on the very first paint, or
 * if it's blocked by an ad-blocker) — one being blocked never stops the
 * other.
 */

export type AnalyticsEvent =
  | "signup_clicked"
  | "demo_requested"
  | "pricing_plan_clicked"
  | "contact_submitted"
  | "newsletter_subscribed"
  | "waitlist_joined"
  | "comparison_viewed"
  | "experiment_assigned"
  | "experiment_converted";

export interface AnalyticsProps {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: AnalyticsProps; callback?: () => void }
    ) => void;
    gtag?: (
      command: "event" | "config" | "js" | "set",
      targetOrEventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export function trackEvent(name: AnalyticsEvent, props?: AnalyticsProps): void {
  if (typeof window === "undefined") return;

  // Filter out undefined values — Plausible rejects them and they only add
  // noise to GA4 event parameters.
  const cleanProps =
    props !== undefined
      ? (Object.fromEntries(
          Object.entries(props).filter(([, v]) => v !== undefined)
        ) as AnalyticsProps)
      : undefined;

  // Plausible — no-op if the script isn't ready or is blocked.
  if (typeof window.plausible === "function") {
    window.plausible(name, cleanProps ? { props: cleanProps } : undefined);
  }

  // Google Analytics 4 — same graceful no-op if gtag isn't ready.
  if (typeof window.gtag === "function") {
    window.gtag("event", name, cleanProps ?? {});
  }
}
