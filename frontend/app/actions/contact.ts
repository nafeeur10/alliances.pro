"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

/**
 * Contact form → email, sent straight from the Next.js server (Resend HTTPS API or SMTP).
 * Does not touch the Laravel marketing API.
 *
 * Env (server-only): RESEND_API_KEY (+ optional CONTACT_FROM_EMAIL), or
 * SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS. Plus
 * CONTACT_TO_EMAIL (defaults to alliancesprohq@gmail.com).
 */

const schema = z.object({
  firstName: z.string().trim().min(1).max(20),
  lastName: z.string().trim().min(1).max(20),
  email: z.string().trim().email(),
  subject: z.string().trim().min(1).max(100),
  message: z.string().trim().min(2).max(2000),
  pageUrl: z.string().max(500).optional(),
  // Honeypot: real users never see or fill this field.
  website: z.string().optional()
});

export type ContactInput = z.input<typeof schema>;
export type ContactResult = { ok: true } | { ok: false; error: string };

const DEFAULT_TO = "alliancesprohq@gmail.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(input: ContactInput): Promise<ContactResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }
  const values = parsed.data;

  // Bot filled the honeypot — pretend success so it doesn't retry.
  if (values.website) return { ok: true };

  const fullName = `${values.firstName} ${values.lastName}`;
  // Strip newlines so the name can't inject extra headers into the subject.
  const subjectLine = `[Contact] ${values.subject} — ${fullName}`.replace(/[\r\n]+/g, " ");

  const text = [
    `Name: ${fullName}`,
    `Email: ${values.email}`,
    `Subject: ${values.subject}`,
    values.pageUrl ? `Page: ${values.pageUrl}` : null,
    "",
    values.message
  ]
    .filter((line) => line !== null)
    .join("\n");

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(fullName)}<br>
    <strong>Email:</strong> ${escapeHtml(values.email)}<br>
    <strong>Subject:</strong> ${escapeHtml(values.subject)}${
      values.pageUrl ? `<br><strong>Page:</strong> ${escapeHtml(values.pageUrl)}` : ""
    }</p>
    <p style="white-space:pre-wrap">${escapeHtml(values.message)}</p>`;

  const mail: Mail = {
    to: process.env.CONTACT_TO_EMAIL || DEFAULT_TO,
    replyTo: `"${fullName.replace(/"/g, "")}" <${values.email}>`,
    subject: subjectLine,
    text,
    html
  };

  try {
    if (process.env.RESEND_API_KEY) {
      await sendViaResend(process.env.RESEND_API_KEY, mail);
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      await sendViaSmtp(mail);
    } else {
      console.error("[contact] neither RESEND_API_KEY nor SMTP_* is set");
      return { ok: false, error: "Email is not configured yet. Please email us directly." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] send failed:", err);
    return { ok: false, error: "Could not send your message. Please try again." };
  }
}

interface Mail {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

// Stay well under nginx's 60s proxy_read_timeout so the visitor sees an error, not a 504.
const SEND_TIMEOUT_MS = 15_000;

/** HTTPS (port 443) — works on hosts that block outbound SMTP, e.g. DigitalOcean. */
async function sendViaResend(apiKey: string, mail: Mail): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Alliances Pro Website <onboarding@resend.dev>",
      to: [mail.to],
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html
    }),
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    cache: "no-store"
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text().catch(() => "")}`);
  }
}

async function sendViaSmtp(mail: Mail): Promise<void> {
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER as string;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user, pass: process.env.SMTP_PASS },
    connectionTimeout: SEND_TIMEOUT_MS,
    greetingTimeout: SEND_TIMEOUT_MS,
    socketTimeout: SEND_TIMEOUT_MS
  });
  await transporter.sendMail({ from: `"Alliances Pro Website" <${user}>`, ...mail });
}
