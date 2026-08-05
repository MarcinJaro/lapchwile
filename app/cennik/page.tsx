import Link from "next/link";
import { ChatCircleDots } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/PageHeader";
import { PdfDownload } from "@/components/PdfDownload";
import { ReservationCta } from "@/components/ReservationCta";
import { packages, extras } from "@/content/pricing";
import { siteConfig } from "@/content/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cennik urodzin i atrakcji",
  description:
    "Cennik Łap Chwile: pakiety urodzinowe i atrakcje dodatkowe. Wycenę przygotowujemy indywidualnie pod Wasze przyjęcie.",
  path: "/cennik",
});

export default function CennikPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cennik"
        title="Ile to kosztuje"
        lead="Nie publikujemy cen, których nie możemy dotrzymać. Poniżej znajdziesz aktualne pakiety, a jeśli ich jeszcze nie ma, przygotujemy wycenę indywidualnie."
      />

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {packages.length === 0 ? (
          <div className="rounded-card border border-dashed border-ink/15 bg-cream p-12 text-center">
            <ChatCircleDots size={44} weight="duotone" className="mx-auto text-action" aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">
              Cennik przygotowujemy indywidualnie
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Cena zależy od liczby gości, motywu i wybranych atrakcji. Napisz
              do nas albo zadzwoń pod {siteConfig.contact.phoneDisplay}, a
              przygotujemy wycenę tego samego dnia roboczego.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/kontakt"
                className="rounded-full bg-action px-6 py-3 font-bold text-white hover:bg-action-dark"
              >
                Poproś o wycenę
              </Link>
              <PdfDownload href={siteConfig.downloads.cennikPdf} label="Cennik" />
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-card p-7 ${
                    pkg.highlighted ? "bg-action text-white" : "bg-cream text-ink"
                  }`}
                >
                  <h2 className="font-display text-xl font-bold">{pkg.name}</h2>
                  <p className="mt-2 font-display text-3xl font-bold">{pkg.price}</p>
                  {pkg.duration && (
                    <p className={`mt-1 text-sm ${pkg.highlighted ? "text-white/80" : "text-muted"}`}>
                      {pkg.duration}
                    </p>
                  )}
                  <ul className={`mt-4 space-y-2 text-[15px] ${pkg.highlighted ? "text-white/90" : "text-muted"}`}>
                    {pkg.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {extras.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-ink">Dodatki</h2>
                <ul className="mt-4 divide-y divide-ink/8 rounded-card border border-ink/8 bg-cream">
                  {extras.map((extra) => (
                    <li key={extra.name} className="flex justify-between px-6 py-4">
                      <span className="font-semibold text-ink">{extra.name}</span>
                      <span className="text-muted">{extra.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </section>
      <ReservationCta />
    </>
  );
}
