"use client";

import { useExperiment } from "@/lib/experiments";

export interface HeroHeadlineProps {
  text: string;
}

export function HeroHeadline({ text }: HeroHeadlineProps) {
  const variant = useExperiment("hero_headline_variant");
  return (
    <h1 data-experiment="hero_headline_variant" data-variant={variant}>
      {text}
    </h1>
  );
}
