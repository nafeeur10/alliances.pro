import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionShell } from "@/components/marketing/section-shell";
import { cn } from "@/lib/utils";

export interface RelatedLink {
  label: string;
  description?: string;
  href: string;
}

interface RelatedLinksProps {
  heading?: string;
  links: readonly RelatedLink[];
  className?: string;
}

/**
 * Simple internal-link cluster used on feature/industry/compare pages to
 * push internal PageRank flow.
 */
export function RelatedLinks({ heading = "Keep exploring", links, className }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <SectionShell as="section" heading={heading} className={cn("py-16", className)}>
      <ul className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group border-border bg-card hover:border-primary/40 hover:bg-muted/30 flex h-full items-start justify-between gap-3 rounded-lg border p-5 transition-colors"
            >
              <div>
                <p className="text-foreground font-semibold">{link.label}</p>
                {link.description && (
                  <p className="text-muted-foreground mt-1 text-sm">{link.description}</p>
                )}
              </div>
              <ArrowRight
                className="text-muted-foreground/60 group-hover:text-primary mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
