import type { Metadata } from "next";

import { helpFaqs } from "@/@data/help";
import { FooterSection } from "@/components/layout/sections/footer";
import { SectionShell } from "@/components/marketing/section-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { FAQPageSchema } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Help Center — Alliances PRO",
  description: "Common questions about Alliances PRO — pricing, plans, imports, support, and more.",
  path: "/help"
});

export default function HelpPage() {
  return (
    <main className="min-h-screen">
      <SectionShell
        as="section"
        className="pt-32"
        eyebrow="Help Center"
        heading="How can we help?"
        subheading="Answers to the questions we get most. Can't find what you need? Use the contact form on the home page or reach us on WhatsApp."
      >
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {helpFaqs.map((faq, idx) => (
              <AccordionItem key={faq.question} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionShell>

      <FAQPageSchema items={helpFaqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <FooterSection />
    </main>
  );
}
