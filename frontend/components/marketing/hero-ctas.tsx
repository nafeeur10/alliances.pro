"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { reportConversion } from "@/lib/experiments";

interface HeroCtasProps {
  signupUrl?: string;
  demoUrl?: string;
}

export function HeroCtas({
  signupUrl = "https://app.alliances.pro/signup",
  demoUrl = "/contact?intent=demo"
}: HeroCtasProps) {
  return (
    <div className="mt-8 flex flex-col justify-center gap-4 md:flex-row!">
      <Button asChild className="h-12 px-10 text-base">
        <Link
          href={signupUrl}
          onClick={() => {
            trackEvent("signup_clicked", { location: "hero" });
            reportConversion("hero_headline_variant", "signup_clicked");
          }}
        >
          Start Free Trial
          <ChevronRight />
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
          Book a Demo
        </Link>
      </Button>
    </div>
  );
}
