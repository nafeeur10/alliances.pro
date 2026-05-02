import { trustPointList as fallbackTrust } from "@/@data/trust";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/icon";
import SectionContainer from "@/components/layout/section-container";
import SectionHeader from "@/components/layout/section-header";
import { getHomeSections, pickArray, pickString, readPayload } from "@/lib/cms";

interface TrustItem {
  icon?: string;
  badge?: string;
  problem?: string;
  solution?: string;
}

export const TrustSection = async () => {
  const { sections } = await getHomeSections();
  const payload = readPayload<Record<string, unknown>>(sections, "trust");

  const items = pickArray<TrustItem>(payload, "items", fallbackTrust);

  return (
    <SectionContainer id="trust">
      <SectionHeader
        subTitle={pickString(payload, "eyebrow", "Why Trust Us")}
        title={pickString(payload, "headline", "Built Different. Built to Last.")}
        description={pickString(
          payload,
          "sub",
          "Most CRMs look great in demos. Alliances PRO is engineered to hold up in production — with the security, reliability, and architecture your business actually needs."
        )}
      />
      <div className="mx-auto grid max-w-(--breakpoint-xl) gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {items.map(({ icon, badge, problem, solution }, index) => (
          <Card
            key={`${badge ?? "trust"}-${index}`}
            className="bg-muted group hover:border-primary/40 relative overflow-hidden border transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 ring-primary/10 mt-0.5 shrink-0 rounded-full p-2 ring-8">
                  <Icon name={icon ?? "ShieldCheck"} className="text-primary size-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  {badge ? (
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {badge}
                    </Badge>
                  ) : null}
                  <div className="space-y-1.5">
                    {problem ? (
                      <p className="text-muted-foreground text-sm line-through">{problem}</p>
                    ) : null}
                    {solution ? (
                      <p className="text-foreground text-sm font-medium">{solution}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
};
