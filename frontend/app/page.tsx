import type { Metadata } from "next";

import { BenefitsSection } from "@/components/layout/sections/benefits";
import { BlogSection } from "@/components/layout/sections/blog";
import { ContactSection } from "@/components/layout/sections/contact";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TestimonialSection } from "@/components/layout/sections/testimonial";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Alliances PRO — The CRM Platform for Shopify Partners",
  description:
    "Sync Shopify app installs and uninstalls into your CRM, collect merchant emails after OAuth, and win back churned stores. Flat $19/mo. 14-day free trial.",
  path: "/",
  type: "website"
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <BlogSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
