"use client";

import Image from "next/image";
import React from "react";
import { CheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import SectionContainer from "@/components/layout/section-container";
import HexRing from "@/components/marketing/hex-ring";

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  image: string;
  href: string;
  bgColor?: string;
  bullets: string[];
}

interface Props {
  items: FeatureItem[];
  subTitle?: string;
  title?: string;
  description?: string;
}

export const FeaturesSectionClient = ({
  items,
  subTitle = "Features",
  title = "Everything You Need to Succeed",
  description = "Our comprehensive CRM platform provides all the tools you need to manage clients, streamline operations, and grow your service business."
}: Props) => {
  return (
    <SectionContainer id="features" className="bg-muted/30">
      <div className="mx-auto max-w-2xl text-center">
        <Badge
          variant="outline"
          className="bg-background/60 mb-5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase backdrop-blur"
        >
          <span className="bg-primary mr-2 inline-block size-1.5 rounded-full" />
          {subTitle}
        </Badge>
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
        {description ? (
          <p className="text-muted-foreground text-base md:text-lg">{description}</p>
        ) : null}
      </div>
      <div className="mx-auto mb-12 w-full max-w-(--breakpoint-md) lg:mb-20">
        <HexRing />
      </div>
      <div className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {items.map((card) => (
          <div key={`${card.icon}-${card.title}`} className="flex flex-col gap-4">
            <div
              className="bg-muted relative h-[250px] w-full overflow-hidden rounded-2xl"
              style={card.bgColor ? { backgroundColor: card.bgColor } : undefined}
            >
              <Image src={card.image} alt={card.title} fill unoptimized />
            </div>
            <h3 className="text-lg leading-snug font-bold">{card.title}</h3>
            <p className="text-muted-foreground text-sm font-normal">{card.description}</p>
            <ul className="mt-1 flex flex-col gap-2">
              {card.bullets.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm font-medium">
                  <span className="bg-primary/10 text-primary flex size-5 shrink-0 items-center justify-center rounded-full">
                    <CheckIcon className="size-3" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};
