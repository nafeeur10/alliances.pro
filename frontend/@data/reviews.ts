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
    userName: "Senior Marketing Manager",
    comment:
      "The training sessions were invaluable. Our team is now fully equipped to utilize all the features effectively!",
    rating: 4.9
  }
];
