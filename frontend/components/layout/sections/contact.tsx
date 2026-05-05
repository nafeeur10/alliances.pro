import Image from "next/image";

import { contactSection } from "@/@data/contact";
import SectionContainer from "@/components/layout/section-container";
import { Badge } from "@/components/ui/badge";

import { ContactForm } from "./contact-form";

export const ContactSection = () => {
  const { eyebrow, headline, description, location, phone, email, hoursPrimary, hoursSecondary } =
    contactSection;

  // Strip everything that isn't a digit so wa.me/tel: links are well-formed.
  const phoneDigits = phone.replace(/\D/g, "");

  return (
    <SectionContainer id="contact" className="bg-muted/30 pt-20 sm:pt-32">
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-12">
        <Badge
          variant="outline"
          className="bg-background/60 mb-5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase backdrop-blur"
        >
          <span className="bg-primary mr-2 inline-block size-1.5 rounded-full" />
          {eyebrow}
        </Badge>
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">{headline}</h2>
        <p className="text-muted-foreground text-base md:text-lg">{description}</p>
      </div>
      <section className="mx-auto grid max-w-screen-lg grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="flex flex-col gap-6 *:rounded-lg *:border *:p-6">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted hover:border-primary/40 block transition-colors"
            >
              <div className="mb-4 flex items-center gap-3">
                <Image
                  src="/icons/location-pin.svg"
                  alt=""
                  aria-hidden
                  width={28}
                  height={28}
                  unoptimized
                  className="size-7"
                />
                <div className="font-bold">Location:</div>
              </div>
              <div className="text-muted-foreground">{location}</div>
            </a>

            <a
              href={`https://wa.me/${phoneDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted hover:border-primary/40 block transition-colors"
            >
              <div className="mb-4 flex items-center gap-3">
                <Image
                  src="/icons/whatsapp.svg"
                  alt=""
                  aria-hidden
                  width={28}
                  height={28}
                  unoptimized
                  className="size-7"
                />
                <div className="font-bold">WhatsApp Message:</div>
              </div>
              <div className="text-muted-foreground">{phone}</div>
            </a>

            <a
              href={`mailto:${email}`}
              className="bg-muted hover:border-primary/40 block transition-colors"
            >
              <div className="mb-4 flex items-center gap-3">
                <Image
                  src="/icons/email.svg"
                  alt=""
                  aria-hidden
                  width={28}
                  height={28}
                  unoptimized
                  className="size-7"
                />
                <div className="font-bold">Email us:</div>
              </div>
              <div className="text-muted-foreground">{email}</div>
            </a>

            <div className="bg-muted">
              <div className="mb-4 flex items-center gap-3">
                <Image
                  src="/icons/support-headset.svg"
                  alt=""
                  aria-hidden
                  width={28}
                  height={28}
                  unoptimized
                  className="size-7"
                />
                <div className="font-bold">Support Availability:</div>
              </div>
              <div className="text-muted-foreground">
                <div>{hoursPrimary}</div>
                <div>{hoursSecondary}</div>
              </div>
            </div>
          </div>
        </div>

        <ContactForm contactEmail={email} />
      </section>
    </SectionContainer>
  );
};
