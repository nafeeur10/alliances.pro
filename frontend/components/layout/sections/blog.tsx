import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { blogSection, featuredBlogPosts } from "@/@data/blog";
import SectionContainer from "@/components/layout/section-container";
import { BlogPostCard } from "@/components/marketing/blog-post-card";
import { Badge } from "@/components/ui/badge";
import { type BlogPostSummary, listBlogPosts } from "@/lib/api";

/**
 * Map the static `@data/blog.ts` fallback into the API summary shape so the
 * homepage still renders something during early dev / before the backend
 * has any published posts. The CMS is the source of truth in production.
 */
function staticFallback(): BlogPostSummary[] {
  return featuredBlogPosts.map((p, i) => ({
    id: -1 - i,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    cover_image: p.cover,
    author_name: null,
    category: p.category,
    tags: [],
    reading_minutes: parseInt(p.readTime, 10) || 0,
    is_featured: false,
    published_at: p.date,
    seo_title: null,
    seo_description: null
  }));
}

export const BlogSection = async () => {
  const index = await listBlogPosts(1, 3);
  const apiPosts = index?.items ?? [];
  const posts = apiPosts.length > 0 ? apiPosts.slice(0, 3) : staticFallback();

  return (
    <SectionContainer id="blog">
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-12">
        <Badge
          variant="outline"
          className="bg-background/60 mb-5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase backdrop-blur"
        >
          <span className="bg-primary mr-2 inline-block size-1.5 rounded-full" />
          {blogSection.eyebrow}
        </Badge>
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          {blogSection.headline}
        </h2>
        {blogSection.description ? (
          <p className="text-muted-foreground text-base md:text-lg">{blogSection.description}</p>
        ) : null}
      </div>

      <div className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          See all articles
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </SectionContainer>
  );
};
