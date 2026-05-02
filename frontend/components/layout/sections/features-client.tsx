"use client";

import React from "react";

import { CardTitle } from "@/components/ui/card";
import Icon from "@/components/icon";
import { CardHover, CardsHover } from "@/components/ui/extras/cards-hover";
import SectionContainer from "@/components/layout/section-container";
import SectionHeader from "@/components/layout/section-header";
import HexRing from "@/components/marketing/hex-ring";

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
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
      <SectionHeader
        subTitle={subTitle}
        title={title}
        description={description}
        className="mb-0 lg:mb-0"
      />
      <div className="mx-auto mb-12 w-full max-w-(--breakpoint-md) lg:mb-20">
        <HexRing />
      </div>
      <CardsHover
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        value={value}
        onValueChange={setValue}
      >
        {items.map((card) => (
          <CardHover
            key={`${card.icon}-${card.title}`}
            value={card.icon}
            className="flex items-start gap-6"
          >
            <div className="space-y-4">
              <CardTitle className="text-lg">{card.title}</CardTitle>
              <p className="text-muted-foreground font-normal">{card.description}</p>
            </div>
            <div className="bg-primary/20 ring-primary/10 rounded-full p-2 ring-8">
              <Icon name={card.icon} className="text-primary size-6" />
            </div>
          </CardHover>
        ))}
      </CardsHover>
    </SectionContainer>
  );
};
