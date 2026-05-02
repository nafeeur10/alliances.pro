import { featureList as fallbackFeatures } from "@/@data/features";
import { listFeatures } from "@/lib/api";
import { getHomeSections, pickString, readPayload } from "@/lib/cms";

import { FeaturesSectionClient, type FeatureItem } from "./features-client";

export const FeaturesSection = async () => {
  const [apiFeatures, { sections }] = await Promise.all([listFeatures(), getHomeSections()]);
  const header = readPayload<Record<string, unknown>>(sections, "features");

  const items: FeatureItem[] =
    apiFeatures && apiFeatures.length > 0
      ? apiFeatures.map((f) => ({
          icon: f.icon ?? "Sparkles",
          title: f.name,
          description: f.tagline ?? f.body ?? ""
        }))
      : fallbackFeatures.map((f) => ({
          icon: f.icon,
          title: f.title,
          description: f.description
        }));

  return (
    <FeaturesSectionClient
      items={items}
      subTitle={pickString(header, "eyebrow", "Features")}
      title={pickString(header, "headline", "Everything You Need to Succeed")}
      description={pickString(
        header,
        "sub",
        "Our comprehensive CRM platform provides all the tools you need to manage clients, streamline operations, and grow your service business."
      )}
    />
  );
};
