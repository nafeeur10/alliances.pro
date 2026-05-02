import Image from "next/image";
import Link from "next/link";
import React from "react";

import Icon from "@/components/icon";

export interface LogoProps {
  text?: string;
  iconName?: string;
  imageUrl?: string;
}

export default function Logo({ text = "Alliances PRO", iconName = "SunDim", imageUrl }: LogoProps) {
  return (
    <Link href="/" aria-label={`${text} home`} className="flex items-center font-bold">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={text}
          width={32}
          height={32}
          className="mr-2 size-7 rounded-lg lg:size-8"
          unoptimized
        />
      ) : (
        <span
          aria-hidden
          className="from-primary via-primary/70 to-primary border-secondary mr-2 flex size-7 items-center justify-center rounded-lg border bg-linear-to-tr lg:size-8"
        >
          <Icon name={iconName} className="size-5 text-white lg:size-6" />
        </span>
      )}
      <span className="text-lg lg:text-xl">{text}</span>
    </Link>
  );
}
