import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const routes = [
  "",
  "/how-it-works",
  "/pricing",
  "/faq",
  "/start",
  "/which-deed-do-i-need",
  "/intake",
  "/contact",
  "/privacy-policy",
  "/terms-of-use",
  "/legal-and-disclaimers",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
