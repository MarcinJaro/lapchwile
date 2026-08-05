import { GoogleLogo, Star } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/content/site-config";
import { fetchGoogleReviews } from "@/lib/google-reviews";

function Stars({ rating, size = 20 }: { rating: number; size?: number }) {
  const filled = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          weight={i < filled ? "fill" : "regular"}
          className={i < filled ? "text-balloon-yellow" : "text-ink/25"}
        />
      ))}
    </span>
  );
}

/**
 * Google reviews section. With GOOGLE_PLACES_API_KEY configured it shows the
 * real average and count of ALL reviews plus selected 4-5 star quotes
 * (clearly labeled as a selection, with a link to the full profile).
 * Without the key it renders an integration-ready empty state; reviews are
 * never invented.
 */
export async function ReviewsSection() {
  const data = await fetchGoogleReviews();
  const profileUrl = data?.mapsUri || siteConfig.googleReviews.profileUrl;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="opinie-naglowek">
      <h2 id="opinie-naglowek" className="font-display text-3xl font-bold text-ink sm:text-4xl">
        Opinie rodziców
      </h2>

      {data ? (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <GoogleLogo size={26} weight="bold" className="text-action" aria-hidden />
              <span className="font-display text-3xl font-bold text-ink">
                {data.rating.toLocaleString("pl-PL", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
              </span>
            </span>
            <Stars rating={data.rating} size={22} />
            <span className="text-muted">
              średnia ze wszystkich {data.count}{" "}
              {data.count === 1 ? "opinii" : "opinii"} w Google
            </span>
          </div>

          {data.reviews.length > 0 && (
            <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.reviews.map((review) => (
                <li key={`${review.author}-${review.relativeTime}`} className="flex flex-col rounded-card bg-cream p-6">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-action/10 font-display text-lg font-bold text-action"
                    >
                      {review.author.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="font-bold text-ink">{review.author}</p>
                      <p className="text-sm text-muted">{review.relativeTime}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Stars rating={review.rating} size={16} />
                    <span className="sr-only">Ocena: {review.rating} na 5</span>
                  </div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted line-clamp-6">
                    {review.text}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              Wybrane opinie naszych gości z wizytówki Google.
            </p>
            {profileUrl && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-action px-6 py-2.5 font-bold text-action hover:bg-action/8"
              >
                Zobacz wszystkie opinie w Google
              </a>
            )}
          </div>
        </>
      ) : (
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
            Sekcja jest gotowa na podpięcie prawdziwych opinii z wizytówki
            Google. Do czasu integracji nie pokazujemy żadnych ocen.
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
      )}
    </section>
  );
}
