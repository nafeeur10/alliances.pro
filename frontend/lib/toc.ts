// Heading extraction for the left-rail content index.
//
// Both blog posts and docs render their body through `MarkdownArticle`, which
// gives every h2/h3 an id from `slugifyHeading`. This module reproduces that
// slug from the raw markdown so the rail can be rendered on the server — the
// index is real anchor markup, not something that appears after hydration.

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface TocGroup {
  heading: TocHeading;
  children: TocHeading[];
}

// Keep in sync with `slugifyHeading` in components/marketing/markdown-article.tsx.
export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Inline markdown never reaches the DOM as text, so strip it before slugifying:
// `**Bold**` and `[label](url)` render as "Bold" and "label".
function stripInline(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

export function extractHeadings(body: string): TocHeading[] {
  const headings: TocHeading[] = [];
  let insideFence = false;

  for (const raw of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(raw)) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(raw);
    if (!match) continue;

    const text = stripInline(match[2]);
    if (!text) continue;

    headings.push({ id: slugifyHeading(text), text, level: match[1].length as 2 | 3 });
  }

  return headings;
}

// h3s belong to the h2 above them, so the rail can collapse a section the
// reader is not in. An h3 before any h2 becomes a group of its own.
export function groupHeadings(headings: TocHeading[]): TocGroup[] {
  const groups: TocGroup[] = [];
  for (const heading of headings) {
    if (heading.level === 2 || groups.length === 0) {
      groups.push({ heading, children: [] });
    } else {
      groups[groups.length - 1].children.push(heading);
    }
  }
  return groups;
}
