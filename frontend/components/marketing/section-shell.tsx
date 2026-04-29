import { cn } from "@/lib/utils";

interface SectionShellProps {
  className?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  children: React.ReactNode;
  /** Render as a regular `<section>`. Defaults to true. */
  as?: "section" | "div";
}

/**
 * Lightweight shell so industry/comparison pages don't have to repeat the
 * section header markup. Mirrors the cosmic template's spacing.
 */
export function SectionShell({
  className,
  eyebrow,
  heading,
  subheading,
  children,
  as = "section"
}: SectionShellProps) {
  const Tag = as;
  return (
    <Tag className={cn("container mx-auto px-4 py-20 sm:px-6", className)}>
      {(eyebrow || heading || subheading) && (
        <div className="mx-auto mb-10 max-w-3xl text-center">
          {eyebrow && (
            <p className="text-primary mb-3 text-sm font-semibold tracking-wider uppercase">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{heading}</h2>
          )}
          {subheading && <p className="text-muted-foreground mt-4 text-lg">{subheading}</p>}
        </div>
      )}
      {children}
    </Tag>
  );
}
