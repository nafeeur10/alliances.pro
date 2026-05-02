import { FAQList as fallbackFaqs } from "@/@data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { listFaqs } from "@/lib/api";
import { getHomeSections, pickString, readPayload } from "@/lib/cms";

import SectionContainer from "../section-container";
import SectionHeader from "../section-header";

interface FaqItem {
  question: string;
  answer: string;
  value: string;
}

export const FAQSection = async () => {
  const [grouped, { sections }] = await Promise.all([listFaqs(), getHomeSections()]);
  const header = readPayload<Record<string, unknown>>(sections, "faq");

  const items: FaqItem[] = grouped
    ? Object.values(grouped)
        .flat()
        .map((f, i) => ({
          question: f.question,
          answer: f.answer,
          value: `faq-${f.id ?? i}`
        }))
    : fallbackFaqs.map((f) => ({ question: f.question, answer: f.answer, value: f.value }));

  return (
    <SectionContainer>
      <SectionHeader
        subTitle={pickString(header, "eyebrow", "FAQS")}
        title={pickString(header, "headline", "Common Questions")}
        description={pickString(header, "sub", "")}
      />
      <div className="mx-auto max-w-(--breakpoint-sm)">
        <Accordion type="single" collapsible className="AccordionRoot">
          {items.map(({ question, answer, value }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-left text-lg">{question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionContainer>
  );
};
