"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  /** Which waitlist this form joins (e.g. "education_crm"). */
  waitlistFor: "education_crm" | "real_estate_crm" | "healthcare_crm";
  /** Optional heading rendered above the form. */
  heading?: string;
  /** Sub-copy above the form. */
  subheading?: string;
  className?: string;
}

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function WaitlistForm({ waitlistFor, heading, subheading, className }: WaitlistFormProps) {
  const [state, setState] = useState<FormState>({ kind: "idle" });
  const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost/api/v1/marketing";

  return (
    <div className={cn("border-border bg-card mx-auto max-w-lg rounded-xl border p-8", className)}>
      {heading && <h3 className="mb-2 text-2xl font-bold">{heading}</h3>}
      {subheading && <p className="text-muted-foreground mb-6">{subheading}</p>}

      {state.kind === "success" ? (
        <p className="text-foreground text-base">
          You&rsquo;re on the list. We&rsquo;ll email you the moment private beta opens.
        </p>
      ) : (
        <form
          className="flex flex-col gap-3"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const formData = new FormData(form);
            setState({ kind: "submitting" });

            try {
              const res = await fetch(`${apiBase}/leads`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                  source: "waitlist",
                  waitlist_for: waitlistFor,
                  name: formData.get("name") || null,
                  email: formData.get("email"),
                  company: formData.get("company") || null,
                  consent_given: true,
                  honeypot: formData.get("honeypot") || ""
                })
              });

              if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                const message =
                  (data?.message as string | undefined) ??
                  "We couldn't add you just now. Please try again in a moment.";
                setState({ kind: "error", message });
                return;
              }
              setState({ kind: "success" });
              form.reset();
            } catch {
              setState({
                kind: "error",
                message: "Network error — please retry in a moment."
              });
            }
          }}
        >
          <Input name="name" placeholder="Your name" autoComplete="name" required />
          <Input
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
          <Input name="company" placeholder="Company (optional)" autoComplete="organization" />
          {/* Honeypot — must stay empty. Hidden from real users. */}
          <input
            type="text"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <Button type="submit" disabled={state.kind === "submitting"} className="mt-2">
            {state.kind === "submitting" ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" /> Adding you…
              </>
            ) : (
              "Join the waitlist"
            )}
          </Button>

          {state.kind === "error" && (
            <p className="text-destructive text-sm" role="alert">
              {state.message}
            </p>
          )}
          <p className="text-muted-foreground text-xs">
            We&rsquo;ll email you when private beta opens. Unsubscribe any time.
          </p>
        </form>
      )}
    </div>
  );
}
