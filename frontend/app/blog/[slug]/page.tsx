import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

import { FooterSection } from "@/components/layout/sections/footer";
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

            {post.excerpt ? (
              <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg leading-relaxed">
                {post.excerpt}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {authorInitials(author)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left leading-tight">
                  <div className="text-foreground text-sm font-semibold">{author}</div>
                  <div className="text-muted-foreground text-xs">Alliances PRO</div>
                </div>
              </div>
              <span className="bg-border h-6 w-px" aria-hidden />
              <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
                {date ? (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {date}
                  </span>
                ) : null}
                {post.reading_minutes > 0 ? (
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {post.reading_minutes} min read
                  </span>
                ) : null}
              </div>
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
                  <Avatar className="size-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {authorInitials(author)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="leading-tight">
                    <div className="text-foreground font-semibold">{author}</div>
                    <div className="text-muted-foreground text-xs">Author</div>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  Practical writing on CRM, pipelines, and service-business operations from the
                  Alliances PRO team.
                </p>
              </div>

              {/* Inline newsletter */}
              <div className="bg-primary/5 border-primary/20 rounded-2xl border p-6">
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

      {/* ---------- CTA banner ---------- */}
      <section className="pb-20">
        <div className="container">
          <div className="bg-primary/5 border-primary/20 mx-auto flex max-w-(--breakpoint-xl) flex-col items-center gap-5 rounded-3xl border p-10 text-center sm:p-14">
            <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to put it into practice?
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Flat $39/mo, unlimited seats. 14-day free trial — no credit card.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="https://app.alliances.pro/signup">Start 14-day free trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/blog" className="inline-flex items-center gap-1.5">
                  More posts
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
