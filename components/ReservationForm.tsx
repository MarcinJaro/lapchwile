"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { submitReservation } from "@/app/actions/reservation";
import { initialReservationState } from "@/lib/reservation-state";
import { birthdayThemes } from "@/content/themes";
import { packages, extras as paidExtras } from "@/content/pricing";
import { siteConfig } from "@/content/site-config";

const extras = paidExtras
  .filter((extra) => extra.name !== "Dodatkowe dziecko")
  .map((extra) => `${extra.name} (${extra.price})`);

const inputClass = (hasError: boolean) =>
  `w-full rounded-input border bg-white px-4 py-3 text-ink placeholder:text-muted/60 ${
    hasError ? "border-balloon-red" : "border-ink/15"
  }`;

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[15px] font-bold text-ink">
        {label}
        {optional && <span className="ml-1.5 font-medium text-muted">(opcjonalnie)</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-blad`} className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-balloon-red">
          <WarningCircle size={16} weight="bold" aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-action px-7 py-4 text-lg font-bold text-white transition-colors hover:bg-action-dark disabled:opacity-60"
    >
      {pending ? "Wysyłanie..." : "Wyślij zgłoszenie"}
    </button>
  );
}

export function ReservationForm() {
  const [state, formAction] = useActionState(
    submitReservation,
    initialReservationState
  );

  if (state.status === "success") {
    const mailto = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      "Rezerwacja urodzin w Łap Chwile"
    )}&body=${encodeURIComponent(state.summary ?? "")}`;
    return (
      <div role="status" className="rounded-card bg-white p-8 text-center">
        <CheckCircle size={44} weight="duotone" className="mx-auto text-balloon-green" aria-hidden />
        <h2 className="mt-4 font-display text-2xl font-bold text-ink">
          Zgłoszenie gotowe
        </h2>
        {state.delivered ? (
          <p className="mx-auto mt-3 max-w-md text-muted">
            Dziękujemy! Odezwiemy się, żeby potwierdzić termin i szczegóły.
            Potwierdzenie zgłoszenia wysłaliśmy na Wasz adres e-mail.
          </p>
        ) : (
          <>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Formularz nie jest jeszcze podłączony do naszej skrzynki, dlatego
              nic nie zostało wysłane automatycznie. Twoje zgłoszenie jest
              przygotowane: wyślij je jednym kliknięciem mailem albo zadzwoń.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={mailto}
                className="rounded-full bg-action px-6 py-3 font-bold text-white hover:bg-action-dark"
              >
                Wyślij zgłoszenie mailem
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="rounded-full border-2 border-action px-6 py-2.5 font-bold text-action hover:bg-action/8"
              >
                Zadzwoń: {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </>
        )}
      </div>
    );
  }

  const err = state.fieldErrors;

  return (
    <form action={formAction} noValidate className="space-y-5">
      <input type="hidden" name="type" value="rezerwacja" />

      {state.formError && (
        <p role="alert" className="rounded-input border border-balloon-red/40 bg-balloon-red/8 px-4 py-3 font-semibold text-balloon-red">
          {state.formError}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferowana data" name="preferredDate" error={err.preferredDate}>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            required
            aria-invalid={!!err.preferredDate}
            aria-describedby={err.preferredDate ? "preferredDate-blad" : undefined}
            className={inputClass(!!err.preferredDate)}
          />
        </Field>
        <Field label="Liczba dzieci" name="childrenCount" error={err.childrenCount}>
          <input
            type="number"
            id="childrenCount"
            name="childrenCount"
            min={1}
            max={60}
            required
            placeholder="np. 12"
            aria-invalid={!!err.childrenCount}
            aria-describedby={err.childrenCount ? "childrenCount-blad" : undefined}
            className={inputClass(!!err.childrenCount)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Wiek lub przedział wiekowy" name="childAge" optional>
          <input
            type="text"
            id="childAge"
            name="childAge"
            placeholder="np. 6 lat albo 4-8 lat"
            className={inputClass(false)}
          />
        </Field>
        <Field label="Motyw urodzin" name="theme" optional>
          <select id="theme" name="theme" defaultValue="" className={inputClass(false)}>
            <option value="">Jeszcze nie wiemy</option>
            {birthdayThemes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
            <option value="Inny motyw">Inny motyw</option>
          </select>
        </Field>
      </div>

      <Field label="Pakiet" name="packageChoice" optional>
        <select id="packageChoice" name="packageChoice" defaultValue="" className={inputClass(false)}>
          <option value="">Do ustalenia wspólnie</option>
          {packages.map((pkg) => (
            <option
              key={pkg.id}
              value={`${pkg.tier} - ${pkg.name}`}
            >{`${pkg.tier} - ${pkg.name} (${pkg.priceWeekday}, ${pkg.maxChildren})`}</option>
          ))}
        </select>
      </Field>

      <fieldset>
        <legend className="mb-2 block text-[15px] font-bold text-ink">
          Dodatkowe atrakcje <span className="font-medium text-muted">(opcjonalnie)</span>
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {extras.map((extra) => (
            <label
              key={extra}
              className="flex cursor-pointer items-center gap-3 rounded-input border border-ink/15 bg-white px-4 py-3 font-medium text-ink has-checked:border-action has-checked:bg-action/5"
            >
              <input
                type="checkbox"
                name="extras"
                value={extra}
                className="h-4.5 w-4.5 accent-[#1754a8]"
              />
              {extra}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Imię i nazwisko rodzica lub opiekuna" name="parentName" error={err.parentName}>
          <input
            type="text"
            id="parentName"
            name="parentName"
            autoComplete="name"
            required
            aria-invalid={!!err.parentName}
            aria-describedby={err.parentName ? "parentName-blad" : undefined}
            className={inputClass(!!err.parentName)}
          />
        </Field>
        <Field label="Telefon" name="phone" error={err.phone}>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            required
            placeholder="np. 600 700 800"
            aria-invalid={!!err.phone}
            aria-describedby={err.phone ? "phone-blad" : undefined}
            className={inputClass(!!err.phone)}
          />
        </Field>
      </div>

      <Field label="E-mail" name="email" error={err.email}>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          aria-invalid={!!err.email}
          aria-describedby={err.email ? "email-blad" : undefined}
          className={inputClass(!!err.email)}
        />
      </Field>

      <Field label="Wiadomość" name="message" optional error={err.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Napisz, jeśli macie szczególne życzenia albo pytania."
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "message-blad" : undefined}
          className={inputClass(!!err.message)}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[15px] text-ink">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={!!err.consent}
            aria-describedby={err.consent ? "consent-blad" : undefined}
            className="mt-1 h-4.5 w-4.5 shrink-0 accent-[#1754a8]"
          />
          <span>
            Akceptuję{" "}
            <Link href="/regulamin" className="font-semibold text-action hover:underline">
              regulamin strefy
            </Link>{" "}
            i wyrażam zgodę na kontakt telefoniczny lub mailowy w sprawie tej
            rezerwacji. Dane podaję dobrowolnie i tylko w tym celu.
          </span>
        </label>
        {err.consent && (
          <p id="consent-blad" className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-balloon-red">
            <WarningCircle size={16} weight="bold" aria-hidden /> {err.consent}
          </p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
