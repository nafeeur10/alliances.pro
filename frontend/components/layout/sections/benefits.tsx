import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { benefitList, benefitsSection } from "@/@data/benefits";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import SectionContainer from "../section-container";

function splitHeadline(headline: string): { lead: string; highlight: string } {
  const trimmed = headline.trim();
  if (!trimmed) return { lead: "", highlight: "" };
  const tokens = trimmed.split(/\s+/);
  if (tokens.length < 2) return { lead: "", highlight: trimmed };
  const highlightCount = tokens.length >= 5 ? 2 : 1;
  const lead = tokens.slice(0, tokens.length - highlightCount).join(" ");
  const highlight = tokens.slice(tokens.length - highlightCount).join(" ");
  return { lead, highlight };
}

// If "Alliances PRO" appears in the headline, split around it so the brand
// name gets its own gradient treatment. Returns null when the brand isn't
// present and the caller should fall back to splitHeadline.
function splitAroundBrand(
  headline: string
): { before: string; brand: string; after: string } | null {
  const match = headline.match(/(.*?)(Alliances\s+PRO)(.*)/i);
  if (!match) return null;
  return { before: match[1], brand: match[2], after: match[3] };
}

export const BenefitsSection = () => {
  const { eyebrow, headline, description } = benefitsSection;

  const brandSplit = splitAroundBrand(headline);
  const { lead, highlight } = brandSplit ? { lead: "", highlight: "" } : splitHeadline(headline);

  // Vertical gradient for the "Alliances PRO" wordmark inside the headline.
  // Top: bright brand blue. Bottom: teal accent. Flip to a hard 50/50 split
  // by adding `from-50% to-50%` to the gradient classes below.
  const brandGradientClass =
    "bg-gradient-to-b from-[#3D7BD9] to-[#47BEB2] bg-clip-text text-transparent";

  return (
    <SectionContainer id="benefits">
      <div className="relative">
        {/* soft brand glow behind the grid */}
        <div
          aria-hidden
          className="bg-primary/20 pointer-events-none absolute -top-16 left-1/2 -z-10 h-72 w-[80%] -translate-x-1/2 rounded-full blur-3xl"
        />

        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-16">
          <Badge
            variant="outline"
            className="bg-background/60 mb-5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase backdrop-blur"
          >
            <span className="bg-primary mr-2 inline-block size-1.5 rounded-full" />
            {eyebrow}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            {brandSplit ? (
              <>
                {brandSplit.before}
                <span className={brandGradientClass}>{brandSplit.brand}</span>
                {brandSplit.after}
              </>
            ) : (
              <>
                {lead ? <span>{lead} </span> : null}
                <span className="from-primary via-primary/70 to-primary bg-linear-to-tr bg-clip-text text-transparent">
                  {highlight}
                </span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground mt-5 text-base md:text-lg">{description}</p>
        </div>

        <div className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {benefitList.map((benefit, index) => {
            const featured = index === 0;
            return (
              <article
                key={`${benefit.title}-${index}`}
                className={cn(
                  "group bg-background/60 relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 sm:p-8",
                  "hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl",
                  featured && "md:col-span-2 lg:col-span-1"
                )}
              >
                {/* gradient sheen on hover */}
                <div
                  aria-hidden
                  className="from-primary/15 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* watermark numeral — top-right, soft */}
                <span
                  aria-hidden
                  className="text-foreground/10 group-hover:text-primary/25 absolute top-3 right-5 text-5xl leading-none font-black tracking-tight transition-colors duration-300 sm:text-6xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative flex h-full flex-col">
                  <div className="bg-background ring-border mb-4 flex size-12 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={benefit.icon}
                      alt=""
                      aria-hidden
                      width={28}
                      height={28}
                      unoptimized
                      className="size-7"
                    />
                  </div>
                  <h3 className="text-foreground mb-3 text-xl font-semibold tracking-tight sm:text-2xl">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    {benefit.description}
                  </p>

                  {/* always-visible CTA */}
                  <div className="text-primary mt-6 flex items-center gap-1.5 text-sm font-medium transition-transform duration-300 group-hover:translate-x-1">
                    <span>Learn more</span>
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>

                {/* gradient bottom border */}
                <span
                  aria-hidden
                  className="from-primary/0 via-primary/40 to-primary/0 absolute inset-x-6 bottom-0 h-px bg-linear-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </article>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
};
