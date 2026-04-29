import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionShell } from "@/components/marketing/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleSchema } from "@/components/seo/json-ld";
import { getBlogPost, listBlogPosts } from "@/lib/api";
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen">
      <SectionShell as="section" className="pt-32 pb-12">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Blog", url: "/blog" },
              { name: post.title, url: `/blog/${post.slug}` }
            ]}
            className="mb-8"
          />
          <div className="mb-8 flex flex-wrap items-center gap-2">
            {post.category && <Badge variant="outline">{post.category}</Badge>}
            {post.reading_minutes > 0 && (
              <span className="text-muted-foreground text-xs">{post.reading_minutes} min read</span>
            )}
            {post.published_at && (
              <span className="text-muted-foreground text-xs">
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
          {post.excerpt && <p className="text-muted-foreground mt-4 text-xl">{post.excerpt}</p>}
          {post.author_name && (
            <p className="text-muted-foreground mt-6 text-sm">By {post.author_name}</p>
          )}
        </div>
      </SectionShell>

      <SectionShell as="section" className="pt-0">
        <div className="prose prose-slate dark:prose-invert mx-auto max-w-3xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>
      </SectionShell>

      <SectionShell heading="Ready to put it into practice?" className="pb-32">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="https://app.alliances.pro/signup">Start 14-day free trial</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/blog">More posts →</Link>
          </Button>
        </div>
      </SectionShell>

      <ArticleSchema
        headline={post.title}
        description={post.excerpt ?? post.title}
        url={`/blog/${post.slug}`}
        image={post.cover_image ?? `/api/og?title=${encodeURIComponent(post.title)}`}
        authorName={post.author_name ?? "Alliances PRO"}
        datePublished={post.published_at ?? new Date().toISOString()}
      />
    </main>
  );
}
