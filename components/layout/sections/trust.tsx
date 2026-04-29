import { trustPointList } from "@/@data/trust";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/icon";
import SectionContainer from "@/components/layout/section-container";
import SectionHeader from "@/components/layout/section-header";

export const TrustSection = () => {
  return (
    <SectionContainer id="trust">
      <SectionHeader
        subTitle="Why Trust Us"
        title="Built Different. Built to Last."
        description="Most CRMs look great in demos. Alliances PRO is engineered to hold up in production — with the security, reliability, and architecture your business actually needs."
      />
      <div className="mx-auto grid max-w-(--breakpoint-xl) gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {trustPointList.map(({ icon, badge, problem, solution }) => (
          <Card
            key={badge}
            className="bg-muted group relative overflow-hidden border transition-colors hover:border-primary/40">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 ring-primary/10 mt-0.5 shrink-0 rounded-full p-2 ring-8">
                  <Icon name={icon} className="text-primary size-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <Badge variant="secondary" className="text-xs font-semibold">
                    {badge}
                  </Badge>
                  <div className="space-y-1.5">
                    <p className="text-muted-foreground line-through text-sm">{problem}</p>
                    <p className="text-foreground font-medium text-sm">{solution}</p>
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
