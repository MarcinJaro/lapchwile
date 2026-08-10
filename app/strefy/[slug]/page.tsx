import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { zones, getZone } from "@/content/zones";
import { ReservationCta } from "@/components/ReservationCta";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return zones.map((zone) => ({ slug: zone.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const zone = getZone(slug);
  if (!zone) return {};
  return pageMetadata({
    title: `${zone.name}: ${zone.tagline}`,
    description: zone.description[0],
    path: `/strefy/${zone.slug}`,
  });
}

export default async function ZonePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const zone = getZone(slug);
  if (!zone) notFound();

  const others = zones.filter((z) => z.slug !== zone.slug);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <Link
          href="/atrakcje"
          className="inline-flex items-center gap-1.5 text-[15px] font-bold text-action hover:underline"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden /> Wszystkie atrakcje
        </Link>
      </div>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 md:grid-cols-2">
        <div>
          <p className="inline-block rounded-full bg-action/10 px-4 py-1.5 text-sm font-bold text-action">
            Strefa
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {zone.name}
          </h1>
          <p className="mt-2 text-xl font-semibold text-muted">{zone.tagline}</p>
          {zone.description.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lg leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
          <Link
            href="/rezerwacja"
            className="mt-7 inline-block rounded-full bg-action px-7 py-3.5 font-bold text-white transition-colors hover:bg-action-dark"
          >
            Zarezerwuj urodziny
          </Link>
        </div>
        <div className="relative mx-auto w-full max-w-[420px]">
          <Image
            src={zone.image.src}
            alt={zone.image.alt}
            width={zone.image.width}
            height={zone.image.height}
            priority
            sizes="(min-width: 768px) 40vw, 90vw"
            className="rounded-card object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6" aria-label={`Galeria strefy ${zone.name}`}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {zone.gallery.map((image) => (
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

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" aria-label="Pozostałe strefy">
        <h2 className="font-display text-2xl font-bold text-ink">Pozostałe strefy</h2>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/strefy/${other.slug}`}
                className="inline-block rounded-full border border-ink/12 bg-white px-5 py-2.5 font-semibold text-ink transition-colors hover:border-action hover:text-action"
              >
                {other.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ReservationCta />
    </>
  );
}
