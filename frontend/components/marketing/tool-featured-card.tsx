import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Props {
  href: string;
  category: string;
  title: string;
  description: string;
  ctaLabel?: string;
  coverImage?: string;
  coverAlt?: string;
}

export function ToolFeaturedCard({
  href,
  category,
  title,
  description,
  ctaLabel = "Try It Free",
  coverImage,
  coverAlt
}: Props) {
  return (
    <Link
      href={href}
      className="bg-background/60 flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-sm"
    >
      <figure className="bg-muted relative m-2.5 aspect-[16/10] overflow-hidden rounded-md">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={coverAlt ?? title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#14503C] via-[#1F6F54] to-[#2D6BB8] p-5">
            <div
              aria-hidden
              className="absolute -top-12 -right-12 size-40 rounded-full bg-white/15 blur-2xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-16 -left-16 size-44 rounded-full bg-[#C98A3A]/30 blur-3xl"
            />

            <div className="relative flex items-start justify-between gap-3">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-white/80 uppercase">
                {category}
              </span>
            </div>

            <h4 className="relative line-clamp-3 text-lg leading-tight font-bold text-white sm:text-xl">
              {title}
            </h4>
          </div>
        )}
      </figure>

      <div className="flex flex-1 flex-col gap-3 px-5 pb-5">
        <Badge variant="secondary" className="self-start text-xs font-medium">
          {category}
        </Badge>
        <h3 className="text-foreground text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>

        <div className="border-border/60 mt-auto flex items-center gap-2.5 border-t pt-3">
          <Avatar className="size-7">
            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
              AP
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-xs leading-tight">
            <div className="text-foreground truncate font-medium">Alliances PRO</div>
            <div className="text-muted-foreground truncate">Free tool</div>
          </div>
          <span className="bg-primary text-primary-foreground ml-auto inline-flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium shadow-sm">
            {ctaLabel}
            <ArrowUpRight className="size-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
