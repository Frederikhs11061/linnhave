import type { MetadataRoute } from "next";
import { pages } from "@/lib/pages";
import { home, siteUrl, indexable } from "@/lib/content";
import data from "../../content/sider.json";
export default function sitemap(): MetadataRoute.Sitemap {
  return indexable
    ? pages
        .filter((p) => p.index)
        .map((p) => ({
          url: siteUrl + p.path,
          lastModified:
            p.slug === "forside"
              ? home.lastUpdated
              : data[p.slug as keyof typeof data].lastUpdated,
        }))
    : [];
}
