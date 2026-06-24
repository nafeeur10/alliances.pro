import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gift, Sparkles } from "lucide-react";

import { FooterSection } from "@/components/layout/sections/footer";
import { SectionShell } from "@/components/marketing/section-shell";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Redeem Your AppSumo Code — Alliances PRO",
  description:
    "Redeem your AppSumo code for lifetime access to Alliances PRO. Follow the steps to create your account and unlock your deal.",
  path: "/redeem"
});

const REDEEM_URL = "https://crm.alliances.pro/signup";

const STEPS = [
  "Copy the redemption code from your AppSumo purchase to your clipboard.",
  'Click the yellow "Redeem now" button below.',
  "On our sign-up page, enter your registration info (name, email, password).",
  "Paste your AppSumo code into the code field.",
  'Click "Redeem" to activate your deal.',
  'To view your Alliances PRO features, head to your dashboard.'
];

export default function RedeemPage() {
  return (
    <main className="min-h-screen">
      <SectionShell
        as="section"
        className="pt-32"
        eyebrow="AppSumo"
        heading="Redeem your AppSumo code"
        subheading="Welcome, Sumo-ling! Follow the steps below to unlock your Alliances PRO deal."
      >
        <div className="mx-auto max-w-3xl">
          {/* Lifetime deal callout */}
          <div className="mb-10 flex items-center gap-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-amber-400/10 via-fuchsia-500/10 to-indigo-500/10 p-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-fuchsia-600 text-white shadow-lg">
              <Gift className="size-6" />
            </span>
            <div>
              <p className="text-lg font-semibold">Lifetime Pro access</p>
              <p className="text-muted-foreground text-sm">
                Your code unlocks the full Professional plan for life — no recurring subscription.
              </p>
            </div>
          </div>

          {/* Redemption steps */}
          <ol className="space-y-5">
            {STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-600 text-sm font-bold text-white shadow-md">
                  {i + 1}
                </span>
                <p className="pt-1 text-base leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-400 to-amber-500 px-8 text-amber-950 hover:from-amber-400/90 hover:to-amber-500/90"
            >
              <Link href={REDEEM_URL}>
                <Sparkles className="size-5" />
                Redeem now
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            <p className="text-muted-foreground text-sm">
              Having trouble?{" "}
              <Link href="/#contact" className="text-primary underline-offset-4 hover:underline">
                Contact our team
              </Link>{" "}
              and we&apos;ll get you set up.
            </p>
          </div>
        </div>
      </SectionShell>

      <FooterSection />
    </main>
  );
}
