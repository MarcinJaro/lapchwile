import { PageHeader } from "@/components/PageHeader";
import {
  regulaminEffectiveDate,
  regulaminSections,
} from "@/content/regulamin";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Regulamin strefy",
  description:
    "Regulamin strefy rodzinnej zabawy Łap Chwile przy Porcie Pilawa w Nieporęcie: zasady wstępu, opieki nad dziećmi i bezpieczeństwa.",
  path: "/regulamin",
});

export default function RegulaminPage() {
  return (
    <>
      <PageHeader
        eyebrow="Zasady"
        title="Regulamin strefy"
        lead={`Strefa Rodzinnej Zabawy Łap Chwile, Port Pilawa w Nieporęcie. Regulamin obowiązuje od ${regulaminEffectiveDate}.`}
      />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="space-y-10">
          {regulaminSections.map((section) => (
            <section key={section.heading} aria-label={section.heading}>
              <h2 className="font-display text-xl font-bold text-ink">
                {section.heading}
              </h2>
              <ol className="mt-3 list-decimal space-y-2 pl-6 text-[15px] leading-relaxed text-muted marker:font-semibold marker:text-ink/50">
                {section.points.map((point) => (
                  <li key={point.slice(0, 40)}>{point}</li>
                ))}
              </ol>
            </section>
          ))}
        </div>
        <p className="mt-12 rounded-card bg-cream p-6 text-center font-display text-lg font-bold text-ink">
          Dziękujemy za współpracę i życzymy Wam i Waszym dzieciom wspaniałej,
          bezpiecznej zabawy! Zespół Łap Chwile
        </p>
      </section>
    </>
  );
}
