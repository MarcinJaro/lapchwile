import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

/** Builds consistent Polish metadata with canonical URL for a route. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteConfig.domain}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "pl_PL",
      type: "website",
      images: [
        {
          url: `${siteConfig.domain}/media/urodziny/animator-z-dziecmi.webp`,
          width: 2000,
          height: 1500,
          alt: "Animatorka prowadzi zabawę z dziećmi w strefie Łap Chwile",
        },
      ],
    },
  };
}
