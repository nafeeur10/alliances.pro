import type { Metadata } from "next";

import { FooterSection } from "@/components/layout/sections/footer";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { SectionShell } from "@/components/marketing/section-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service — Alliances PRO",
  description: "The terms governing your use of Alliances PRO.",
  path: "/terms"
});

const LAST_UPDATED = "May 5, 2026";

const TERMS = `These Terms of Service ("Terms") govern your access to and use of Alliances PRO (the "Service"), operated by Deque Lab. By using the Service you agree to these Terms.

## 1. Eligibility

You must be at least 18 years old and able to enter a binding contract to use the Service. If you use the Service on behalf of a company, you represent that you have authority to bind that company to these Terms.

## 2. Your Account

You are responsible for safeguarding your account credentials and for all activity that occurs under your account. Notify us promptly at hello@alliances.pro if you suspect unauthorized access.

## 3. Acceptable Use

You agree not to: (a) reverse-engineer, decompile, or attempt to extract source code from the Service; (b) use the Service to send unsolicited bulk email or store unlawful content; (c) interfere with the integrity or performance of the Service; (d) attempt to access another customer's data without authorization.

## 4. Subscription and Billing

Paid plans are billed monthly or annually in advance. You can cancel any time from your workspace billing page; cancellations take effect at the end of the current billing period. Fees paid are non-refundable except where required by law. We may adjust pricing with 30 days' notice for renewals.

## 5. Your Content

You retain all rights to data and content you upload to the Service ("Customer Data"). You grant us a limited license to host, process, and display Customer Data solely to operate and improve the Service. We will not access Customer Data except as needed to provide support, prevent abuse, or comply with law.

## 6. Confidentiality and Security

We treat Customer Data as confidential and apply industry-standard administrative, technical, and physical safeguards. See our Privacy Policy for details.

## 7. Service Availability

We aim for 99.9% uptime but do not guarantee uninterrupted availability. Scheduled maintenance is announced in advance via the changelog and email.

## 8. Termination

You may terminate your account any time. We may suspend or terminate your account for material breach of these Terms with reasonable notice. On termination, you may export your data within 30 days, after which we may delete it.

## 9. Disclaimers

The Service is provided "as is" and "as available." To the fullest extent permitted by law, we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.

## 10. Limitation of Liability

Our aggregate liability arising out of or related to the Service will not exceed the fees you paid us in the 12 months preceding the claim. We are not liable for indirect, incidental, special, consequential, or punitive damages.

## 11. Changes to These Terms

We may update these Terms from time to time. Material changes will be announced via the changelog and email at least 30 days before they take effect. Continued use after changes take effect constitutes acceptance.

## 12. Contact

Questions about these Terms? Email hello@alliances.pro.`;

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <SectionShell
        as="section"
        className="pt-32"
        eyebrow="Legal"
        heading="Terms of Service"
        subheading={`Last updated ${LAST_UPDATED}.`}
      >
        <div className="mx-auto max-w-3xl">
          <MarkdownArticle>{TERMS}</MarkdownArticle>
        </div>
      </SectionShell>

      <FooterSection />
    </main>
  );
}
