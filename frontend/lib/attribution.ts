/**
 * First-touch campaign attribution.
 *
 * On a visitor's first page view we capture `utm_*` params from the URL and
 * the referring page, then persist them in localStorage. The value is
 * written once and never overwritten, so it always reflects the *original*
 * click — even if the visitor browses around before submitting a form.
 *
 * Lead forms read it back via getAttribution() and send it to POST /leads,
 * so every lead records which external site it came from.
 */

const STORAGE_KEY = "alliances.attribution";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  referrer_url?: string;
};

/** Read the stored first-touch attribution. Returns {} when none / on the server. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/**
 * Capture first-touch attribution if not already stored. Safe to call on
 * every page load — it's a no-op once a value exists.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {};

    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) data[key] = value.slice(0, 255);
    }

    // Record the referring page only when it's an external site — same-origin
    // referrers are just internal navigation and add no attribution signal.
    const referrer = document.referrer;
    if (referrer && !referrer.startsWith(window.location.origin)) {
      data.referrer_url = referrer.slice(0, 1024);
    }

    // Nothing worth attributing (direct visit) — don't write an empty record,
    // so a later visit carrying real UTM params can still be the first touch.
    if (Object.keys(data).length === 0) return;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage can throw (private mode, quota exceeded) — attribution is
    // best-effort and must never block the page.
  }
}
