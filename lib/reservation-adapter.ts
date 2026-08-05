/**
 * Backend adapter boundary for reservation and contact submissions.
 *
 * There is NO backend configured yet. This adapter is the single place to
 * connect one later (e-mail service, CRM, database) without touching the
 * form or the server action. Until then `delivered` is always false and the
 * UI is honest about it: it offers the composed message via mailto/phone
 * instead of pretending the submission was stored.
 */

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

  // TODO(backend): send `summary` to the business mailbox or CRM here and
  // return { delivered: true, summary } once a real integration exists.
  console.info("[reservation-adapter] submission received (no backend configured):\n" + summary);

  return { delivered: false, summary };
}
