import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://transientrealm.de";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/de/`, changeFrequency: "weekly", priority: 1, alternates: { languages: { de: `${base}/de/`, en: `${base}/en/` } } },
    { url: `${base}/en/`, changeFrequency: "weekly", priority: 0.9, alternates: { languages: { de: `${base}/de/`, en: `${base}/en/` } } },
  ];
}
