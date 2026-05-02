import Image from "next/image";
import { CheckIcon } from "lucide-react";

import { heroContent } from "@/@data/hero";
import { BackgroundBeamsWithCollision } from "@/components/ui/extras/background-beams-with-collision";
import { HeroHeadline } from "@/components/marketing/hero-headline";
import { HeroCtas } from "@/components/marketing/hero-ctas";
import { HeroEyebrow } from "@/components/marketing/hero-eyebrow";

export const HeroSection = () => {
  const {
    eyebrow,
    headline,
    subheadline,
    imageUrl,
    imageAlt,
    primaryCta,
    secondaryCta,
    trustChecks
  } = heroContent;

  const [eyebrowBadge, ...eyebrowRest] = eyebrow.split("·");
  const eyebrowTail = eyebrowRest.join("·").trim();

  return (
    <section className="container w-full">
      <div className="mx-auto grid place-items-center py-16 pb-8 md:py-32 md:pb-14 lg:max-w-(--breakpoint-xl)">
        <BackgroundBeamsWithCollision>
          <div className="space-y-8 pb-8 text-center lg:pb-20">
            <HeroEyebrow badgeText={eyebrowBadge.trim() || "New"} tail={eyebrowTail} />
            <div className="mx-auto max-w-(--breakpoint-md) text-center text-4xl font-bold md:text-6xl">
              <HeroHeadline text={headline} />
            </div>
            <p className="text-muted-foreground mx-auto max-w-(--breakpoint-sm) text-xl">
              {subheadline}
            </p>
            <HeroCtas
              signupUrl={primaryCta.url}
              signupLabel={primaryCta.label}
              demoUrl={secondaryCta.url}
              demoLabel={secondaryCta.label}
            />
            {trustChecks.length > 0 ? (
              <div className="text-muted-foreground mt-6 flex flex-col items-center justify-center gap-4 text-sm md:flex-row!">
                {trustChecks.map(({ label }) => (
                  <div key={label} className="flex items-center gap-1">
                    <CheckIcon className="text-primary size-4" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </BackgroundBeamsWithCollision>

        <div className="group relative">
          {/* blur effect */}
          <div className="bg-primary/60 absolute top-2 left-1/2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full blur-3xl lg:-top-8 lg:h-80"></div>
          {/* blur effect */}

          <Image
            width={1240}
            height={1200}
            className="rouded-lg relative mx-auto flex w-full items-center rounded-lg mask-b-from-20% mask-b-to-90% leading-none"
            src={imageUrl}
            alt={imageAlt}
            unoptimized
          />
        </div>
      </div>
    </section>
  );
};
