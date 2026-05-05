import { Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

interface Heading {
  text: string;
  id: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractH2s(body: string): Heading[] {
  const lines = body.split("\n");
  const headings: Heading[] = [];
  let insideFence = false;
  for (const raw of lines) {
    if (/^\s*```/.test(raw)) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) continue;
    const match = /^##\s+(.+?)\s*#*\s*$/.exec(raw);
    if (!match) continue;
    const text = match[1].replace(/[*_`]/g, "").trim();
    if (!text) continue;
    headings.push({ text, id: slugify(text) });
  }
  return headings;
}

interface Props {
  body: string;
  className?: string;
}

export function BlogTableOfContents({ body, className }: Props) {
  const headings = extractH2s(body);
  if (headings.length < 2) return null;

  return (
    <aside
      aria-label="Quick Read"
      className={cn(
        "relative mx-auto my-10 max-w-3xl overflow-hidden rounded-2xl border border-amber-200/70 bg-amber-50/80 px-7 py-7 pr-24 sm:my-12 sm:pr-28 dark:border-amber-500/25 dark:bg-amber-500/5",
        className
      )}
    >
      <h2 className="text-foreground mb-4 text-xl font-bold tracking-tight sm:text-2xl">
        Quick Read
      </h2>
      <ul className="space-y-2.5">
        {headings.map((h) => (
          <li key={h.id} className="text-foreground/90 flex gap-3 leading-relaxed">
            <span
              className="mt-[0.65rem] inline-block size-1.5 shrink-0 rounded-full bg-amber-600 dark:bg-amber-400"
              aria-hidden
            />
            <a
              href={`#${h.id}`}
              className="hover:text-primary underline-offset-4 hover:underline"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
      <Lightbulb
        className="absolute right-4 bottom-4 size-14 text-amber-400 sm:right-6 sm:bottom-6 sm:size-16 dark:text-amber-300"
        aria-hidden
        strokeWidth={1.5}
      />
    </aside>
  );
}
