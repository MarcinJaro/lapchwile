"use server";

import {
  deliverReservation,
  type ReservationRequest,
} from "@/lib/reservation-adapter";
import type { ReservationFormState } from "@/lib/reservation-state";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{6,}$/;

export async function submitReservation(
  _prev: ReservationFormState,
  formData: FormData
): Promise<ReservationFormState> {
  const get = (name: string) => (formData.get(name)?.toString() ?? "").trim();

  const type = get("type") === "kontakt" ? "kontakt" : "rezerwacja";
  const parentName = get("parentName");
  const phone = get("phone");
  const email = get("email");
  const message = get("message");
  const consent = formData.get("consent");

  const fieldErrors: Record<string, string> = {};
  if (!parentName) fieldErrors.parentName = "Podaj imię i nazwisko.";
  if (!phone) fieldErrors.phone = "Podaj numer telefonu.";
  else if (!PHONE_RE.test(phone)) fieldErrors.phone = "Ten numer telefonu wygląda na niepełny.";
  if (!email) fieldErrors.email = "Podaj adres e-mail.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Ten adres e-mail wygląda na niepoprawny.";
  if (!consent) fieldErrors.consent = "Zaznacz zgodę, żebyśmy mogli się skontaktować.";

  if (type === "rezerwacja") {
    if (!get("preferredDate")) fieldErrors.preferredDate = "Wybierz preferowany termin.";
    if (!get("childrenCount")) fieldErrors.childrenCount = "Podaj przybliżoną liczbę dzieci.";
  } else if (!message) {
    fieldErrors.message = "Napisz, w czym możemy pomóc.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      fieldErrors,
      formError: "Uzupełnij zaznaczone pola i wyślij ponownie.",
    };
  }

  const request: ReservationRequest = {
    type,
    preferredDate: get("preferredDate") || undefined,
    childrenCount: get("childrenCount") || undefined,
    childAge: get("childAge") || undefined,
    theme: get("theme") || undefined,
    packageChoice: get("packageChoice") || undefined,
    extras: formData.getAll("extras").map(String).filter(Boolean),
    parentName,
    phone,
    email,
    message: message || undefined,
  };

  const result = await deliverReservation(request);

  return {
    status: "success",
    fieldErrors: {},
    delivered: result.delivered,
    summary: result.summary,
  };
}
