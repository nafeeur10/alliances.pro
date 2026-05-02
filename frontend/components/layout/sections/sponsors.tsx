import Image from "next/image";

import { sponsors } from "@/@data/sponsors";
import { InfiniteSlider } from "@/components/ui/extras/infinite-slider";

export const SponsorsSection = () => {
  if (sponsors.length === 0) return null;

  return (
    <section className="pb-12 lg:pb-24">
      <div className="container mask-r-from-50% mask-r-to-90% mask-l-from-50% mask-l-to-90%">
        <InfiniteSlider gap={50} speedOnHover={40}>
          {sponsors.map(({ name, logo }) => (
            <div
              key={name}
              className="text-foreground/80 flex items-center text-base font-medium md:text-lg"
            >
              <Image
                src={logo}
                alt={name}
                width={28}
                height={28}
                className="mr-3 size-6 object-contain md:size-7"
                unoptimized
              />
              {name}
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
};
