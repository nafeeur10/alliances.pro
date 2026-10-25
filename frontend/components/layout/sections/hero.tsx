import { CheckIcon } from "lucide-react";

import { heroContent } from "@/@data/hero";
import { BackgroundBeamsWithCollision } from "@/components/ui/extras/background-beams-with-collision";
import { HeroHeadline } from "@/components/marketing/hero-headline";
import { HeroCtas } from "@/components/marketing/hero-ctas";
import { HeroEyebrow } from "@/components/marketing/hero-eyebrow";
import { HeroVideo } from "@/components/marketing/hero-video";

export const HeroSection = () => {
  const {
    eyebrow,
    headline,
    subheadline,
    imageUrl,
    imageSrcSet,
    imageWidth,
    imageHeight,
    imageAlt,
    videoYoutubeId,
    videoTitle,
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
          <div className="grid w-full items-center gap-12 pb-8 lg:grid-cols-2 lg:gap-10 lg:pb-20">
            <div className="space-y-8 text-center lg:text-left">
              <HeroEyebrow badgeText={eyebrowBadge.trim() || "New"} tail={eyebrowTail} />
              <div className="mx-auto max-w-(--breakpoint-md) text-4xl font-bold md:text-6xl lg:mx-0 lg:text-5xl xl:text-6xl">
                <HeroHeadline text={headline} />
              </div>
              <p className="text-muted-foreground mx-auto max-w-(--breakpoint-sm) text-xl lg:mx-0">
                {subheadline}
              </p>
              <HeroCtas
                signupUrl={primaryCta.url}
                signupLabel={primaryCta.label}
                demoUrl={secondaryCta.url}
                demoLabel={secondaryCta.label}
                className="lg:justify-start"
              />
              {trustChecks.length > 0 ? (
                <div className="text-muted-foreground mt-6 flex flex-col items-center justify-center gap-4 text-sm md:flex-row! lg:justify-start">
                  {trustChecks.map(({ label }) => (
                    <div key={label} className="flex items-center gap-1">
                      <CheckIcon className="text-primary size-4" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="relative">
              <div className="bg-primary/40 absolute inset-6 -z-10 rounded-full blur-3xl" />
              <HeroVideo youtubeId={videoYoutubeId} title={videoTitle} />
            </div>
          </div>
        </BackgroundBeamsWithCollision>

        <div className="group relative">
          {/* blur effect */}
          <div className="bg-primary/60 absolute top-2 left-1/2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full blur-3xl lg:-top-8 lg:h-80"></div>
          {/* blur effect */}

          {/* Plain <img>: next/image runs unoptimized here, so it would not
              emit a srcset. The WebP sizes are pre-generated in /public. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            srcSet={imageSrcSet}
            sizes="(min-width: 1280px) 1216px, calc(100vw - 32px)"
            width={imageWidth}
            height={imageHeight}
            alt={imageAlt}
            decoding="async"
            className="relative mx-auto flex h-auto w-full items-center rounded-lg mask-b-from-20% mask-b-to-90% leading-none"
          />
        </div>
      </div>
    </section>
  );
};
