import {
  Clock,
  Envelope,
  MapPin,
  Phone,
  Car,
  ChatCircleDots,
} from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/content/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kontakt i dojazd",
  description:
    "Skontaktuj się z Łap Chwile: telefon, e-mail i dojazd do strefy przy Porcie Pilawa w Nieporęcie nad Zalewem Zegrzyńskim.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Porozmawiajmy"
        lead="Najszybciej złapiesz nas telefonicznie. Na maile odpowiadamy w dni robocze."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <div className="rounded-card bg-cream p-7">
            <h2 className="font-display text-xl font-bold text-ink">Dane kontaktowe</h2>
            <ul className="mt-4 space-y-3.5 text-[15px]">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 font-bold text-action hover:underline"
                >
                  <Phone size={20} weight="bold" aria-hidden />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2.5 font-bold text-action hover:underline"
                >
                  <Envelope size={20} weight="bold" aria-hidden />
                  {siteConfig.contact.email}
                </a>
              </li>
              {siteConfig.contact.messenger && (
                <li>
                  <a
                    href={siteConfig.contact.messenger}
                    className="inline-flex items-center gap-2.5 font-bold text-action hover:underline"
                  >
                    <ChatCircleDots size={20} weight="bold" aria-hidden />
                    Messenger
                  </a>
                </li>
              )}
              {siteConfig.contact.whatsapp && (
                <li>
                  <a
                    href={siteConfig.contact.whatsapp}
                    className="inline-flex items-center gap-2.5 font-bold text-action hover:underline"
                  >
                    <ChatCircleDots size={20} weight="bold" aria-hidden />
                    WhatsApp
                  </a>
                </li>
              )}
              {!siteConfig.contact.messenger && !siteConfig.contact.whatsapp && (
                <li className="flex items-start gap-2.5 text-muted">
                  <ChatCircleDots size={20} weight="bold" aria-hidden className="mt-0.5 shrink-0" />
                  Messenger i WhatsApp podamy wkrótce.
                </li>
              )}
            </ul>
          </div>

          <div className="rounded-card bg-cream p-7">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-bold text-ink">
              <MapPin size={22} weight="duotone" className="text-action" aria-hidden />
              Jak nas znaleźć
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {siteConfig.venue.name}
              <br />
              {siteConfig.venue.description}, {siteConfig.venue.city}.
            </p>
            {siteConfig.venue.mapPin ? (
              <a
                href={siteConfig.venue.mapPin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full border-2 border-action px-6 py-2.5 font-bold text-action hover:bg-action/8"
              >
                Otwórz mapę
              </a>
            ) : (
              <p className="mt-3 text-sm text-muted">
                Dokładną pinezkę na mapie dodamy wkrótce. Kierujcie się na Port
                Pilawa w Nieporęcie, strefa jest tuż obok skateparku.
              </p>
            )}
          </div>

          <div className="rounded-card bg-cream p-7">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-bold text-ink">
              <Car size={22} weight="duotone" className="text-action" aria-hidden />
              Parking
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {siteConfig.parking.info ??
                "Informacje o parkowaniu przy Porcie Pilawa potwierdzimy wkrótce. Zapytaj nas przy rezerwacji."}
            </p>
          </div>

          <div className="rounded-card bg-cream p-7">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-bold text-ink">
              <Clock size={22} weight="duotone" className="text-action" aria-hidden />
              Godziny otwarcia
            </h2>
            {siteConfig.openingHours ? (
              <ul className="mt-3 space-y-1.5 text-[15px] text-muted">
                {siteConfig.openingHours.map((entry) => (
                  <li key={entry.label} className="flex justify-between gap-4">
                    <span className="font-semibold text-ink">{entry.label}</span>
                    <span>{entry.hours}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Aktualne godziny otwarcia potwierdzamy telefonicznie. Stałą
                rozpiskę opublikujemy tutaj wkrótce.
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-ink">Napisz do nas</h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
