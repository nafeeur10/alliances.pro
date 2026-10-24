"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

/**
 * Contact form → email, sent straight from the Next.js server over SMTP.
 * Does not touch the Laravel marketing API.
 *
 * Env (server-only): SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
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

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP_HOST / SMTP_USER / SMTP_PASS not set");
    return { ok: false, error: "Email is not configured yet. Please email us directly." };
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

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

  try {
    await transporter.sendMail({
      from: `"Alliances Pro Website" <${SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || DEFAULT_TO,
      replyTo: `"${fullName.replace(/"/g, "")}" <${values.email}>`,
      subject: subjectLine,
      text,
      html
    });
    return { ok: true };
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return { ok: false, error: "Could not send your message. Please try again." };
  }
}
