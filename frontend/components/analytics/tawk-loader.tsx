"use client";

import { useEffect } from "react";

/**
 * Loads the Tawk.to live-chat widget on idle so it never blocks first paint.
 *
 * Set NEXT_PUBLIC_TAWK_PROPERTY_ID and NEXT_PUBLIC_TAWK_WIDGET_ID in env to
 * enable. Without both, the widget is skipped — useful for local dev where
 * you don't want a chat bubble.
 *
 * The Tawk dashboard owns: agent name, photo, welcome message, online hours,
 * and the iOS / Android push targets. Nothing on this side needs to change
 * when those are updated.
 */

const PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? "default";

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

export function TawkLoader() {
  useEffect(() => {
    if (!PROPERTY_ID) return;
    if (document.getElementById("tawk-script")) return;

    const load = () => {
      if (document.getElementById("tawk-script")) return;
      window.Tawk_API = window.Tawk_API ?? {};
      window.Tawk_LoadStart = new Date();

      const script = document.createElement("script");
      script.id = "tawk-script";
      script.async = true;
      script.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.head.appendChild(script);
    };

    // Defer until the browser is idle so the widget never drags first paint.
    if ("requestIdleCallback" in window) {
      const handle = (
        window as typeof window & {
          requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback(load, { timeout: 3000 });
      return () => {
        if (
          "cancelIdleCallback" in window &&
          typeof (window as typeof window & { cancelIdleCallback?: (h: number) => void })
            .cancelIdleCallback === "function"
        ) {
          (
            window as typeof window & { cancelIdleCallback: (h: number) => void }
          ).cancelIdleCallback(handle);
        }
      };
    }

    const timer = window.setTimeout(load, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
