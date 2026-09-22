import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, RotateCw } from "lucide-react";

import { FooterSection } from "@/components/layout/sections/footer";
import { DocHeroArt } from "@/components/docs/doc-hero-art";
import { DocPager } from "@/components/docs/doc-nav";
import { ArticleRail, RailAuthor, RailSeparator } from "@/components/marketing/article-rail";
import { ContentIndex } from "@/components/marketing/content-index";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { ShareButtons } from "@/components/marketing/share-buttons";
import { getAllDocs, getDoc, getDocNeighbours } from "@/lib/docs";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { extractHeadings } from "@/lib/toc";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDocs().map((doc) => ({ slug: doc.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return buildMetadata({
    title: `${doc.title} — Alliances PRO`,
    description: doc.description ?? doc.title,
    path: `/docs/${doc.slug}`
  });
}

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
}

export default async function MarkdownDocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();
  const { prev, next } = getDocNeighbours(doc.slug);
  const headings = extractHeadings(doc.body);
  const published = formatDate(doc.published);
  const updated = doc.updated !== doc.published ? formatDate(doc.updated) : null;

  return (
    <main className="min-h-screen">
      {/* ---------- Hero ---------- */}
      <section className="pt-32 pb-12">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
            <div>
              <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
                <span className="px-1.5" aria-hidden>
                  /
                </span>
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Docs
                </Link>
                <span className="px-1.5" aria-hidden>
                  /
                </span>
                <span className="text-foreground/80">{doc.title}</span>
              </nav>

              <p className="text-primary mt-4 text-xs font-semibold tracking-widest uppercase">
                Docs · {doc.section}
              </p>

              <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {doc.title}
              </h1>

              {doc.description ? (
                <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
                  {doc.description}
                </p>
              ) : null}

              <div className="text-muted-foreground mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {published ? (
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="size-4 text-emerald-500" aria-hidden strokeWidth={2} />
                    {published}
                  </span>
                ) : null}
                {updated ? (
                  <span className="inline-flex items-center gap-2">
                    <RotateCw className="size-4 text-violet-500" aria-hidden strokeWidth={2} />
                    Updated {updated}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-sky-500" aria-hidden strokeWidth={2} />
                  {doc.readMinutes} min read
                </span>
              </div>
            </div>

            {doc.art ? (
              <div className="hidden lg:block">
                <DocHeroArt variant={doc.art} />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ---------- Body ---------- */}
      {/* Content index pinned left, the doc running the full width beside it. */}
      <section className="pb-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
            <ArticleRail>
              <RailAuthor {...doc.author} />

              <RailSeparator />
              <ContentIndex headings={headings} label="Contents" />

              <RailSeparator />
              <ShareButtons compact url={absoluteUrl(`/docs/${doc.slug}`)} title={doc.title} />
            </ArticleRail>

            <div className="min-w-0">
              <div id="article-body">
                <MarkdownArticle>{doc.body}</MarkdownArticle>
              </div>

              <DocPager prev={prev} next={next} />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
