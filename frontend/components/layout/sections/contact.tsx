import { Building2, Clock, Mail, Phone } from "lucide-react";

import SectionContainer from "@/components/layout/section-container";
import SectionHeader from "@/components/layout/section-header";
import { getHomeSections, pickString, readPayload } from "@/lib/cms";

import { ContactForm } from "./contact-form";

export const ContactSection = async () => {
  const { sections } = await getHomeSections();
  const payload = readPayload<Record<string, unknown>>(sections, "contact");

  const location = pickString(payload, "location", "123 Maple Lane, Springfield, IL 62704");
  const phone = pickString(payload, "phone", "+1 (555) 987-6543");
  const email = pickString(payload, "email", "contact@ourcompany.com");
  const hours = pickString(payload, "hours", "Tuesday to Saturday, 9 AM - 5 PM");

  return (
    <SectionContainer id="contact">
      <SectionHeader
        subTitle={pickString(payload, "eyebrow", "Contact")}
        title={pickString(payload, "headline", "Get Connect With Us")}
        description={pickString(
          payload,
          "sub",
          "Stay in touch with us for updates, support, and valuable insights. We're here to help you every step of the way!"
        )}
      />
      <section className="mx-auto grid max-w-screen-lg grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="flex flex-col gap-6 *:rounded-lg *:border *:p-6">
            <div className="bg-muted">
              <div className="mb-4 flex items-center gap-3">
                <Building2 className="size-4" />
                <div className="font-bold">Location:</div>
              </div>
              <div className="text-muted-foreground">{location}</div>
            </div>

            <div className="bg-muted">
              <div className="mb-4 flex items-center gap-3">
                <Phone className="size-4" />
                <div className="font-bold">Call us:</div>
              </div>
              <div className="text-muted-foreground">{phone}</div>
            </div>

            <div className="bg-muted">
              <div className="mb-4 flex items-center gap-3">
                <Mail className="size-4" />
                <div className="font-bold">Email us:</div>
              </div>
              <div className="text-muted-foreground">{email}</div>
            </div>

            <div className="bg-muted">
              <div className="mb-4 flex items-center gap-3">
                <Clock className="size-4" />
                <div className="font-bold">Business Hours:</div>
              </div>
              <div className="text-muted-foreground">{hours}</div>
            </div>
          </div>
        </div>

        <ContactForm contactEmail={email} />
      </section>
    </SectionContainer>
  );
};
