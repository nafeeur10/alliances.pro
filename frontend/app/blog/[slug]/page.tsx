import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock } from "lucide-react";

import { FooterSection } from "@/components/layout/sections/footer";
import { BlogPostCard } from "@/components/marketing/blog-post-card";
import { BlogTableOfContents } from "@/components/marketing/blog-table-of-contents";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArticleSchema } from "@/components/seo/json-ld";
import { getBlogPost, listBlogPosts } from "@/lib/api";
import { authorInitials } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const index = await listBlogPosts(1, 50);
  if (!index) return [];
  return index.items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) {
    return buildMetadata({
      title: "Post not found",
      description: "We couldn't find that blog post.",
      path: `/blog/${slug}`,
      noIndex: true
    });
  }
  return buildMetadata({
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt ?? post.title,
    path: `/blog/${post.slug}`,
    type: "article",
    image: post.cover_image ?? undefined,
    publishedTime: post.published_at ?? undefined
  });
}

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const date = formatDate(post.published_at);
  const author = post.author_name ?? "Alliances PRO Team";

  const indexData = await listBlogPosts(1, 12);
  const allOthers = (indexData?.items ?? []).filter((p) => p.slug !== post.slug);
  const sameCategory = post.category ? allOthers.filter((p) => p.category === post.category) : [];
  const related = [...sameCategory, ...allOthers.filter((p) => !sameCategory.includes(p))].slice(
    0,
    3
  );

  return (
    <main className="min-h-screen">
      {/* ---------- Hero ---------- */}
      <section className="pt-28 pb-10 lg:pt-36">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
              {post.category ? (
                <Badge
                  variant="outline"
                  className="bg-background/60 rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase backdrop-blur"
                >
                  <span className="bg-primary mr-2 inline-block size-1.5 rounded-full" />
                  {post.category}
                </Badge>
              ) : null}
              {post.is_featured ? (
                <Badge variant="secondary" className="text-xs font-medium">
                  Featured
                </Badge>
              ) : null}
            </div>

            <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
              <div className="flex items-center gap-3 text-left">
                <Avatar className="size-10 border border-violet-200/70 dark:border-violet-500/30">
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
                    {authorInitials(author)}
                  </AvatarFallback>
                </Avatar>
                <div className="leading-tight">
                  <div className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
                    Author
                  </div>
                  <div className="text-foreground text-sm font-semibold">{author}</div>
                </div>
              </div>
              {date ? (
                <>
                  <span className="text-muted-foreground/50 hidden sm:inline" aria-hidden>
                    ·
                  </span>
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-emerald-200/70 bg-white text-emerald-500 shadow-sm dark:border-emerald-500/30 dark:bg-white">
                      <Calendar className="size-5" aria-hidden strokeWidth={2.25} />
                    </div>
                    <div className="leading-tight">
                      <div className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
                        Published
                      </div>
                      <div className="text-foreground text-sm font-semibold">{date}</div>
                    </div>
                  </div>
                </>
              ) : null}
              {post.reading_minutes > 0 ? (
                <>
                  <span className="text-muted-foreground/50 hidden sm:inline" aria-hidden>
                    ·
                  </span>
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-sky-200/70 bg-white text-sky-500 shadow-sm dark:border-sky-500/30 dark:bg-white">
                      <Clock className="size-5" aria-hidden strokeWidth={2.25} />
                    </div>
                    <div className="leading-tight">
                      <div className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
                        Time to read
                      </div>
                      <div className="text-foreground text-sm font-semibold">
                        {post.reading_minutes} min read
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Body ---------- */}
      <section className="pb-20">
        <div className="container">
          <div className="mx-auto grid max-w-(--breakpoint-xl) gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <BlogTableOfContents body={post.body} className="mt-0 mb-10" />
              <MarkdownArticle>{post.body}</MarkdownArticle>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start lg:[&>*+*]:mt-6">
              {/* Author card */}
              <div className="bg-background/60 rounded-2xl border p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border border-violet-200/70 dark:border-violet-500/30">
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold text-white">
                      {authorInitials(author)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="leading-tight">
                    <div className="text-foreground font-semibold">{author}</div>
                    <div className="text-muted-foreground text-xs">Author</div>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  We build Alliances PRO — a flat-rate CRM for small agencies and service teams.
                  Our writing covers pipeline, retention, and the operational reality of running a
                  service business — minus the vendor speak.
                </p>
              </div>

              {/* CTA — Ready to put it into practice */}
              <div className="bg-primary/5 border-primary/20 rounded-2xl border p-6">
                <h3 className="text-foreground text-lg font-bold tracking-tight">
                  Ready to put it into practice?
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Flat $39/mo, unlimited seats. 14-day free trial — no credit card.
                </p>
                <Button asChild size="sm" className="mt-4 w-full">
                  <Link href="https://app.alliances.pro/signup">Start 14-day free trial</Link>
                </Button>
              </div>

              {/* Inline newsletter */}
              <div className="bg-background/60 rounded-2xl border p-6 backdrop-blur-sm">
                <Badge
                  variant="outline"
                  className="bg-background/60 mb-3 rounded-full px-3 py-1 text-[10px] font-medium tracking-wider uppercase"
                >
                  <span className="bg-primary mr-2 inline-block size-1.5 rounded-full" />
                  The Playbook
                </Badge>
                <h3 className="text-foreground text-lg font-semibold tracking-tight">
                  Get the CRM playbook in your inbox
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Monthly: one practical playbook, one product update, zero fluff.
                </p>
                <form className="mt-4 flex flex-col gap-2" action="/api/newsletter" method="post">
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="bg-background"
                    aria-label="email"
                  />
                  <Button type="submit" className="w-full">
                    Subscribe
                  </Button>
                </form>
                <p className="text-muted-foreground mt-3 text-xs">No spam. Unsubscribe anytime.</p>
              </div>

              {/* Back to all posts */}
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                ← All articles
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------- Related posts ---------- */}
      {related.length > 0 ? (
        <section className="pb-20">
          <div className="container">
            <div className="mx-auto max-w-(--breakpoint-xl)">
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
                  Related posts
                </h2>
                <Link
                  href="/blog"
                  className="text-primary text-sm font-medium underline-offset-4 hover:underline"
                >
                  All articles →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <BlogPostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------- Footer ---------- */}
      <FooterSection />

      <ArticleSchema
        headline={post.title}
        description={post.excerpt ?? post.title}
        url={`/blog/${post.slug}`}
        image={post.cover_image ?? `/api/og?title=${encodeURIComponent(post.title)}`}
        authorName={author}
        datePublished={post.published_at ?? new Date().toISOString()}
      />
    </main>
  );
}
