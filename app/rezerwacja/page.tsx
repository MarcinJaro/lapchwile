import { PageHeader } from "@/components/PageHeader";
import { ReservationForm } from "@/components/ReservationForm";
import { siteConfig } from "@/content/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Rezerwacja urodzin",
  description:
    "Zarezerwuj urodziny w Łap Chwile: wybierz termin, motyw i dodatkowe atrakcje. Bez płatności online, potwierdzamy telefonicznie.",
  path: "/rezerwacja",
});

export default function RezerwacjaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rezerwacja"
        title="Złapmy Wasz termin"
        lead="Wypełnienie formularza nic nie kosztuje i do niczego nie zobowiązuje. Potwierdzimy dostępność terminu i wspólnie ustalimy szczegóły. Płatność odbywa się na miejscu, nie online."
      />
      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <ReservationForm />
        <p className="mt-6 text-center text-sm text-muted">
          Wolisz porozmawiać? Zadzwoń:{" "}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="font-bold text-action hover:underline"
          >
            {siteConfig.contact.phoneDisplay}
          </a>
        </p>
      </section>
    </>
  );
}
