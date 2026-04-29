import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionShell } from "@/components/marketing/section-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listBlogPosts } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Blog — Alliances PRO",
  description:
    "Practical playbooks for service businesses: pipelines, campaigns, agency ops, and how to pick the right CRM stack.",
  path: "/blog"
});

interface BlogPageProps {
  searchParams?: Promise<{ page?: string; category?: string }>;
}

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const sp = (await searchParams) ?? {};
  const currentPage = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const categoryFilter = sp.category?.trim() || null;

  const index = await listBlogPosts(currentPage, 12);
  const posts = index?.items ?? [];
  const pagination = index?.pagination ?? {
    current_page: 1,
    per_page: 12,
    total: 0,
    last_page: 1
  };

  const visiblePosts = categoryFilter
    ? posts.filter(
        (p) => (p.category ?? "Uncategorized").toLowerCase() === categoryFilter.toLowerCase()
      )
    : posts;

  // Aggregate categories from the current page (a separate /blog/categories
  // endpoint would be cleaner — punt to a follow-up).
  const categories = Array.from(new Set(posts.map((p) => p.category ?? "Uncategorized"))).sort();

  return (
    <main className="min-h-screen">
      <SectionShell as="section" className="pt-32 pb-12">
        <div className="mx-auto mb-8 max-w-5xl">
          <Breadcrumbs items={[{ name: "Blog", url: "/blog" }]} />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">The Alliances Blog</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Pipelines, campaigns, agency ops, and how to pick the right CRM stack.
          </p>
        </div>
      </SectionShell>

      <SectionShell as="section" className="pt-0">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-2 lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-foreground mb-3 text-sm font-semibold tracking-wider uppercase">
              Categories
            </h2>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/blog"
                  className={`hover:text-foreground text-sm transition-colors ${
                    !categoryFilter ? "text-foreground font-semibold" : "text-muted-foreground"
                  }`}
                >
                  All posts
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/blog?category=${encodeURIComponent(cat)}`}
                    className={`hover:text-foreground text-sm transition-colors ${
                      categoryFilter?.toLowerCase() === cat.toLowerCase()
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <div>
            {visiblePosts.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">
                No posts to show yet — check back soon.
              </p>
            ) : (
              <ul className="grid gap-6 md:grid-cols-2">
                {visiblePosts.map((post) => (
                  <li key={post.id}>
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <Card className="hover:border-primary/40 h-full transition-colors">
                        <CardHeader>
                          <div className="flex flex-wrap items-center gap-2">
                            {post.category && <Badge variant="outline">{post.category}</Badge>}
                            <span className="text-muted-foreground text-xs">
                              {post.reading_minutes ? `${post.reading_minutes} min read` : null}
                            </span>
                          </div>
                          <CardTitle className="text-xl leading-snug">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground line-clamp-3 text-sm">
                            {post.excerpt}
                          </p>
                          {post.author_name && (
                            <p className="text-muted-foreground mt-4 text-xs">
                              By {post.author_name}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {pagination.last_page > 1 && (
              <nav
                aria-label="Pagination"
                className="mt-10 flex items-center justify-between gap-3"
              >
                <Link
                  aria-disabled={pagination.current_page <= 1}
                  href={`/blog?page=${Math.max(1, pagination.current_page - 1)}${
                    categoryFilter ? `&category=${encodeURIComponent(categoryFilter)}` : ""
                  }`}
                  className={`text-sm ${
                    pagination.current_page <= 1
                      ? "text-muted-foreground/50 pointer-events-none"
                      : "text-primary"
                  }`}
                >
                  ← Previous
                </Link>
                <span className="text-muted-foreground text-sm">
                  Page {pagination.current_page} of {pagination.last_page}
                </span>
                <Link
                  aria-disabled={pagination.current_page >= pagination.last_page}
                  href={`/blog?page=${pagination.current_page + 1}${
                    categoryFilter ? `&category=${encodeURIComponent(categoryFilter)}` : ""
                  }`}
                  className={`text-sm ${
                    pagination.current_page >= pagination.last_page
                      ? "text-muted-foreground/50 pointer-events-none"
                      : "text-primary"
                  }`}
                >
                  Next →
                </Link>
              </nav>
            )}
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
