/**
 * Read marketing CMS content (Filament admin → API) with safe fallbacks.
 *
 * Every helper is server-side only. Components that need this data should be
 * `async` server components, or wrap a client child by passing the data in as
 * props. Never call from the browser.
 */

import { getPage, getSettings, type MarketingPage, type PageSection } from "@/lib/api";

export type SectionMap = Record<string, PageSection>;

export async function getHomeSections(): Promise<{
  page: MarketingPage | null;
  sections: SectionMap;
}> {
  const page = await getPage("home");
  const sections: SectionMap = {};
  if (page?.sections) {
    for (const section of page.sections) {
      sections[section.key] = section;
    }
  }
  return { page, sections };
}

export interface PublicSettings {
  [key: string]: unknown;
}

export async function getPublicSettings(): Promise<PublicSettings> {
  const raw = await getSettings();
  if (!raw) return {};
  const out: PublicSettings = {};
  for (const [key, entry] of Object.entries(raw)) {
    out[key] = entry?.value;
  }
  return out;
}

export function readPayload<T = Record<string, unknown>>(
  sections: SectionMap,
  key: string
): T | null {
  const section = sections[key];
  if (!section || section.is_visible === false) return null;
  return (section.payload as T) ?? null;
}

export function pickString(
  source: Record<string, unknown> | null,
  key: string,
  fallback: string
): string {
  if (!source) return fallback;
  const value = source[key];
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

export function pickArray<T>(
  source: Record<string, unknown> | null,
  key: string,
  fallback: T[]
): T[] {
  if (!source) return fallback;
  const value = source[key];
  return Array.isArray(value) && value.length > 0 ? (value as T[]) : fallback;
}

export function pickObject<T extends Record<string, unknown>>(
  source: Record<string, unknown> | null,
  key: string,
  fallback: T
): T {
  if (!source) return fallback;
  const value = source[key];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return { ...fallback, ...(value as T) };
  }
  return fallback;
}

/**
 * Filament's FileUpload stores a path relative to the `public` disk
 * (e.g. `uploads/hero/abc.png`). Resolve it to a browser-reachable URL.
 * - empty / nullish  → returns undefined (caller decides fallback)
 * - http(s):// URL   → returned as-is
 * - leading `/`      → returned as-is (treated as a public/ path or a known route)
 * - everything else  → prefixed with `/storage/`
 */
export function resolveAssetUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;
  return `/storage/${trimmed.replace(/^\/+/, "")}`;
}
