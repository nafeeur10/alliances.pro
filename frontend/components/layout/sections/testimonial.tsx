import { reviewList as fallbackReviews } from "@/@data/reviews";
import { listTestimonials } from "@/lib/api";
import { getHomeSections, pickString, readPayload } from "@/lib/cms";

import { TestimonialSectionClient, type ReviewItem } from "./testimonial-client";

export const TestimonialSection = async () => {
  const [apiList, { sections }] = await Promise.all([listTestimonials(), getHomeSections()]);
  const header = readPayload<Record<string, unknown>>(sections, "testimonial");

  const items: ReviewItem[] =
    apiList && apiList.length > 0
      ? apiList.map((t) => ({
          name: t.author?.name ?? "Anonymous",
          userName: [t.author?.role, t.author?.company].filter(Boolean).join(", ") || "",
          comment: t.quote,
          rating: t.rating ?? 5,
          image: t.author?.avatar ?? "/avatars/1.png"
        }))
      : fallbackReviews.map((r) => ({
          name: r.name,
          userName: r.userName,
          comment: r.comment,
          rating: r.rating,
          image: r.image
        }));

  return (
    <TestimonialSectionClient
      items={items}
      subTitle={pickString(header, "eyebrow", "Testimonials")}
      title={pickString(header, "headline", "Loved by Teams Worldwide")}
      description={pickString(
        header,
        "sub",
        "Don't just take our word for it. See what our customers have to say about their experience."
      )}
    />
  );
};
