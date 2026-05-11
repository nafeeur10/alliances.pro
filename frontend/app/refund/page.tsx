import type { Metadata } from "next";

import { FooterSection } from "@/components/layout/sections/footer";
import { MarkdownArticle } from "@/components/marketing/markdown-article";
import { SectionShell } from "@/components/marketing/section-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Refund Policy — Alliances PRO",
  description:
    "How refunds, cancellations, and billing disputes work for Alliances PRO subscriptions.",
  path: "/refund"
});

const LAST_UPDATED = "May 11, 2026";

const REFUND = `This Refund Policy explains when and how you can request a refund for an Alliances PRO subscription. It applies to all paid plans purchased through our website. By subscribing to Alliances PRO you agree to the terms below, in addition to our [Terms of Service](/terms).

## 1. Merchant of Record

Alliances PRO uses **Paddle.com** as our payment processor and Merchant of Record. Paddle handles billing, tax collection, and refund execution on our behalf. Refunds approved under this policy are issued back to the original payment method via Paddle and typically arrive within 5–10 business days, depending on your bank or card issuer.

## 2. 14-Day Money-Back Guarantee

We offer a **14-day money-back guarantee** on your *first* paid subscription to Alliances PRO. If the Service does not meet your needs, you may request a full refund within 14 days of your initial charge, no questions asked. The guarantee covers:

- The first month of a new monthly plan, or
- The first billing cycle of a new annual plan.

The guarantee does **not** apply to:

- Renewals of a subscription you have already used past the initial 14-day window.
- Repeat purchases after a prior refund on the same account.
- Add-ons, one-time fees, or usage-based charges that have already been consumed.

## 3. Cancellations and Renewals

You can cancel your subscription at any time from your workspace billing page. Cancelling stops future renewals; it does **not** automatically trigger a refund for the current billing period. Your plan remains active until the end of the period you've already paid for.

For **annual plans**, we do not provide pro-rated refunds for unused months after the 14-day window has passed. We recommend monthly billing if you are unsure about long-term fit.

## 4. Failed Charges and Duplicate Payments

If you were charged in error — for example, a duplicate charge, a charge after cancellation, or a charge for a plan you did not authorize — contact us within 60 days and we will investigate and refund verified errors in full.

## 5. Service Outages

We aim for 99.9% uptime. If a prolonged outage materially prevents you from using the Service for an extended period, contact us and we will consider a service credit or partial refund on a case-by-case basis.

## 6. Non-Refundable Items

The following are non-refundable except where required by law:

- Subscription fees outside the 14-day window described in Section 2.
- Usage-based charges (API calls, seats, storage overages, etc.) already incurred.
- Accounts terminated for breach of our [Terms of Service](/terms), including abuse, fraud, chargeback abuse, or violations of acceptable use.

## 7. How to Request a Refund

Email **alliancesprohq@gmail.com** from the email address associated with your Alliances PRO account and include:

1. The email and workspace name on the account.
2. The Paddle order ID or invoice number (found in your receipt email from Paddle).
3. A brief reason for the request.

We aim to respond within 2 business days. If approved, the refund is initiated through Paddle the same business day.

## 8. Chargebacks

Please contact us before filing a chargeback with your bank or card issuer. Most billing issues can be resolved directly and faster through support. Chargebacks filed without first contacting us may result in suspension of the associated account pending resolution.

## 9. Changes to This Policy

We may update this Refund Policy from time to time. Material changes will be announced via the changelog and email at least 30 days before they take effect. The version in effect at the time of your purchase governs that purchase.

## 10. Contact

Questions about refunds or billing? Email alliancesprohq@gmail.com.`;

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen">
      <SectionShell
        as="section"
        className="pt-32"
        eyebrow="Legal"
        heading="Refund Policy"
        subheading={`Last updated ${LAST_UPDATED}.`}
      >
        <div className="mx-auto max-w-3xl">
          <MarkdownArticle>{REFUND}</MarkdownArticle>
        </div>
      </SectionShell>

      <FooterSection />
    </main>
  );
}
