/**
 * Plausible analytics — privacy-friendly, no cookies, no banner needed.
 * Setup lives in app/layout.tsx via next/script.
 *
 * trackEvent() is a no-op if window.plausible isn't ready yet (e.g. on
 * the very first paint, or if the script is blocked by an ad-blocker).
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
  }
}

export function trackEvent(name: AnalyticsEvent, props?: AnalyticsProps): void {
  if (typeof window === "undefined") return;
  if (typeof window.plausible !== "function") return;
  // Filter out undefined values — Plausible rejects them.
  const cleanProps =
    props !== undefined
      ? (Object.fromEntries(
          Object.entries(props).filter(([, v]) => v !== undefined)
        ) as AnalyticsProps)
      : undefined;
  window.plausible(name, cleanProps ? { props: cleanProps } : undefined);
}
