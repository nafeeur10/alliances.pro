"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { reportConversion } from "@/lib/experiments";

interface HeroCtasProps {
  signupUrl?: string;
  signupLabel?: string;
  demoUrl?: string;
  demoLabel?: string;
  className?: string;
}

export function HeroCtas({
  signupUrl = "https://crm.alliances.pro/signup",
  signupLabel = "Start Free Trial",
  demoUrl = "/contact?intent=demo",
  demoLabel = "Book a Demo",
  className
}: HeroCtasProps) {
  return (
    <div className={cn("mt-8 flex flex-col justify-center gap-4 md:flex-row!", className)}>
      <Button asChild className="h-12 px-10 text-base">
        <Link
          href={signupUrl}
          onClick={() => {
            trackEvent("signup_clicked", { location: "hero" });
            reportConversion("hero_headline_variant", "signup_clicked");
          }}
        >
          {signupLabel}
        </Link>
      </Button>
      <Button asChild variant="outline" className="h-12 px-10 text-base">
        <Link
          href={demoUrl}
          onClick={() => {
            trackEvent("demo_requested", { location: "hero" });
            reportConversion("hero_headline_variant", "demo_requested");
          }}
        >
          {demoLabel}
        </Link>
      </Button>
    </div>
  );
}
