import { featureList, featuresSection } from "@/@data/features";

import { FeaturesSectionClient, type FeatureItem } from "./features-client";

export const FeaturesSection = () => {
  const items: FeatureItem[] = featureList.map((f) => ({
    icon: f.icon,
    title: f.title,
    description: f.description,
    image: f.image,
    href: f.href,
    bgColor: f.bgColor
  }));

  return (
    <FeaturesSectionClient
      items={items}
      subTitle={featuresSection.eyebrow}
      title={featuresSection.headline}
      description={featuresSection.description}
    />
  );
};
