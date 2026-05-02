import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SectionContainer from "@/components/layout/section-container";
import SectionHeader from "@/components/layout/section-header";
import { getHomeSections, pickString, readPayload } from "@/lib/cms";

export async function NewsletterSection() {
  const { sections } = await getHomeSections();
  const payload = readPayload<Record<string, unknown>>(sections, "newsletter");

  const titleLead = pickString(payload, "title_lead", "Join Our Daily");
  const titleHighlight = pickString(payload, "title_highlight", "Newsletter");
  const description = pickString(
    payload,
    "sub",
    "Subscribe to receive the latest updates, insights, and exclusive offers directly to your inbox."
  );
  const placeholder = pickString(payload, "placeholder", "you@example.com");
  const ctaLabel = pickString(payload, "cta_label", "Subscribe");

  return (
    <SectionContainer>
      <SectionHeader
        title={
          <>
            {titleLead}{" "}
            <span className="from-primary/60 to-primary bg-linear-to-b bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </>
        }
        description={description}
      />
      <form className="mx-auto flex w-full flex-col gap-4 md:w-6/12 md:flex-row md:gap-2 lg:w-4/12">
        <Input
          placeholder={placeholder}
          className="bg-muted/50 dark:bg-muted/80"
          aria-label="email"
        />
        <Button>{ctaLabel}</Button>
      </form>
    </SectionContainer>
  );
}
