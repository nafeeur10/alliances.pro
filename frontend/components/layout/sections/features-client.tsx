"use client";

import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import Icon from "@/components/icon";
import { CardHover, CardsHover } from "@/components/ui/extras/cards-hover";
import SectionContainer from "@/components/layout/section-container";
import HexRing from "@/components/marketing/hex-ring";

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  image: string;
  href: string;
  bgColor?: string;
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
  const [value, setValue] = React.useState<string | null>(null);

  return (
    <SectionContainer id="features">
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
      <CardsHover
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        value={value}
        onValueChange={setValue}
      >
        {items.map((card) => (
          <CardHover
            key={`${card.icon}-${card.title}`}
            value={card.icon}
            className="group flex flex-col p-0"
          >
            <div
              className="bg-muted relative aspect-[4/3] w-full overflow-hidden"
              style={card.bgColor ? { backgroundColor: card.bgColor } : undefined}
            >
              <Image
                src={card.image}
                alt={card.title}
                width={900}
                height={675}
                unoptimized
                className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="bg-primary/90 ring-primary/20 absolute top-3 left-3 flex size-9 items-center justify-center rounded-full ring-4 backdrop-blur-sm">
                <Icon name={card.icon} className="size-4 text-white" />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <CardTitle className="text-lg">{card.title}</CardTitle>
              <p className="text-muted-foreground line-clamp-3 text-sm font-normal">
                {card.description}
              </p>
              <a
                href={card.href}
                aria-label={`Learn more about ${card.title}`}
                className="text-primary mt-auto inline-flex items-center gap-1 text-sm font-medium transition-transform duration-300 group-hover:translate-x-1"
              >
                Learn more <span aria-hidden>→</span>
              </a>
            </div>
          </CardHover>
        ))}
      </CardsHover>
    </SectionContainer>
  );
};
