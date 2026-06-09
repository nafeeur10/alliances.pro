interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

export const testimonialSection = {
  eyebrow: "Testimonials",
  headline: "Loved by Teams Worldwide",
  description:
    "Don't just take our word for it. See what our customers have to say about their experience."
};

export const reviewList: ReviewProps[] = [
  {
    image: "/avatars/hafizur.jpg",
    name: "Hafizur Rahman",
    userName: "Founder and CEO at orDevs",
    comment:
      "This platform transformed our workflow! The automation features saved us countless hours, and the support team is fantastic!",
    rating: 5.0
  },
  {
    image: "/avatars/simon-carter.png",
    name: "Simon Carter",
    userName: "Managing Director at Greenbox Digital",
    comment:
      "I can't imagine running my business without this tool. The insights from the analytics have helped us make smarter decisions.",
    rating: 4.8
  },
  {
    image: "/avatars/omar.jpeg",
    name: "Omar Nasif",
    userName: "Co-CEO at Optinify",
    comment:
      "I've explored Alliances PRO a bit, and it's a genuinely promising product. Most CRMs are built for sales pipelines and treat clients as deals to close and forget. Alliances PRO flips that as it's designed for the ongoing follow-ups, check-ins, and relationship management that service businesses actually run on.",
    rating: 4.9
  }
];
