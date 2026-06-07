import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BlogCoverArt } from "@/components/marketing/blog-cover-art";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { BlogPostSummary } from "@/lib/api";
import { authorInitials } from "@/lib/blog";

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

interface Props {
  post: BlogPostSummary;
}

export function BlogPostCard({ post }: Props) {
  const date = formatDate(post.published_at);
  const readTime = post.reading_minutes ? `${post.reading_minutes} min read` : null;
  const author = post.author_name ?? "Alliances PRO";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-background/60 flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-sm"
    >
      <figure className="bg-muted relative m-2.5 aspect-[16/10] overflow-hidden rounded-md">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <BlogCoverArt post={post} />
        )}
      </figure>
      <div className="flex flex-1 flex-col gap-3 px-5 pb-5">
        {post.category ? (
          <Badge variant="secondary" className="self-start text-xs font-medium">
            {post.category}
          </Badge>
        ) : null}
        <h3 className="text-foreground text-lg font-semibold tracking-tight">{post.title}</h3>
        {post.excerpt ? (
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {post.excerpt}
          </p>
        ) : null}

        <div className="border-border/60 mt-auto flex items-center gap-2.5 border-t pt-3">
          <Avatar className="size-7">
            {post.author_avatar ? <AvatarImage src={post.author_avatar} alt={author} /> : null}
            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
              {authorInitials(post.author_name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-xs leading-tight">
            <div className="text-foreground truncate font-medium">{author}</div>
            {date || readTime ? (
              <div className="text-muted-foreground truncate">
                {date}
                {date && readTime ? <span aria-hidden> · </span> : null}
                {readTime}
              </div>
            ) : null}
          </div>
          <span className="bg-primary text-primary-foreground ml-auto inline-flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium shadow-sm">
            Learn More
            <ArrowUpRight className="size-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
