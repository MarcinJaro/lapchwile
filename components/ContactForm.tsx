"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { submitReservation } from "@/app/actions/reservation";
import { initialReservationState } from "@/lib/reservation-state";
import { siteConfig } from "@/content/site-config";

const inputClass = (hasError: boolean) =>
  `w-full rounded-input border bg-white px-4 py-3 text-ink placeholder:text-muted/60 ${
    hasError ? "border-balloon-red" : "border-ink/15"
  }`;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-action px-7 py-3.5 font-bold text-white transition-colors hover:bg-action-dark disabled:opacity-60"
    >
      {pending ? "Wysyłanie..." : "Wyślij wiadomość"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(
    submitReservation,
    initialReservationState
  );

  if (state.status === "success") {
    const mailto = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      "Wiadomość ze strony lapchwile.com"
    )}&body=${encodeURIComponent(state.summary ?? "")}`;
    return (
      <div role="status" className="rounded-card bg-cream p-8 text-center">
        <CheckCircle size={40} weight="duotone" className="mx-auto text-balloon-green" aria-hidden />
        <h3 className="mt-3 font-display text-xl font-bold text-ink">Wiadomość gotowa</h3>
        {state.delivered ? (
          <p className="mt-2 text-muted">Dziękujemy! Odpowiemy najszybciej, jak się da.</p>
        ) : (
          <>
            <p className="mx-auto mt-2 max-w-sm text-muted">
              Formularz nie jest jeszcze podłączony do skrzynki, więc nic nie
              wysłało się automatycznie. Kliknij poniżej, aby wysłać gotową
              wiadomość ze swojej poczty.
            </p>
            <a
              href={mailto}
              className="mt-5 inline-block rounded-full bg-action px-6 py-3 font-bold text-white hover:bg-action-dark"
            >
              Wyślij mailem
            </a>
          </>
        )}
      </div>
    );
  }

  const err = state.fieldErrors;

  return (
    <form action={formAction} noValidate className="space-y-5">
      <input type="hidden" name="type" value="kontakt" />
      {state.formError && (
        <p role="alert" className="rounded-input border border-balloon-red/40 bg-balloon-red/8 px-4 py-3 font-semibold text-balloon-red">
          {state.formError}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="kontakt-parentName" className="mb-1.5 block text-[15px] font-bold text-ink">
            Imię i nazwisko
          </label>
          <input
            type="text"
            id="kontakt-parentName"
            name="parentName"
            autoComplete="name"
            required
            aria-invalid={!!err.parentName}
            className={inputClass(!!err.parentName)}
          />
          {err.parentName && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-balloon-red">
              <WarningCircle size={16} weight="bold" aria-hidden /> {err.parentName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="kontakt-phone" className="mb-1.5 block text-[15px] font-bold text-ink">
            Telefon
          </label>
          <input
            type="tel"
            id="kontakt-phone"
            name="phone"
            autoComplete="tel"
            required
            aria-invalid={!!err.phone}
            className={inputClass(!!err.phone)}
          />
          {err.phone && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-balloon-red">
              <WarningCircle size={16} weight="bold" aria-hidden /> {err.phone}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="kontakt-email" className="mb-1.5 block text-[15px] font-bold text-ink">
          E-mail
        </label>
        <input
          type="email"
          id="kontakt-email"
          name="email"
          autoComplete="email"
          required
          aria-invalid={!!err.email}
          className={inputClass(!!err.email)}
        />
        {err.email && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-balloon-red">
            <WarningCircle size={16} weight="bold" aria-hidden /> {err.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="kontakt-message" className="mb-1.5 block text-[15px] font-bold text-ink">
          Wiadomość
        </label>
        <textarea
          id="kontakt-message"
          name="message"
          rows={5}
          required
          aria-invalid={!!err.message}
          className={inputClass(!!err.message)}
        />
        {err.message && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-balloon-red">
            <WarningCircle size={16} weight="bold" aria-hidden /> {err.message}
          </p>
        )}
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[15px] text-ink">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={!!err.consent}
            className="mt-1 h-4.5 w-4.5 shrink-0 accent-[#1754a8]"
          />
          <span>
            Wyrażam zgodę na kontakt w sprawie tej wiadomości. Dane podaję
            dobrowolnie i tylko w tym celu.
          </span>
        </label>
        {err.consent && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-balloon-red">
            <WarningCircle size={16} weight="bold" aria-hidden /> {err.consent}
          </p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
