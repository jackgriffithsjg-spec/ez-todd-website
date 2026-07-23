import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/portal",
        "/intake",
        "/checkout",
        "/engagement-agreement",
        "/start",
        "/pricing",
        "/how-it-works",
        "/which-deed-do-i-need",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
