import { ArrowRight, GoogleLogo, Quotes, Star } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/content/site-config";
import { fetchGoogleReviews } from "@/lib/google-reviews";
import { Reveal } from "./Reveal";
import { Sparkle } from "./Sparkle";

const cardColors = [
  "bg-pastel-yellow",
  "bg-pastel-blue",
  "bg-pastel-green",
  "bg-pastel-pink",
  "bg-pastel-blue",
];

const initialColors = [
  "text-yellow-600",
  "text-action",
  "text-balloon-green",
  "text-balloon-red",
  "text-action",
];

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
 * real average and count of ALL reviews plus quotes from the 5 reviews the
 * Places API exposes (its hard maximum), clearly linked to the full profile.
 * Without the key it renders an integration-ready empty state; reviews are
 * never invented.
 */
export async function ReviewsSection() {
  const data = await fetchGoogleReviews();
  const profileUrl = data?.mapsUri || siteConfig.googleReviews.profileUrl;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="opinie-naglowek">
      {data ? (
        <>
          <Reveal>
            <div className="relative mx-auto max-w-2xl text-center">
              <Sparkle
                size={20}
                className="absolute -left-2 top-2 hidden text-balloon-yellow motion-safe:animate-float sm:block"
              />
              <Sparkle
                size={14}
                className="absolute right-0 top-14 hidden text-balloon-red motion-safe:animate-float-slow sm:block"
              />
              <h2 id="opinie-naglowek" className="font-display text-3xl font-bold text-ink sm:text-4xl">
                Rodzice <span className="marker bg-pastel-yellow">polecają nas</span>
              </h2>
              <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full bg-white px-7 py-3.5 shadow-sm">
                <span className="inline-flex items-center gap-2">
                  <GoogleLogo size={24} weight="bold" className="text-action" aria-hidden />
                  <span className="font-display text-3xl font-bold text-ink">
                    {data.rating.toLocaleString("pl-PL", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </span>
                </span>
                <Stars rating={data.rating} size={20} />
                <span className="text-[15px] font-semibold text-muted">
                  średnia ze wszystkich {data.count} opinii
                </span>
              </div>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.reviews.map((review, i) => (
              <Reveal key={`${review.author}-${review.relativeTime}`} delay={i * 0.06}>
                <li
                  className={`flex h-full flex-col rounded-[24px] rounded-bl-md p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 ${
                    cardColors[i % cardColors.length]
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <Quotes
                      size={30}
                      weight="fill"
                      aria-hidden
                      className="-scale-x-100 text-ink/20"
                    />
                    <Stars rating={review.rating} size={16} />
                    <span className="sr-only">Ocena: {review.rating} na 5</span>
                  </div>
                  <p className="mt-3 flex-1 text-[15px] font-medium leading-relaxed text-ink/85 line-clamp-6">
                    {review.text}
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-ink/10 pt-4">
                    <span
                      aria-hidden
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-display text-lg font-bold shadow-sm ${
                        initialColors[i % initialColors.length]
                      }`}
                    >
                      {review.author.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-ink">{review.author}</p>
                      <p className="text-sm text-ink/55">{review.relativeTime}</p>
                    </div>
                    <GoogleLogo
                      size={18}
                      weight="bold"
                      aria-hidden
                      className="ml-auto shrink-0 text-ink/35"
                    />
                  </div>
                </li>
              </Reveal>
            ))}

            {profileUrl && (
              <Reveal delay={data.reviews.length * 0.06}>
                <li className="h-full">
                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full min-h-[220px] flex-col items-center justify-center gap-4 rounded-[24px] border-2 border-dashed border-ink/15 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-action hover:shadow-xl hover:shadow-ink/10"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pastel-blue text-action transition-colors group-hover:bg-action group-hover:text-white">
                      <GoogleLogo size={28} weight="bold" aria-hidden />
                    </span>
                    <span className="font-display text-xl font-bold text-ink">
                      Przeczytaj wszystkie {data.count} opinii
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-action">
                      Otwórz w Google
                      <ArrowRight
                        size={17}
                        weight="bold"
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </a>
                </li>
              </Reveal>
            )}
          </ul>

          <p className="mt-6 text-center text-sm text-muted">
            Wyróżnione opinie naszych gości z wizytówki Google. Google udostępnia
            na stronie maksymalnie 5 opinii, pełną listę znajdziesz w wizytówce.
          </p>
        </>
      ) : (
        <>
          <h2 id="opinie-naglowek" className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Opinie rodziców
          </h2>
          <div className="mt-8 rounded-card border border-dashed border-ink/15 bg-white p-10 text-center">
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
        </>
      )}
    </section>
  );
}
