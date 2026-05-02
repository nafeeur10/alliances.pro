import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { blogSection, featuredBlogPosts } from "@/@data/blog";
import SectionContainer from "@/components/layout/section-container";
import SectionHeader from "@/components/layout/section-header";
import { Badge } from "@/components/ui/badge";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export const BlogSection = () => {
  return (
    <SectionContainer id="blog">
      <SectionHeader
        subTitle={blogSection.eyebrow}
        title={blogSection.headline}
        description={blogSection.description}
      />

      <div className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredBlogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-background/60 hover:border-primary/40 overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <figure className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
            </figure>
            <div className="space-y-3 p-6">
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <Badge variant="secondary" className="text-xs font-medium">
                  {post.category}
                </Badge>
                <span aria-hidden>·</span>
                <span>{formatDate(post.date)}</span>
                <span aria-hidden>·</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-foreground text-lg font-semibold tracking-tight sm:text-xl">
                {post.title}
              </h3>
              <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                {post.excerpt}
              </p>
              <div className="text-primary flex items-center gap-1.5 pt-1 text-sm font-medium transition-transform duration-300 group-hover:translate-x-1">
                <span>Read article</span>
                <ArrowUpRight className="size-4" />
              </div>
            </div>
          </Link>
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
