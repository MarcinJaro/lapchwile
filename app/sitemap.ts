import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";
import { zones } from "@/content/zones";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/urodziny",
    "/atrakcje",
    "/wydarzenia",
    "/dla-szkol-i-przedszkoli",
    "/cennik",
    "/galeria",
    "/blog",
    "/opinie",
    "/faq",
    "/regulamin",
    "/kontakt",
    "/rezerwacja",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.domain}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path === "/urodziny" ? 0.9 : 0.7,
    })),
    ...zones.map((zone) => ({
      url: `${siteConfig.domain}/strefy/${zone.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...blogPosts
      .filter((post) => post.body)
      .map((post) => ({
        url: `${siteConfig.domain}/blog/${post.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
  ];
}
