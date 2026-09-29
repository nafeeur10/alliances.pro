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

const LAST_UPDATED = "May 21, 2026";

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

## 5. Google user data (Gmail connection)

Connecting a Gmail or Google Workspace mailbox is optional. It exists so the email you send to your own contacts leaves from your address over Google's API rather than through a shared relay. If you never connect a mailbox, none of this applies to you.

**What we ask for.** One scope only — \`https://www.googleapis.com/auth/gmail.send\` — plus your email address and basic profile so we can show which mailbox is connected. \`gmail.send\` permits sending on your behalf and nothing else: it grants no ability to read, search, list, modify or delete anything in your mailbox, and we hold no permission that would let us.

**What we do with it.** We use the token solely to deliver the messages you compose in this application, at the moment you press Send, to the recipients you chose. We never send on your behalf without an action by you, and we never use your Gmail connection for our own mail, for marketing, or for anything you did not initiate.

**What we store.** The OAuth access and refresh tokens, encrypted at rest, and the address of the connected mailbox. Messages you send are stored in your workspace as part of your CRM records, exactly as they would be for any other sending method. We do not copy, index or retain the contents of your Gmail mailbox, because we cannot read it.

**What we never do.** We do not sell Google user data, transfer it to third parties for advertising, credit assessment or resale, or use it to train generalised artificial-intelligence or machine-learning models. Human beings do not read it, except in the narrow cases Google permits: with your explicit consent, for security investigations, or where the law requires it.

**Disconnecting.** You can disconnect the mailbox at any time under Settings → Email, which deletes the stored tokens immediately. You may also revoke access directly at [myaccount.google.com/permissions](https://myaccount.google.com/permissions). Either action ends our ability to send on your behalf at once.

**Limited Use.** Our use and transfer of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.

## 6. Security

We use TLS in transit, encryption at rest, scoped access controls, and standard industry safeguards. No system is perfectly secure; report any concerns to alliancesprohq@gmail.com.

## 7. Your Rights

Depending on where you live (EU, UK, California, and others), you may have rights to:
- Access the personal data we hold about you
- Correct or delete it
- Object to or restrict certain processing
- Receive a portable copy
- Withdraw consent for marketing communications

To exercise any of these, email alliancesprohq@gmail.com from the address on your account.

## 8. International Transfers

If you access the Service from outside the country where our servers are located, your data will be transferred internationally. We rely on standard contractual clauses where required.

## 9. Children

The Service is not intended for use by children under 16. We do not knowingly collect data from children.

## 10. Changes

We may update this Policy from time to time. Material changes will be announced via email and the changelog at least 30 days before they take effect.

## 11. Contact

Questions or requests? Email alliancesprohq@gmail.com.`;

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
