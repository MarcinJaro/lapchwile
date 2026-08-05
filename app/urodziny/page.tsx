import Image from "next/image";
import Link from "next/link";
import {
  Balloon,
  Cake,
  Confetti,
  HandHeart,
  Tent,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { media } from "@/content/media";
import { birthdayThemes } from "@/content/themes";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ReservationCta } from "@/components/ReservationCta";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Urodziny dla dzieci nad Zalewem Zegrzyńskim",
  description:
    "Urodziny w Łap Chwile: namiot urodzinowy, animatorzy, Tor Ninja, warsztaty i 10 motywów tematycznych. Nieporęt, Port Pilawa.",
  path: "/urodziny",
});

const included = [
  {
    icon: Tent,
    title: "Namiot urodzinowy",
    text: "Przestronny, dekorowany pod wybrany motyw, z miejscem dla dzieci i rodziców.",
  },
  {
    icon: Confetti,
    title: "Animacje przez całe przyjęcie",
    text: "Animatorzy prowadzą zabawy dopasowane do wieku gości, od maluchów po nastolatki.",
  },
  {
    icon: Balloon,
    title: "Strefy zabawy",
    text: "Tor Ninja, ogród sensoryczny i warsztaty kreatywne czekają tuż obok namiotu.",
  },
  {
    icon: Cake,
    title: "Czas na tort",
    text: "Wspólne odśpiewanie, świeczki i pamiątkowa ścianka z odciskami dłoni gości.",
  },
  {
    icon: UsersThree,
    title: "Miejsce dla rodziców",
    text: "Rodzice mają swoją przestrzeń obok, z widokiem na całą zabawę.",
  },
  {
    icon: HandHeart,
    title: "Opieka od początku do końca",
    text: "Witamy gości, pilnujemy planu i oddajemy Wam gotowe wspomnienia.",
  },
];

const stages = [
  {
    name: "Powitanie",
    text: "Goście trafiają prosto do udekorowanego namiotu. Animator zbiera grupę i rozkręca pierwsze zabawy na przełamanie lodów.",
    image: media.namiotStrefaUrodzin,
  },
  {
    name: "Zabawa w strefach",
    text: "Tor Ninja, ogród sensoryczny, gry terenowe albo warsztaty: program układamy pod wiek i energię grupy.",
    image: media.biegPoTrawie,
  },
  {
    name: "Tort i życzenia",
    text: "Wszyscy zbierają się przy ściance Łap Chwile. Świeczki, życzenia i odciski dłoni gości zostają na pamiątkę.",
    image: media.dzieciPrzySciance,
  },
  {
    name: "Wspomnienie",
    text: "Solenizant wraca do domu z prezentami i pamiątkową ścianką, a Wy z telefonem pełnym zdjęć.",
    image: media.sciankaLapChwile,
  },
];

const galleryImages = [
  media.stolPokemon,
  media.stolUrodzinowyWyscigi,
  media.girlandaBalonowa,
  media.animatorZDziecmi,
  media.poczestunekArbuz,
  media.tortPrzySciance,
];

export default function UrodzinyPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 md:grid-cols-2">
          <div>
            <p className="inline-block rounded-full bg-balloon-red/12 px-4 py-1.5 text-sm font-bold text-balloon-red">
              Urodziny w Łap Chwile
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Dzień, który należy do Waszego dziecka
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Wy wybieracie motyw i przywozicie solenizanta. My zajmujemy się
              resztą: dekoracjami, animacjami i planem, który nie zwalnia tempa.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/rezerwacja"
                className="rounded-full bg-action px-7 py-3.5 font-bold text-white transition-colors hover:bg-action-dark"
              >
                Zarezerwuj termin
              </Link>
              <Link
                href="/cennik"
                className="rounded-full border-2 border-action px-7 py-3 font-bold text-action transition-colors hover:bg-action/8"
              >
                Zobacz cennik
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[420px]">
            <div aria-hidden className="absolute -right-4 -top-4 h-full w-full rounded-card bg-balloon-yellow/25" />
            <Image
              src={media.sciankaLapChwile.src}
              alt={media.sciankaLapChwile.alt}
              width={media.sciankaLapChwile.width}
              height={media.sciankaLapChwile.height}
              priority
              sizes="(min-width: 768px) 40vw, 90vw"
              className="relative rounded-card object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream py-16" aria-labelledby="pakiet-naglowek">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="pakiet-naglowek" className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Co czeka na miejscu
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-card bg-cloud p-6">
                <Icon size={30} weight="duotone" className="text-action" aria-hidden />
                <h3 className="mt-3 font-display text-lg font-bold text-ink">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Szczegółowy zakres pakietów i ceny ustalamy indywidualnie: zobacz{" "}
            <Link href="/cennik" className="font-semibold text-action hover:underline">
              cennik
            </Link>{" "}
            lub zapytaj przy rezerwacji.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="przebieg-naglowek">
        <h2 id="przebieg-naglowek" className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Jak przebiega przyjęcie
        </h2>
        <div className="mt-10 space-y-12">
          {stages.map((stage, i) => (
            <div
              key={stage.name}
              className={`grid items-center gap-6 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="relative mx-auto w-full max-w-[380px]">
                <Image
                  src={stage.image.src}
                  alt={stage.image.alt}
                  width={stage.image.width}
                  height={stage.image.height}
                  sizes="(min-width: 768px) 35vw, 85vw"
                  className="rounded-card object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">{stage.name}</h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">{stage.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16" aria-labelledby="motywy-naglowek">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 id="motywy-naglowek" className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Motywy przewodnie
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Dekoracje, kolory i zabawy dopasowujemy do wybranego motywu
            (w pakietach Standard i Premium). Jeśli macie inny pomysł,
            powiedzcie nam o nim przy rezerwacji.
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {birthdayThemes.map((theme) => (
              <li
                key={theme}
                className="rounded-full border border-ink/12 bg-cloud px-5 py-2.5 font-semibold text-ink"
              >
                {theme}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="galeria-urodziny">
        <h2 id="galeria-urodziny" className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Tak to wygląda naprawdę
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {galleryImages.map((image) => (
            <div key={image.src} className="relative aspect-[3/4] overflow-hidden rounded-card">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <ReviewsSection />
      <ReservationCta />
      <div className="h-20 md:hidden" aria-hidden />
      <StickyMobileCta />
    </>
  );
}
