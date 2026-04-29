import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { NewsletterSection } from "@/components/layout/sections/newsletter";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TrustSection } from "@/components/layout/sections/trust";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";

export const metadata = {
  title: `Alliances PRO - Service Based CRM SaaS Platform`,
  description:
    "Alliances PRO is the ultimate service-based CRM platform designed to streamline client relationships, automate workflows, and grow your service business.",
  openGraph: {
    type: "website",
    url: "https://alliances.pro",
    title: "Alliances PRO - Service Based CRM Platform",
    description: "Transform your service business with our intelligent CRM solution",
    images: [
      {
        url: "/seo.jpg",
        width: 1200,
        height: 630,
        alt: "Alliances PRO - Service Based CRM"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "https://alliances.pro",
    title: "Alliances PRO - Service Based CRM SaaS Platform",
    description:
      "Alliances PRO is the ultimate service-based CRM platform designed to streamline client relationships, automate workflows, and grow your service business.",
    images: ["/seo.jpg"]
  }
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TrustSection />
      <TestimonialSection />
      <TeamSection />
      <PricingSection />
      <CommunitySection />
      <ContactSection />
      <FAQSection />
      <NewsletterSection />
      <FooterSection />
    </>
  );
}
