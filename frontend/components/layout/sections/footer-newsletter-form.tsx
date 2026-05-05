"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

import { footerNewsletter } from "@/@data/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "submitting" | "success" | "error";

export function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || status === "submitting") return;

    setStatus("submitting");

    try {
      // Placeholder — wire to /api/newsletter when the backend endpoint is live.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex w-full max-w-sm items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
        <Check className="size-4 shrink-0" aria-hidden />
        <span>Thanks — check your inbox to confirm.</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-sm gap-2"
      aria-label="Subscribe to our newsletter"
    >
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
        placeholder={footerNewsletter.placeholder}
        className="bg-background/60 h-9"
        disabled={status === "submitting"}
      />
      <Button type="submit" size="sm" className="h-9 shrink-0" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            <span className="sr-only">Subscribing</span>
          </>
        ) : (
          footerNewsletter.ctaLabel
        )}
      </Button>
    </form>
  );
}
