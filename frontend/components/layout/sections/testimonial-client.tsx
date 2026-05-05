"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import SectionContainer from "@/components/layout/section-container";
import { resolveAssetUrl } from "@/lib/cms";

export interface ReviewItem {
  name: string;
  userName: string;
  comment: string;
  rating: number;
  image: string;
}

interface Props {
  items: ReviewItem[];
  subTitle?: string;
  title?: string;
  description?: string;
}

export const TestimonialSectionClient = ({
  items,
  subTitle = "Testimonials",
  title = "Loved by Teams Worldwide",
  description = "Don't just take our word for it. See what our customers have to say about their experience."
}: Props) => {
  return (
    <SectionContainer id="testimonials" className="bg-primary/5 pt-20 sm:pt-32">
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-12">
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
      <Carousel
        opts={{ align: "start" }}
        className="relative mx-auto w-[80%] sm:w-[90%] lg:max-w-(--breakpoint-xl)"
      >
        <CarouselContent>
          {items.map((review, idx) => (
            <CarouselItem key={`${review.name}-${idx}`} className="md:basis-1/2 lg:basis-1/3">
              <Card className="bg-muted">
                <CardContent className="flex flex-col gap-4">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < Math.round(review.rating)
                            ? "size-4 fill-orange-400 text-orange-400"
                            : "fill-muted text-muted-foreground size-4"
                        }
                      />
                    ))}
                  </div>
                  <p>{review.comment}</p>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar className="size-12">
                      <AvatarImage
                        src={resolveAssetUrl(review.image) ?? review.image}
                        alt={review.name}
                      />
                      <AvatarFallback>{review.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <CardTitle>{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionContainer>
  );
};
