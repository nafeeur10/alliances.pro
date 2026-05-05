import type { Metadata } from "next";

import { FooterSection } from "@/components/layout/sections/footer";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { SectionShell } from "@/components/marketing/section-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy — Alliances PRO",
  description: "How we collect, use, and protect your information at Alliances PRO.",
  path: "/privacy"
});

const LAST_UPDATED = "May 5, 2026";

const PRIVACY = `This Privacy Policy explains how Alliances PRO (operated by Deque Lab) collects, uses, and protects information when you use our website and services (the "Service"). By using the Service, you agree to this Policy.

## 1. Information We Collect

**Account information.** Name, email, company, and password hash when you sign up.
**Customer Data.** Anything you store inside the Service — leads, contacts, notes, files. You retain ownership.
**Usage data.** Aggregated, anonymized telemetry: pages viewed, features used, errors. We use this to improve the product.
**Marketing site analytics.** We run privacy-friendly Plausible Analytics by default (no cookies, no personal data). If you opt in via consent, we also load Google Analytics 4.

## 2. Cookies

The marketing site uses minimal first-party cookies for session continuity and theme preference. Plausible does not set tracking cookies. Google Analytics, when enabled, sets cookies as documented by Google.

## 3. How We Use Your Information

- Operate, maintain, and improve the Service
- Send transactional email (account, billing, security alerts)
- Send marketing email if you've subscribed (you can unsubscribe any time)
- Respond to support requests
- Detect and prevent fraud or abuse
- Comply with legal obligations

We do **not** sell your personal information.

## 4. Sharing

We share information only with:
- **Service providers** under contract (cloud hosting, email delivery, payment processing) who handle data only on our instructions
- **Authorities** when required by law or to protect rights and safety
- **Successors** in the event of a merger, acquisition, or asset sale (with notice to you)

## 5. Security

We use TLS in transit, encryption at rest, scoped access controls, and standard industry safeguards. No system is perfectly secure; report any concerns to security@alliances.pro.

## 6. Your Rights

Depending on where you live (EU, UK, California, and others), you may have rights to:
- Access the personal data we hold about you
- Correct or delete it
- Object to or restrict certain processing
- Receive a portable copy
- Withdraw consent for marketing communications

To exercise any of these, email hello@alliances.pro from the address on your account.

## 7. International Transfers

If you access the Service from outside the country where our servers are located, your data will be transferred internationally. We rely on standard contractual clauses where required.

## 8. Children

The Service is not intended for use by children under 16. We do not knowingly collect data from children.

## 9. Changes

We may update this Policy from time to time. Material changes will be announced via email and the changelog at least 30 days before they take effect.

## 10. Contact

Questions or requests? Email hello@alliances.pro.`;

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <SectionShell
        as="section"
        className="pt-32"
        eyebrow="Legal"
        heading="Privacy Policy"
        subheading={`Last updated ${LAST_UPDATED}.`}
      >
        <div className="mx-auto max-w-3xl">
          <MarkdownArticle>{PRIVACY}</MarkdownArticle>
        </div>
      </SectionShell>

      <FooterSection />
    </main>
  );
}
