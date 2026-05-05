import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";
import { resolveAssetUrl } from "@/lib/cms";

function nodeToText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (typeof node === "object" && "props" in node) {
    return nodeToText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const components: Components = {
  h1: ({ className, children, ...props }) => (
    <h1
      {...props}
      id={slugifyHeading(nodeToText(children))}
      className={cn(
        "text-foreground mt-12 mb-5 scroll-mt-28 text-3xl font-bold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }) => (
    <h2
      {...props}
      id={slugifyHeading(nodeToText(children))}
      className={cn(
        "text-foreground mt-12 mb-4 scroll-mt-28 text-2xl font-bold tracking-tight",
        className
      )}
    >
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }) => (
    <h3
      {...props}
      id={slugifyHeading(nodeToText(children))}
      className={cn(
        "text-foreground mt-10 mb-3 scroll-mt-28 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  ),
  p: ({ className, ...props }) => (
    <p {...props} className={cn("text-foreground/90 mb-5 text-base leading-relaxed", className)} />
  ),
  ul: ({ className, ...props }) => (
    <ul {...props} className={cn("text-foreground/90 mb-6 list-disc space-y-2 pl-6", className)} />
  ),
  ol: ({ className, ...props }) => (
    <ol
      {...props}
      className={cn("text-foreground/90 mb-6 list-decimal space-y-2 pl-6", className)}
    />
  ),
  li: ({ className, ...props }) => <li {...props} className={cn("leading-relaxed", className)} />,
  blockquote: ({ className, ...props }) => (
    <blockquote
      {...props}
      className={cn(
        "border-primary/40 text-muted-foreground my-6 border-l-4 pl-5 italic",
        className
      )}
    />
  ),
  a: ({ className, href, ...props }) => {
    const target = typeof href === "string" && href.startsWith("http") ? "_blank" : undefined;
    const rel = target ? "noopener noreferrer" : undefined;
    return (
      <Link
        href={href ?? "#"}
        target={target}
        rel={rel}
        className={cn("text-primary font-medium underline-offset-4 hover:underline", className)}
        {...(props as ComponentPropsWithoutRef<"a">)}
      />
    );
  },
  hr: ({ className, ...props }) => (
    <hr {...props} className={cn("border-border my-10", className)} />
  ),
  strong: ({ className, ...props }) => (
    <strong {...props} className={cn("text-foreground font-semibold", className)} />
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = /\blanguage-/.test(className ?? "");
    if (isBlock) {
      return (
        <code
          {...props}
          className={cn("text-foreground/90 font-mono text-sm leading-relaxed", className)}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        {...props}
        className={cn(
          "bg-muted text-foreground rounded-md px-1.5 py-0.5 font-mono text-[0.9em]",
          className
        )}
      >
        {children}
      </code>
    );
  },
  pre: ({ className, ...props }) => (
    <pre
      {...props}
      className={cn(
        "bg-muted text-foreground/90 my-6 overflow-x-auto rounded-2xl border p-5 font-mono text-sm leading-relaxed whitespace-pre",
        className
      )}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border">
      <table {...props} className={cn("w-full text-left text-sm", className)} />
    </div>
  ),
  thead: ({ className, ...props }) => (
    <thead {...props} className={cn("bg-muted text-foreground", className)} />
  ),
  tr: ({ className, ...props }) => (
    <tr {...props} className={cn("border-border border-b last:border-0", className)} />
  ),
  th: ({ className, ...props }) => (
    <th
      {...props}
      className={cn("px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase", className)}
    />
  ),
  td: ({ className, ...props }) => (
    <td {...props} className={cn("text-foreground/90 px-4 py-3 align-top", className)} />
  ),
  img: ({ src, alt, className }) => {
    const resolved = resolveAssetUrl(src) ?? src;
    if (!resolved || typeof resolved !== "string") return null;
    return (
      <span className="my-8 block overflow-hidden rounded-2xl border">
        <Image
          src={resolved}
          alt={alt ?? ""}
          width={1600}
          height={900}
          unoptimized
          className={cn("h-auto w-full", className)}
        />
      </span>
    );
  }
};

interface Props {
  children: string;
}

export function MarkdownArticle({ children }: Props) {
  return (
    <article className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </article>
  );
}
