"use client";

import { useEffect } from "react";

interface Props {
  gaMeasurementId?: string;
  crispWebsiteId?: string;
}

const EVENTS = ["pointerdown", "keydown", "scroll", "touchstart", "mousemove"] as const;

function addScript(src: string) {
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
}

/**
 * Loads Google Analytics and Crisp on the visitor's first interaction instead
 * of on page load. Together they blocked the main thread for ~400 ms before
 * anyone could use the page. Plausible still loads up front, so every
 * pageview is counted even when GA never loads.
 */
export function DeferredThirdParties({ gaMeasurementId, crispWebsiteId }: Props) {
  useEffect(() => {
    if (!gaMeasurementId && !crispWebsiteId) return;

    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      EVENTS.forEach((e) => window.removeEventListener(e, load));

      if (gaMeasurementId) {
        const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
        w.dataLayer = w.dataLayer || [];
        w.gtag = function gtag() {
          // gtag.js expects the arguments object itself, not an array.
          // eslint-disable-next-line prefer-rest-params
          w.dataLayer.push(arguments);
        };
        w.gtag("js", new Date());
        w.gtag("config", gaMeasurementId, { anonymize_ip: true });
        addScript(`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`);
      }

      if (crispWebsiteId) {
        const w = window as unknown as { $crisp: unknown[]; CRISP_WEBSITE_ID: string };
        w.$crisp = [];
        w.CRISP_WEBSITE_ID = crispWebsiteId;
        addScript("https://client.crisp.chat/l.js");
      }
    };

    EVENTS.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    return () => EVENTS.forEach((e) => window.removeEventListener(e, load));
  }, [gaMeasurementId, crispWebsiteId]);

  return null;
}
