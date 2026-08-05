import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60dvh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <Image
        src="/frames/balloon/poster-end.webp"
        alt=""
        width={480}
        height={270}
        className="rounded-card"
      />
      <h1 className="mt-8 font-display text-3xl font-bold text-ink sm:text-4xl">
        Ta chwila nam uciekła
      </h1>
      <p className="mt-3 max-w-md text-muted">
        Strona, której szukasz, nie istnieje albo zmieniła adres. Wróć na stronę
        główną i złap właściwą chwilę.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-full bg-action px-7 py-3.5 font-bold text-white transition-colors hover:bg-action-dark"
      >
        Strona główna
      </Link>
    </section>
  );
}
