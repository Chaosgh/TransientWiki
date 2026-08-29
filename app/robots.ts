import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://transientrealm.de/sitemap.xml",
    host: "https://transientrealm.de",
  };
}
