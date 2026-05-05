"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

import { footerNewsletter } from "@/@data/footer";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api/v1/marketing";

export function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || status === "submitting") return;

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          source: "newsletter",
          email,
          consent_given: true,
          page_url: typeof window !== "undefined" ? window.location.href : undefined
        })
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { message?: string } | null;
        setErrorMsg(data?.message ?? "We couldn't sign you up. Please try again.");
        setStatus("error");
        return;
      }

      trackEvent("newsletter_subscribed", { source: "footer" });
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-background/95 flex w-full items-center gap-2 rounded-full border border-emerald-500/40 px-5 py-3 text-sm text-emerald-700 shadow-md backdrop-blur dark:text-emerald-300">
        <Check className="size-5 shrink-0" aria-hidden strokeWidth={2.5} />
        <span>Thanks — check your inbox to confirm.</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        aria-label="Subscribe to our newsletter"
        className="bg-background focus-within:border-primary/60 focus-within:ring-primary/20 flex w-full items-center rounded-full border shadow-md transition-shadow focus-within:ring-4"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          placeholder={footerNewsletter.placeholder}
          disabled={status === "submitting"}
          className="text-foreground placeholder:text-muted-foreground h-14 flex-1 rounded-full bg-transparent pr-3 pl-6 text-sm outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-primary text-primary-foreground hover:bg-primary/90 my-1.5 mr-1.5 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium shadow-sm transition-colors disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              <span className="sr-only">Subscribing</span>
            </>
          ) : (
            footerNewsletter.ctaLabel
          )}
        </button>
      </form>
      {errorMsg ? (
        <p className="mt-2 px-2 text-xs text-rose-600 dark:text-rose-400">{errorMsg}</p>
      ) : null}
    </div>
  );
}
