/**
 * Backend adapter boundary for reservation and contact submissions.
 *
 * Delivery goes through Resend (lib/email.ts) to the business mailbox
 * configured in site-config (notifications.to) when RESEND_API_KEY is set.
 * Without the key `delivered` stays false and the UI is honest about it:
 * it offers the composed message via mailto/phone instead of pretending
 * the submission was stored.
 */

import { siteConfig } from "@/content/site-config";
import {
  buildConfirmationEmailHtml,
  buildSubmissionEmailHtml,
  isEmailConfigured,
  sendEmail,
} from "./email";

export type ReservationRequest = {
  type: "rezerwacja" | "kontakt";
  preferredDate?: string;
  childrenCount?: string;
  childAge?: string;
  theme?: string;
  packageChoice?: string;
  extras?: string[];
  parentName: string;
  phone: string;
  email: string;
  message?: string;
};

export type DeliveryResult = {
  delivered: boolean;
  /** human-readable summary of the request, reused for the mailto fallback */
  summary: string;
};

export async function deliverReservation(
  request: ReservationRequest
): Promise<DeliveryResult> {
  const lines = [
    request.type === "rezerwacja" ? "Zgłoszenie rezerwacji" : "Wiadomość z formularza kontaktowego",
    "",
    request.preferredDate && `Preferowany termin: ${request.preferredDate}`,
    request.childrenCount && `Liczba dzieci: ${request.childrenCount}`,
    request.childAge && `Wiek dzieci: ${request.childAge}`,
    request.theme && `Motyw: ${request.theme}`,
    request.packageChoice && `Pakiet: ${request.packageChoice}`,
    request.extras?.length ? `Dodatkowe atrakcje: ${request.extras.join(", ")}` : undefined,
    `Imię i nazwisko: ${request.parentName}`,
    `Telefon: ${request.phone}`,
    `E-mail: ${request.email}`,
    request.message && `Wiadomość: ${request.message}`,
  ].filter(Boolean);

  const summary = lines.join("\n");

  if (isEmailConfigured()) {
    const subject =
      request.type === "rezerwacja"
        ? `Rezerwacja: ${request.preferredDate ?? "termin do ustalenia"} · ${request.childrenCount ?? "?"} dzieci · ${request.parentName}`
        : `Wiadomość ze strony: ${request.parentName}`;
    const delivered = await sendEmail({
      to: siteConfig.notifications.to,
      subject,
      html: buildSubmissionEmailHtml(request),
      replyTo: request.email,
    });
    if (delivered) {
      console.info("[reservation-adapter] submission emailed to " + siteConfig.notifications.to);

      // Confirmation for the person who submitted the form. Best effort: the
      // business notification is what matters, so a failure here is logged
      // but never turns a delivered submission into a failed one.
      const confirmationSent = await sendEmail({
        to: request.email,
        subject:
          request.type === "rezerwacja"
            ? "Mamy Wasze zgłoszenie rezerwacji - Łap Chwile"
            : "Mamy Waszą wiadomość - Łap Chwile",
        html: buildConfirmationEmailHtml(request),
        replyTo: siteConfig.contact.email,
      });
      if (!confirmationSent) {
        console.warn("[reservation-adapter] confirmation to submitter failed");
      }

      return { delivered: true, summary };
    }
    console.warn("[reservation-adapter] email send failed, falling back to mailto flow");
  } else {
    console.info(
      "[reservation-adapter] RESEND_API_KEY missing - submission NOT emailed:\n" + summary
    );
  }

  return { delivered: false, summary };
}
