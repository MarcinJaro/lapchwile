import Link from "next/link";
import Image from "next/image";
import {
  Envelope,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/content/site-config";
import { media } from "@/content/media";

const columns: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Na miejscu",
    links: [
      { href: "/atrakcje", label: "Atrakcje" },
      { href: "/strefy/tor-ninja", label: "Tor Ninja" },
      { href: "/strefy/ogrod-sensoryczny", label: "Ogród sensoryczny" },
      { href: "/strefy/warsztaty-kreatywne", label: "Warsztaty kreatywne" },
      { href: "/strefy/strefa-urodzin", label: "Strefa urodzin" },
      { href: "/strefy/atrakcje-sezonowe", label: "Atrakcje sezonowe" },
    ],
  },
  {
    heading: "Dla gości",
    links: [
      { href: "/urodziny", label: "Urodziny" },
      { href: "/wydarzenia", label: "Wydarzenia" },
      { href: "/dla-szkol-i-przedszkoli", label: "Szkoły i przedszkola" },
      { href: "/cennik", label: "Cennik" },
      { href: "/galeria", label: "Galeria" },
      { href: "/rezerwacja", label: "Rezerwacja" },
    ],
  },
  {
    heading: "Informacje",
    links: [
      { href: "/opinie", label: "Opinie" },
      { href: "/faq", label: "Częste pytania" },
      { href: "/blog", label: "Blog" },
      { href: "/regulamin", label: "Regulamin" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-white">
      <div aria-hidden className="flex h-1.5">
        <span className="flex-1 bg-action" />
        <span className="flex-1 bg-balloon-red" />
        <span className="flex-1 bg-balloon-yellow" />
        <span className="flex-1 bg-balloon-green" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src={media.logo.src}
            alt={media.logo.alt}
            width={120}
            height={94}
            className="h-16 w-auto"
          />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
            Strefa zabaw i urodzin przy Porcie Pilawa nad Zalewem Zegrzyńskim.
            Tor Ninja, ogród sensoryczny, warsztaty i animacje.
          </p>
          <ul className="mt-5 space-y-2.5 text-[15px]">
            <li>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 font-semibold text-action hover:underline"
              >
                <Phone size={18} weight="bold" aria-hidden />
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 font-semibold text-action hover:underline"
              >
                <Envelope size={18} weight="bold" aria-hidden />
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2 text-muted">
              <MapPin size={18} weight="bold" aria-hidden className="mt-0.5 shrink-0" />
              <span>
                {siteConfig.venue.name}
                <br />
                {siteConfig.venue.street}, {siteConfig.venue.city}
              </span>
            </li>
          </ul>
          {(siteConfig.social.facebook || siteConfig.social.instagram) && (
            <div className="mt-5 flex items-center gap-2">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-action/8 text-action transition-colors hover:bg-action hover:text-white"
                >
                  <span className="sr-only">Łap Chwile na Facebooku</span>
                  <FacebookLogo size={22} weight="fill" aria-hidden />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-action/8 text-action transition-colors hover:bg-action hover:text-white"
                >
                  <span className="sr-only">Łap Chwile na Instagramie</span>
                  <InstagramLogo size={22} weight="fill" aria-hidden />
                </a>
              )}
            </div>
          )}
        </div>

        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink/60">
              {col.heading}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-ink hover:text-action hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-ink/8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-[13px] text-muted sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.legal.owner}, {siteConfig.legal.street},{" "}
            {siteConfig.legal.postalCode} {siteConfig.legal.city}. NIP {siteConfig.legal.nip}.
          </p>
          <p>Zdjęcia pochodzą z prawdziwych wydarzeń w Łap Chwile.</p>
        </div>
      </div>
    </footer>
  );
}
