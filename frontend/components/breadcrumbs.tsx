import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import { BreadcrumbListSchema, type BreadcrumbItem } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  /**
   * Items in the breadcrumb trail. The component automatically prepends the
   * site root ("Home" → "/") if it isn't the first item.
   */
  items: readonly BreadcrumbItem[];
  className?: string;
}

/**
 * Renders both the visible HTML breadcrumb and the corresponding
 * BreadcrumbList JSON-LD payload. Use on every non-home page.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const trail = items[0]?.url === "/" ? items : ([{ name: "Home", url: "/" }, ...items] as const);

  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-muted-foreground text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {trail.map((item, idx) => {
            const isLast = idx === trail.length - 1;
            return (
              <li key={`${item.url}-${idx}`} className="flex items-center gap-1.5">
                {idx > 0 ? (
                  <ChevronRight className="text-muted-foreground/60 size-3.5" aria-hidden />
                ) : (
                  <Home className="text-muted-foreground/80 size-3.5" aria-hidden />
                )}
                {isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.url} className="hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <BreadcrumbListSchema items={trail} />
    </>
  );
}
