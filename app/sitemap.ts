import type { MetadataRoute } from "next";
import { practiceAreas } from "@/lib/practiceAreas";
import { absoluteUrl } from "@/lib/site";

const routes = [
  "",
  "/practice-areas",
  "/meet-patent-ed",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms-of-use",
  "/legal-and-disclaimers",
  ...practiceAreas.map((area) => `/${area.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
