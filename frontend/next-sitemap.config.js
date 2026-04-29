/** @type {import('next-sitemap').IConfig} */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://alliances.pro").replace(/\/$/, "");

const API_BASE = (
  process.env.MARKETING_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  `${SITE_URL}/api/v1/marketing`
).replace(/\/$/, "");

/**
 * Map a path to (priority, changefreq) — fall back to 0.7 / weekly.
 * @param {string} path
 */
function priorityFor(path) {
  if (path === "/") return { priority: 1.0, changefreq: "daily" };
  if (path.startsWith("/features")) return { priority: 0.9, changefreq: "weekly" };
  if (path.startsWith("/industries")) return { priority: 0.9, changefreq: "weekly" };
  if (path.startsWith("/compare")) return { priority: 0.8, changefreq: "weekly" };
  if (path.startsWith("/blog")) return { priority: 0.7, changefreq: "weekly" };
  if (path === "/pricing") return { priority: 0.95, changefreq: "weekly" };
  return { priority: 0.7, changefreq: "weekly" };
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/admin",
    "/admin/*",
    "/api",
    "/api/*",
    "/preview",
    "/preview/*",
    "/legal/*-draft",
    "/server-sitemap.xml"
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/admin" },
      { userAgent: "*", disallow: "/api" },
      { userAgent: "*", disallow: "/preview" }
    ]
  },

  /**
   * Pull dynamic URLs from the marketing API at build time.
   * If the API is unreachable (e.g. offline build), we still ship a
   * sitemap with the statically-discovered routes.
   */
  async additionalPaths(config) {
    try {
      const res = await fetch(`${API_BASE}/sitemap`, {
        headers: { Accept: "application/json" }
      });
      if (!res.ok) {
        console.warn(`[next-sitemap] /sitemap returned ${res.status}; skipping additional paths.`);
        return [];
      }
      const json = await res.json();
      const items = Array.isArray(json?.data) ? json.data : [];
      return items.map((item) => {
        const path = item.path || "/";
        const meta = priorityFor(path);
        return {
          loc: path,
          lastmod: item.updated_at ?? new Date().toISOString(),
          changefreq: meta.changefreq,
          priority: meta.priority
        };
      });
    } catch (err) {
      console.warn(`[next-sitemap] failed to fetch ${API_BASE}/sitemap: ${err?.message || err}`);
      return [];
    }
  },

  transform: async (_config, path) => {
    const meta = priorityFor(path);
    return {
      loc: path,
      changefreq: meta.changefreq,
      priority: meta.priority,
      lastmod: new Date().toISOString()
    };
  }
};
