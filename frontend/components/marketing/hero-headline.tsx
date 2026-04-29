"use client";

import { useExperiment } from "@/lib/experiments";

const VARIANTS = {
  A: "The CRM platform built for service businesses that grow sideways.",
  B: "Stop paying for five tools to manage one client."
} as const;

export function HeroHeadline() {
  const variant = useExperiment("hero_headline_variant");
  return (
    <h1 data-experiment="hero_headline_variant" data-variant={variant}>
      {VARIANTS[variant]}
    </h1>
  );
}
