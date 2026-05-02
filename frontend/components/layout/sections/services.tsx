import { Badge } from "@/components/ui/badge";
import { ProService, serviceList as fallbackServices } from "@/@data/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionContainer from "@/components/layout/section-container";
import SectionHeader from "@/components/layout/section-header";
import { getHomeSections, pickArray, pickString, readPayload } from "@/lib/cms";

interface ServiceItem {
  title: string;
  description: string;
  pro?: boolean;
}

export const ServicesSection = async () => {
  const { sections } = await getHomeSections();
  const payload = readPayload<Record<string, unknown>>(sections, "services");

  const items = pickArray<ServiceItem>(
    payload,
    "items",
    fallbackServices.map((s) => ({
      title: s.title,
      description: s.description,
      pro: s.pro === ProService.YES
    }))
  );

  return (
    <SectionContainer id="solutions">
      <SectionHeader
        subTitle={pickString(payload, "eyebrow", "Services")}
        title={pickString(payload, "headline", "Comprehensive Service Solutions")}
        description={pickString(
          payload,
          "sub",
          "From client onboarding to advanced analytics, we provide everything you need to deliver exceptional service and scale your business."
        )}
      />
      <div className="mx-auto grid w-full max-w-(--breakpoint-lg) gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {items.map(({ title, description, pro }) => (
          <Card key={title} className="bg-muted relative h-full gap-2">
            <CardHeader>
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{description}</p>
            </CardContent>
            <Badge
              data-pro={pro === true}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
};
