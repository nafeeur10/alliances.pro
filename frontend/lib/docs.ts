// Markdown-backed user manual. Every `content/docs/<slug>.md` file becomes
// `/docs/<slug>`. Files are read at build time (pages are statically generated).

import fs from "node:fs";
import path from "node:path";

import { docsSections, type DocsArticle, type DocsSection } from "@/@data/docs";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

export interface MarkdownDoc {
  slug: string;
  title: string;
  description?: string;
  section: string;
  order: number;
  body: string;
  author: DocAuthor;
  /** ISO dates from frontmatter; the hero hides the chip when absent. */
  published?: string;
  updated?: string;
  readMinutes: number;
  /** Which coded hero illustration to render. */
  art?: string;
}

export interface DocAuthor {
  name: string;
  role: string;
  avatar: string;
}

export const DEFAULT_DOC_AUTHOR: DocAuthor = {
  name: "Nafeeur Rahman",
  role: "Founder, Alliances PRO",
  avatar: "/avatars/nafeeur-96.webp"
};

// Same 200 wpm the blog uses. Images and code fences inflate it slightly;
// close enough for a "5 min read" chip.
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Minimal `key: value` frontmatter parser — enough for our docs, no extra dependency.
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (key) data[key] = value;
  }
  return { data, body: raw.slice(match[0].length) };
}

function readDoc(slug: string): MarkdownDoc | null {
  const file = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
  // Strip HTML comments so authoring notes never render.
  const clean = body.replace(/<!--[\s\S]*?-->/g, "").trim();

  return {
    slug,
    title: data.title || slug,
    description: data.description,
    section: data.section || "General",
    order: Number(data.order) || 999,
    body: clean,
    author: {
      name: data.author || DEFAULT_DOC_AUTHOR.name,
      role: data.role || DEFAULT_DOC_AUTHOR.role,
      avatar: data.avatar || DEFAULT_DOC_AUTHOR.avatar
    },
    published: data.published || undefined,
    updated: data.updated || undefined,
    readMinutes: readingMinutes(clean),
    art: data.art || undefined
  };
}

export function getAllDocs(): MarkdownDoc[] {
  if (!fs.existsSync(DOCS_DIR)) return [];
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readDoc(f.replace(/\.md$/, "")))
    .filter((d): d is MarkdownDoc => d !== null)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getDoc(slug: string): MarkdownDoc | null {
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;
  return readDoc(slug);
}

// Hand-written sections from @data/docs plus every markdown doc in content/docs,
// grouped by its `section` frontmatter. Unknown sections are appended.
export function getDocsSections(): DocsSection[] {
  const sections: DocsSection[] = docsSections.map((s) => ({ ...s, articles: [...s.articles] }));
  for (const doc of getAllDocs()) {
    let section = sections.find((s) => s.title === doc.section);
    if (!section) {
      section = { title: doc.section, description: "", articles: [] };
      sections.push(section);
    }
    section.articles.push({ title: doc.title, slug: doc.slug, description: doc.description });
  }
  return sections;
}

// Neighbours in reading order (section order, then article order) for prev/next links.
export function getDocNeighbours(slug: string): { prev?: DocsArticle; next?: DocsArticle } {
  const ordered = getDocsSections().flatMap((s) => s.articles);
  const idx = ordered.findIndex((a) => a.slug === slug);
  if (idx === -1) return {};
  return { prev: ordered[idx - 1], next: ordered[idx + 1] };
}
