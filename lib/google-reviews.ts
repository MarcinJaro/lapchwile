import { cache } from "react";
import { siteConfig } from "@/content/site-config";

/**
 * Server-side Google reviews via Places API (New).
 *
 * Requires GOOGLE_PLACES_API_KEY in the environment (see README). Without
 * the key every function quietly returns null and the UI renders its
 * integration-ready empty state, so the site never breaks.
 *
 * Honesty rules built in:
 * - the OVERALL rating and review count always describe ALL Google reviews,
 * - only the displayed quotes are filtered (4-5 stars) and are labeled as
 *   a selection with a link to the full Google profile.
 */

export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type GoogleReviewsData = {
  /** average rating of ALL reviews on the profile */
  rating: number;
  /** total number of reviews on the profile */
  count: number;
  /** selected 4-5 star quotes (max 5, as returned by the API) */
  reviews: GoogleReview[];
  /** link to the full Google listing */
  mapsUri: string;
};

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  authorAttribution?: { displayName?: string };
  relativePublishTimeDescription?: string;
};

type PlaceDetails = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

const DETAILS_FIELD_MASK = [
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews.rating",
  "reviews.text",
  "reviews.authorAttribution",
  "reviews.relativePublishTimeDescription",
].join(",");

/** One day: reviews do not need to be fresher than that. */
const REVALIDATE_SECONDS = 86400;

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  if (siteConfig.googleReviews.placeId) return siteConfig.googleReviews.placeId;

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "places.id,places.displayName",
        },
        body: JSON.stringify({
          textQuery: `${siteConfig.name} ${siteConfig.venue.city}`,
          languageCode: "pl",
          ...(siteConfig.venue.coordinates
            ? {
                locationBias: {
                  circle: {
                    center: {
                      latitude: siteConfig.venue.coordinates.lat,
                      longitude: siteConfig.venue.coordinates.lng,
                    },
                    radius: 2000,
                  },
                },
              }
            : {}),
        }),
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );
    if (!response.ok) {
      console.warn(`[google-reviews] searchText HTTP ${response.status}`);
      return null;
    }
    const data = (await response.json()) as {
      places?: { id?: string; displayName?: { text?: string } }[];
    };
    const place = data.places?.[0];
    if (place?.id) {
      console.info(
        `[google-reviews] placeId dla "${place.displayName?.text}": ${place.id}. ` +
          "Wpisz go do content/site-config.ts (googleReviews.placeId), aby pominąć wyszukiwanie."
      );
      return place.id;
    }
    return null;
  } catch (error) {
    console.warn("[google-reviews] searchText failed:", error);
    return null;
  }
}

export const fetchGoogleReviews = cache(
  async (): Promise<GoogleReviewsData | null> => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) return null;

    const placeId = await resolvePlaceId(apiKey);
    if (!placeId) return null;

    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}?languageCode=pl`,
        {
          headers: {
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": DETAILS_FIELD_MASK,
          },
          next: { revalidate: REVALIDATE_SECONDS },
        }
      );
      if (!response.ok) {
        console.warn(`[google-reviews] place details HTTP ${response.status}`);
        return null;
      }
      const place = (await response.json()) as PlaceDetails;
      if (typeof place.rating !== "number" || !place.userRatingCount) {
        return null;
      }

      const reviews: GoogleReview[] = (place.reviews ?? [])
        .filter(
          (review): review is Required<PlacesReview> & PlacesReview =>
            (review.rating ?? 0) >= 4 && Boolean(review.text?.text)
        )
        .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        .slice(0, 5)
        .map((review) => ({
          author: review.authorAttribution?.displayName ?? "Gość Łap Chwile",
          rating: review.rating ?? 5,
          text: review.text?.text ?? "",
          relativeTime: review.relativePublishTimeDescription ?? "",
        }));

      return {
        rating: place.rating,
        count: place.userRatingCount,
        reviews,
        mapsUri:
          place.googleMapsUri ?? siteConfig.googleReviews.profileUrl ?? "",
      };
    } catch (error) {
      console.warn("[google-reviews] place details failed:", error);
      return null;
    }
  }
);
