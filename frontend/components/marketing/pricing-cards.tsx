"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export interface PricingPlanItem {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  currency: string;
  features: string[];
  cta: string;
  ctaUrl: string;
  popular?: boolean;
}

interface Props {
  plans: PricingPlanItem[];
  /** When true, render a "Compare plans →" link below the cards. */
  showCompareLink?: boolean;
  compareUrl?: string;
  compareLabel?: string;
}

type Period = "monthly" | "yearly";

function currencySymbol(code: string): string {
  if (!code) return "$";
  const map: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", BDT: "৳" };
  return map[code.toUpperCase()] ?? `${code} `;
}

function format(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export const PricingCards = ({
  plans,
  showCompareLink = false,
  compareUrl = "/pricing",
  compareLabel = "Compare full plans"
}: Props) => {
  const [period, setPeriod] = useState<Period>("yearly");
  const isPair = plans.length === 2;

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Period toggle */}
      <div className="mb-12 flex justify-center sm:mb-16">
        <div className="bg-background/70 inline-flex items-center gap-1 rounded-full border p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => setPeriod("monthly")}
            className={cn(
              "rounded-full px-5 py-1.5 text-sm font-medium transition-colors",
              period === "monthly"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setPeriod("yearly")}
            className={cn(
              "rounded-full px-5 py-1.5 text-sm font-medium transition-colors",
              period === "yearly"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Stitched-corners card pair */}
      <div className="mx-auto grid max-w-lg grid-cols-1 gap-y-6 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {plans.map((plan, idx) => {
          const symbol = currencySymbol(plan.currency);
          const monthlyEquivalent =
            period === "yearly" && plan.yearly > 0 ? plan.yearly / 12 : plan.monthly;
          const yearlyTotal = plan.yearly;
          const yearlySavings = plan.monthly * 12 - plan.yearly;

          // Card-pair stitching: the left card has its right corners flattened
          // on lg+ so it visually butts up against the popular card on the right.
          const leftCard = isPair && idx === 0;
          const rightCard = isPair && idx === plans.length - 1;
          const isPopular = plan.popular === true;

          return (
            <article
              key={plan.name}
              aria-labelledby={`tier-${plan.name}`}
              className={cn(
                "relative flex flex-col",
                "p-8 sm:p-10",
                // Pro is offset down so it appears slightly shorter than
                // Business while their bottom edges still align — same gap
                // below both cards.
                leftCard && "lg:my-6",
                "rounded-3xl ring-1 transition-all duration-300",
                isPopular
                  ? "bg-foreground text-background ring-foreground/10 shadow-2xl"
                  : "bg-background/70 text-foreground ring-foreground/10 backdrop-blur",
                // Stitched corners on the LEFT (Pro) card only — Business
                // stays fully rounded on all four sides.
                leftCard &&
                  "sm:mx-8 sm:rounded-b-none lg:mx-0 lg:rounded-tr-none lg:rounded-br-none lg:rounded-bl-3xl"
              )}
            >
              {isPopular ? (
                <div className="absolute -top-3 right-6">
                  <Badge className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase shadow-lg">
                    Most popular
                  </Badge>
                </div>
              ) : null}

              <h3
                id={`tier-${plan.name}`}
                className={cn(
                  "text-base font-semibold",
                  isPopular ? "text-[#47BEB2]" : "text-primary"
                )}
              >
                {plan.name}
              </h3>

              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={cn(
                    "text-5xl font-semibold tracking-tight",
                    isPopular ? "text-background" : "text-foreground"
                  )}
                >
                  {symbol}
                  {format(monthlyEquivalent)}
                </span>
                <span
                  className={cn(
                    "text-base",
                    isPopular ? "text-background/60" : "text-muted-foreground"
                  )}
                >
                  /month
                </span>
              </p>

              <p
                className={cn(
                  "mt-2 text-xs",
                  isPopular ? "text-background/50" : "text-muted-foreground"
                )}
              >
                {period === "yearly" && yearlyTotal > 0
                  ? `Billed ${symbol}${format(yearlyTotal)} annually${
                      yearlySavings > 0 ? ` · save ${symbol}${format(yearlySavings)}` : ""
                    }`
                  : "Billed monthly · cancel anytime"}
              </p>

              {plan.description ? (
                <p
                  className={cn(
                    "mt-6 text-base leading-7",
                    isPopular ? "text-background/80" : "text-muted-foreground"
                  )}
                >
                  {plan.description}
                </p>
              ) : null}

              <ul
                role="list"
                className={cn(
                  "mt-8 flex-1 space-y-3 text-sm leading-6 sm:mt-10",
                  isPopular ? "text-background/80" : "text-muted-foreground"
                )}
              >
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex gap-x-3">
                    <Check
                      aria-hidden
                      className={cn(
                        "mt-0.5 size-5 flex-none",
                        isPopular ? "text-[#47BEB2]" : "text-primary"
                      )}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className={cn(
                  "mt-10 flex w-full items-center justify-center sm:mt-12",
                  isPopular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-primary ring-primary/30 hover:ring-primary bg-transparent shadow-none ring-1 ring-inset hover:bg-transparent"
                )}
              >
                <Link
                  href={plan.ctaUrl}
                  aria-describedby={`tier-${plan.name}`}
                  className="inline-flex items-center justify-center"
                  onClick={() =>
                    trackEvent("pricing_plan_clicked", {
                      plan: plan.name,
                      period,
                      popular: isPopular
                    })
                  }
                >
                  {plan.cta}
                </Link>
              </Button>
            </article>
          );
        })}
      </div>

      {showCompareLink ? (
        <div className="mt-12 text-center">
          <Button asChild variant="link">
            <Link href={compareUrl}>
              {compareLabel}
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
};
