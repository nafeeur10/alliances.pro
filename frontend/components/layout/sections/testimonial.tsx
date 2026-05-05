import { reviewList, testimonialSection } from "@/@data/reviews";

import { TestimonialSectionClient, type ReviewItem } from "./testimonial-client";

export const TestimonialSection = () => {
  const items: ReviewItem[] = reviewList.map((r) => ({
    name: r.name,
    userName: r.userName,
    comment: r.comment,
    rating: r.rating,
    image: r.image
  }));

  return (
    <TestimonialSectionClient
      items={items}
      subTitle={testimonialSection.eyebrow}
      title={testimonialSection.headline}
      description={testimonialSection.description}
    />
  );
};
