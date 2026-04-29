import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionShell } from "@/components/marketing/section-shell";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Page not found",
  description: "The page you're looking for has moved or never existed.",
  path: "/404",
  noIndex: true
});

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <SectionShell as="section" className="pb-32 pt-32">
        <div className="mx-auto mb-8 max-w-3xl">
          <Breadcrumbs items={[{ name: "Not found", url: "/404" }]} />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider">404</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            We couldn&rsquo;t find that page.
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            The link might be broken, or the page might have moved. Here are a few good
            places to start instead.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/blog">Read the blog</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
