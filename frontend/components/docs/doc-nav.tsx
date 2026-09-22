import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { DocsArticle } from "@/@data/docs";
import { cn } from "@/lib/utils";

export function DocPager({ prev, next }: { prev?: DocsArticle; next?: DocsArticle }) {
  if (!prev && !next) return null;

  return (
    <div className="border-border mt-12 grid gap-4 border-t pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group hover:border-primary/50 rounded-xl border p-4 transition-colors"
        >
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="text-foreground mt-1 block font-medium">{prev.title}</span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group hover:border-primary/50 rounded-xl border p-4 text-right transition-colors"
        >
          <span className="text-muted-foreground flex items-center justify-end gap-1.5 text-xs font-semibold tracking-widest uppercase">
            Next
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="text-foreground mt-1 block font-medium">{next.title}</span>
        </Link>
      ) : null}
    </div>
  );
}
