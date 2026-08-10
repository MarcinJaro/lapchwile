import nodemailer from "nodemailer";
import { siteConfig } from "@/content/site-config";
import type { ReservationRequest } from "./reservation-adapter";

/**
 * E-mail delivery. Two interchangeable transports, picked by env:
 *
 * 1. SMTP (preferred when configured) - any existing mailbox:
 *    SMTP_HOST, SMTP_PORT (465 = SSL, 587 = STARTTLS), SMTP_USER, SMTP_PASS,
 *    optional SMTP_FROM ("Łap Chwile <kontakt@lapchwile.com>").
 *    Works with the lapchwile.com hosting mailbox or Gmail app password.
 *
 * 2. Resend HTTP API - RESEND_API_KEY, optional RESEND_FROM (defaults to
 *    the onboarding sender, which only delivers to the Resend account owner
 *    until lapchwile.com is verified).
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RESEND_DEFAULT_FROM = "Łap Chwile <onboarding@resend.dev>";

function smtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  );
}

export function isEmailConfigured(): boolean {
  return smtpConfigured() || Boolean(process.env.RESEND_API_KEY);
}

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

async function sendViaSmtp({ to, subject, html, replyTo }: EmailPayload): Promise<boolean> {
  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM || `"Łap Chwile" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    return true;
  } catch (error) {
    console.warn("[email] SMTP send failed:", error);
    return false;
  }
}

async function sendViaResend({ to, subject, html, replyTo }: EmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || RESEND_DEFAULT_FROM,
        to: [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!response.ok) {
      console.warn(
        `[email] Resend HTTP ${response.status}: ${await response.text()}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[email] Resend send failed:", error);
    return false;
  }
}

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (smtpConfigured()) return sendViaSmtp(payload);
  return sendViaResend(payload);
}

const BRAND = {
  ink: "#17223b",
  muted: "#5b667a",
  cream: "#faf3e7",
  yellow: "#ffd34d",
  blue: "#1754a8",
  red: "#f04438",
  green: "#14a66a",
};

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #efe6d6;font-weight:700;color:${BRAND.ink};white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #efe6d6;color:${BRAND.muted};">${value}</td>
    </tr>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/** Branded HTML for a reservation or contact submission. */
export function buildSubmissionEmailHtml(request: ReservationRequest): string {
  const isReservation = request.type === "rezerwacja";
  const heading = isReservation
    ? "Nowe zgłoszenie rezerwacji"
    : "Nowa wiadomość ze strony";

  const rows: string[] = [];
  if (request.preferredDate) rows.push(row("Preferowany termin", escapeHtml(request.preferredDate)));
  if (request.childrenCount) rows.push(row("Liczba dzieci", escapeHtml(request.childrenCount)));
  if (request.childAge) rows.push(row("Wiek dzieci", escapeHtml(request.childAge)));
  if (request.theme) rows.push(row("Motyw", escapeHtml(request.theme)));
  if (request.packageChoice) rows.push(row("Pakiet", escapeHtml(request.packageChoice)));
  if (request.extras?.length)
    rows.push(row("Dodatkowe atrakcje", escapeHtml(request.extras.join(", "))));
  rows.push(row("Imię i nazwisko", escapeHtml(request.parentName)));
  rows.push(
    row(
      "Telefon",
      `<a href="tel:${escapeHtml(request.phone.replace(/\s/g, ""))}" style="color:${BRAND.blue};font-weight:700;">${escapeHtml(request.phone)}</a>`
    )
  );
  rows.push(
    row(
      "E-mail",
      `<a href="mailto:${escapeHtml(request.email)}" style="color:${BRAND.blue};font-weight:700;">${escapeHtml(request.email)}</a>`
    )
  );
  if (request.message) rows.push(row("Wiadomość", escapeHtml(request.message)));

  return `<!doctype html>
<html lang="pl">
<body style="margin:0;padding:24px 12px;background:${BRAND.cream};font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(23,34,59,0.10);">
    <tr>
      <td style="padding:0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="height:6px;background:${BRAND.blue};"></td>
          <td style="height:6px;background:${BRAND.red};"></td>
          <td style="height:6px;background:${BRAND.yellow};"></td>
          <td style="height:6px;background:${BRAND.green};"></td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 24px 8px;text-align:center;">
        <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${BRAND.muted};">Łap Chwile · lapchwile.com</p>
        <h1 style="margin:10px 0 0;font-size:24px;line-height:1.25;color:${BRAND.ink};">
          ${heading}
          <span style="display:inline-block;background:${BRAND.yellow};border-radius:8px;padding:0 6px;">🎈</span>
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 24px 8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #efe6d6;border-radius:14px;overflow:hidden;font-size:14px;">
          ${rows.join("")}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px 28px;text-align:center;">
        <p style="margin:0;font-size:13px;color:${BRAND.muted};">
          Odpowiedz bezpośrednio na tego maila, aby napisać do zgłaszającego
          (Reply-To ustawione automatycznie).
        </p>
      </td>
    </tr>
  </table>
  <p style="max-width:560px;margin:14px auto 0;text-align:center;font-size:12px;color:${BRAND.muted};">
    Wiadomość wysłana automatycznie z formularza na ${siteConfig.domain.replace("https://", "")}
  </p>
</body>
</html>`;
}
