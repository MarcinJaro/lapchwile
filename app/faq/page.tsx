import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ReservationCta } from "@/components/ReservationCta";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Częste pytania",
  description:
    "Najczęstsze pytania o urodziny i zabawę w Łap Chwile: tort, catering, pogoda, liczba gości i obecność rodziców.",
  path: "/faq",
});

export default function FaqPage() {
  const schema = faqSchema();
  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <PageHeader
        eyebrow="FAQ"
        title="Częste pytania"
        lead="Jeśli nie znajdziesz odpowiedzi, po prostu napisz albo zadzwoń. Odpowiadamy szybko."
      />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <FaqAccordion />
        <p className="mt-8 text-center text-muted">
          Masz inne pytanie?{" "}
          <Link href="/kontakt" className="font-semibold text-action hover:underline">
            Skontaktuj się z nami
          </Link>
          .
        </p>
      </section>
      <ReservationCta />
    </>
  );
}
