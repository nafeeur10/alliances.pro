import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ComparePlan {
  name: string;
  /** Numeric/textual limits, e.g. { team_members: 10, leads: "unlimited" } */
  limits: Record<string, unknown>;
  /** Pretty monthly equivalent string e.g. "$15.83" */
  priceLabel: string;
  /** Sublabel e.g. "/mo (yearly)" */
  priceSub: string;
}

export interface CompareExtraRow {
  feature: string;
  /** Per-plan presence/value keyed by plan name. true/false for check, or string for label. */
  values: Record<string, boolean | string>;
}

interface Props {
  plans: ComparePlan[];
  extraRows?: CompareExtraRow[];
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Map snake_case limit keys to nice labels. */
  limitLabels?: Record<string, string>;
}

const DEFAULT_LIMIT_LABELS: Record<string, string> = {
  leads: "Leads",
  tasks: "Tasks & Deals",
  projects: "Projects",
  organizations: "Organizations",
  team_members: "Members",
  members: "Members",
  contacts: "Contacts",
  storage: "Storage",
  api_calls: "API calls"
};

function prettyValue(v: unknown): string {
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "boolean") return v ? "✓" : "—";
  if (typeof v === "number") return v.toLocaleString("en-US");
  const s = String(v).trim();
  if (s.toLowerCase() === "unlimited") return "Unlimited";
  return s;
}

function unionLimitKeys(plans: ComparePlan[]): string[] {
  const seen = new Set<string>();
  for (const p of plans) {
    for (const k of Object.keys(p.limits ?? {})) seen.add(k);
  }
  // Stable order: known keys first in DEFAULT_LIMIT_LABELS order, then the rest alphabetically
  const known = Object.keys(DEFAULT_LIMIT_LABELS).filter((k) => seen.has(k));
  const rest = [...seen].filter((k) => !known.includes(k)).sort();
  return [...known, ...rest];
}

export const PricingCompare = ({
  plans,
  extraRows = [],
  eyebrow = "Compare plans",
  title = "All the details, side by side.",
  description,
  limitLabels = DEFAULT_LIMIT_LABELS
}: Props) => {
  if (plans.length === 0) return null;

  const limitKeys = unionLimitKeys(plans);

  return (
    <section className="container py-20 lg:py-28">
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <p className="text-primary text-sm font-medium tracking-wider uppercase">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {description ? <p className="text-muted-foreground mt-4 text-base">{description}</p> : null}
      </div>

      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-muted-foreground px-6 py-4 text-left font-medium">Feature</th>
                {plans.map((p) => (
                  <th key={p.name} className="px-6 py-4 text-left font-semibold">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {limitKeys.map((key, idx) => (
                <tr
                  key={key}
                  className={cn("border-b last:border-b-0", idx % 2 === 1 ? "bg-muted/20" : "")}
                >
                  <td className="text-muted-foreground px-6 py-4 font-medium">
                    {limitLabels[key] ?? key}
                  </td>
                  {plans.map((p) => (
                    <td key={p.name} className="text-foreground px-6 py-4">
                      {prettyValue(p.limits?.[key])}
                    </td>
                  ))}
                </tr>
              ))}

              {extraRows.map((row, idx) => (
                <tr
                  key={`x-${row.feature}`}
                  className={cn(
                    "border-b last:border-b-0",
                    (limitKeys.length + idx) % 2 === 1 ? "bg-muted/20" : ""
                  )}
                >
                  <td className="text-muted-foreground px-6 py-4 font-medium">{row.feature}</td>
                  {plans.map((p) => {
                    const v = row.values?.[p.name];
                    if (typeof v === "boolean") {
                      return (
                        <td key={p.name} className="px-6 py-4">
                          {v ? (
                            <Check className="text-primary size-5" />
                          ) : (
                            <Minus className="text-muted-foreground size-4" />
                          )}
                        </td>
                      );
                    }
                    return (
                      <td key={p.name} className="text-foreground px-6 py-4">
                        {prettyValue(v)}
                      </td>
                    );
                  })}
                </tr>
              ))}

              <tr className="bg-muted/30 border-t-2">
                <td className="text-muted-foreground px-6 py-5 font-semibold">Price (yearly)</td>
                {plans.map((p) => (
                  <td key={p.name} className="px-6 py-5">
                    <span className="text-foreground text-2xl font-bold">{p.priceLabel}</span>
                    <span className="text-muted-foreground ml-1 text-xs">{p.priceSub}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
