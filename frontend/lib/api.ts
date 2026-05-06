/**
 * Tiny typed client for the marketing JSON API. All calls happen on the
 * server (RSC) and respect Next.js fetch cache + revalidation.
 *
 * Inside the docker network the API lives at http://nginx (or directly at
 * http://backend:9000 via PHP-FPM, but we always go through nginx so the
 * routing matches what the public sees). Override with INTERNAL_API_URL
 * for self-hosted setups, or set NEXT_PUBLIC_API_URL for dev when calling
 * from outside docker.
 */

const ENV_BASE =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE;

const API_BASE = (ENV_BASE || "http://nginx/api/v1/marketing").replace(/\/$/, "");

const DEFAULT_REVALIDATE = 60; // 1 minute

export interface ApiEnvelope<T> {
  data: T;
  meta?: { cached_at?: string };
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface FetchOptions {
  /** Override the default 60-second revalidation window. */
  revalidate?: number | false;
  /** Cache tags so we can invalidate from server actions later. */
  tags?: string[];
}

async function apiFetch<T>(path: string, opts: FetchOptions = {}): Promise<T | null> {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: {
        revalidate: opts.revalidate ?? DEFAULT_REVALIDATE,
        tags: opts.tags
      }
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new ApiError(res.status, `GET ${path} → ${res.status}`);
    }
    const json = (await res.json()) as ApiEnvelope<T>;
    return json.data ?? null;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    // Network errors during build / SSR — log and let the caller decide.
    console.warn(`[marketing-api] ${url} failed:`, err);
    return null;
  }
}

// ---- Domain types ----------------------------------------------------------

export interface PageSection {
  id: number;
  key: string;
  order: number;
  type: string;
  payload: Record<string, unknown> | null;
  is_visible: boolean;
}

export interface MarketingPage {
  id: number;
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  is_published: boolean;
  published_at: string | null;
  sections: PageSection[];
}

export interface PricingPlan {
  id: number;
  slug: string;
  name: string;
  monthly_price_cents: number;
  yearly_price_cents: number;
  currency: string;
  description: string | null;
  cta_label: string;
  cta_url: string | null;
  external_signup_url: string | null;
  is_featured: boolean;
  order: number;
  features: string[];
  limits: Record<string, unknown>;
  comparison_note: string | null;
}

export interface BlogPostAuthor {
  id: number;
  name: string;
}

export type BlogPostStatus = "draft" | "published" | "scheduled" | "archived";
export type BlogPostVisibility = "public" | "private" | "members";

export interface BlogPostSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  og_image?: string | null;
  author_name: string | null;
  author?: BlogPostAuthor | null;
  category: string | null;
  tags: string[];
  reading_minutes: number;
  views_count?: number;
  is_featured: boolean;
  is_pinned?: boolean;
  status?: BlogPostStatus;
  visibility?: BlogPostVisibility;
  allow_indexing?: boolean;
  show_toc?: boolean;
  allow_comments?: boolean;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  focus_keyword?: string | null;
}

export interface BlogPost extends BlogPostSummary {
  body: string;
  /** Opt-in structured content. When non-empty, frontend should render blocks
   *  instead of the markdown body. Block renderer is a follow-up task — until
   *  it lands, treat as unknown and fall through to `body`. */
  content_blocks?: unknown[] | null;
}

export interface BlogIndex {
  items: BlogPostSummary[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface BlogPageData {
  featured: BlogPostSummary | null;
  latest: BlogPostSummary[];
  case_study: BlogPostSummary[];
  marketing_tips: BlogPostSummary[];
  product_update: BlogPostSummary[];
  crm_analysis: BlogPostSummary[];
}

// ---- Endpoint helpers ------------------------------------------------------

export const getPage = (slug: string) =>
  apiFetch<MarketingPage>(`/pages/${encodeURIComponent(slug)}`, { tags: [`page:${slug}`] });

export const listPricingPlans = () =>
  apiFetch<PricingPlan[]>("/pricing-plans", { tags: ["pricing-plans"] });

export const listBlogPosts = (page = 1, perPage = 12) =>
  apiFetch<BlogIndex>(`/blog?page=${page}&per_page=${perPage}`, { tags: ["blog"] });
export const getBlogPageData = () => apiFetch<BlogPageData>("/blog/page-data", { tags: ["blog"] });
export const getBlogPost = (slug: string) =>
  apiFetch<BlogPost>(`/blog/${encodeURIComponent(slug)}`, { tags: [`blog:${slug}`] });
