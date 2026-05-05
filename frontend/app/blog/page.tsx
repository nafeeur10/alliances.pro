import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FooterSection } from "@/components/layout/sections/footer";
import { BlogCoverArt } from "@/components/marketing/blog-cover-art";
import { BlogPostCard } from "@/components/marketing/blog-post-card";
import { SectionShell } from "@/components/marketing/section-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type BlogPostSummary, getBlogPageData } from "@/lib/api";
import { authorInitials } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Blog — Alliances PRO",
  description:
    "Case studies, marketing tips, product updates, and CRM analysis for service businesses.",
  path: "/blog"
});

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function FeaturedHero({ post }: { post: BlogPostSummary }) {
  const date = formatDate(post.published_at);
  const readTime = post.reading_minutes ? `${post.reading_minutes} min read` : null;
  const author = post.author_name ?? "Alliances PRO";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-background/80 relative mx-auto flex w-full max-w-(--breakpoint-lg) flex-col overflow-hidden rounded-2xl border shadow-sm md:flex-row"
    >
      <figure className="relative shrink-0 overflow-hidden p-2.5 md:w-2/5">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <BlogCoverArt post={post} />
        </div>
      </figure>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-primary text-primary-foreground inline-block rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium tracking-wide uppercase shadow-sm">
            Featured
          </span>
          {post.category ? (
            <Badge variant="secondary" className="text-xs font-medium">
              {post.category}
            </Badge>
          ) : null}
        </div>
        <h4 className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
          {post.title}
        </h4>
        {post.excerpt ? (
          <p className="text-muted-foreground line-clamp-6 text-sm leading-relaxed sm:text-base">
            {post.excerpt}
          </p>
        ) : null}

        <div className="border-border/60 mt-auto flex items-center gap-3 border-t pt-4">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {authorInitials(post.author_name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-xs leading-tight">
            <div className="text-foreground truncate text-sm font-medium">{author}</div>
            {date || readTime ? (
              <div className="text-muted-foreground truncate">
                {date}
                {date && readTime ? <span aria-hidden> · </span> : null}
                {readTime}
              </div>
            ) : null}
          </div>
          <span className="bg-primary text-primary-foreground ml-auto inline-flex shrink-0 items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium shadow-sm">
            Learn More
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

interface CategoryRowProps {
  eyebrow: string;
  title: string;
  description?: string;
  posts: BlogPostSummary[];
}

function CategoryRow({ eyebrow, title, description, posts }: CategoryRowProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 first:mt-0">
      <div className="mx-auto mb-8 max-w-(--breakpoint-xl)">
        <Badge
          variant="outline"
          className="bg-background/60 mb-4 rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase backdrop-blur"
        >
          <span className="bg-primary mr-2 inline-block size-1.5 rounded-full" />
          {eyebrow}
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {description ? <p className="text-muted-foreground mt-2 text-base">{description}</p> : null}
      </div>
      <ul className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <BlogPostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function BlogIndexPage() {
  const data = await getBlogPageData();

  const featured = data?.featured ?? null;
  const latest = data?.latest ?? [];
  const caseStudy = data?.case_study ?? [];
  const marketingTips = data?.marketing_tips ?? [];
  const productUpdate = data?.product_update ?? [];
  const crmAnalysis = data?.crm_analysis ?? [];

  const empty =
    !featured &&
    latest.length === 0 &&
    caseStudy.length === 0 &&
    marketingTips.length === 0 &&
    productUpdate.length === 0 &&
    crmAnalysis.length === 0;

  return (
    <main className="min-h-screen">
      <SectionShell as="section" className="pt-32 pb-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">The Alliances Blog</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Case studies, marketing tips, product updates, and CRM analysis for service businesses.
          </p>
        </div>
      </SectionShell>

      <SectionShell as="section" className="pt-0 pb-24">
        {empty ? (
          <p className="text-muted-foreground py-12 text-center">
            No posts to show yet — check back soon.
          </p>
        ) : (
          <>
            {featured ? <FeaturedHero post={featured} /> : null}
            <CategoryRow eyebrow="Latest" title="Latest articles" posts={latest} />
            <CategoryRow eyebrow="Case Studies" title="Case Studies" posts={caseStudy} />
            <CategoryRow eyebrow="Marketing" title="Marketing Tips" posts={marketingTips} />
            <CategoryRow eyebrow="Product" title="Product Updates" posts={productUpdate} />
            <CategoryRow eyebrow="Analysis" title="CRM Analysis" posts={crmAnalysis} />
          </>
        )}
      </SectionShell>

      <FooterSection />
    </main>
  );
}
