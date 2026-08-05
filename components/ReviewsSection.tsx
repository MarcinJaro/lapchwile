import { GoogleLogo, Star } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/content/site-config";

/**
 * Google reviews section prepared for live data. Until credentials or a
 * review feed are configured in site-config, an integration-ready empty
 * state is rendered. No reviews, ratings or names are ever invented.
 */
export function ReviewsSection() {
  const { profileUrl } = siteConfig.googleReviews;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="opinie-naglowek">
      <h2 id="opinie-naglowek" className="font-display text-3xl font-bold text-ink sm:text-4xl">
        Opinie rodziców
      </h2>
      <div className="mt-8 rounded-card border border-dashed border-ink/15 bg-cloud p-10 text-center">
        <div className="mx-auto flex w-fit items-center gap-1.5" aria-hidden>
          <GoogleLogo size={28} weight="bold" className="text-action" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={22} weight="duotone" className="text-balloon-yellow" />
          ))}
        </div>
        <p className="mt-4 font-display text-xl font-bold text-ink">
          Tu pojawią się opinie z Google
        </p>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Sekcja jest gotowa na podpięcie prawdziwych opinii z wizytówki Google.
          Do czasu integracji nie pokazujemy żadnych ocen.
        </p>
        {profileUrl && (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full border-2 border-action px-6 py-2.5 font-bold text-action hover:bg-action/8"
          >
            Zobacz opinie w Google
          </a>
        )}
      </div>
    </section>
  );
}
