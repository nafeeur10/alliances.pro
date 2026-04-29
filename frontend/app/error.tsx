"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Surface to Sentry once the SDK ships. For now, log so we see it in
    // browser dev tools + the Next.js server log.
    console.error("[app error]", error);
  }, [error]);

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 py-32 text-center sm:px-6">
        <p className="text-primary text-sm font-semibold uppercase tracking-wider">
          Something went wrong
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          We hit a snag rendering this page.
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
          Our team has been notified. Try again, or head back home — most things
          still work fine.
        </p>
        {error.digest && (
          <p className="text-muted-foreground mt-6 text-xs">
            Error ref: <code className="font-mono">{error.digest}</code>
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()} size="lg">
            Try again
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
