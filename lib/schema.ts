import { absoluteUrl, siteConfig } from "@/lib/site";

export function getLegalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${absoluteUrl("/")}#legal-service`,
    name: "EZ Law",
    alternateName: ["Patent Ed", siteConfig.legalName],
    description: siteConfig.description,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    areaServed: {
      "@type": "State",
      name: siteConfig.state,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: "TX",
      addressCountry: "US",
    },
    serviceType: [
      "Patent law",
      "Trademark law",
      "Business law",
      "Copyright law",
      "Real estate law",
      "Professional mediation",
      "Estate planning",
      "Civil litigation",
    ],
    url: absoluteUrl("/"),
    provider: {
      "@type": "Attorney",
      name: siteConfig.responsibleAttorney,
      worksFor: {
        "@type": "LegalService",
        name: siteConfig.legalName,
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "EZ Law legal services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Patent legal services",
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/patent"),
        },
        {
          "@type": "Offer",
          name: "Trademark legal services",
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/trademark"),
        },
      ],
    },
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    inLanguage: "en-US",
    publisher: {
      "@id": `${absoluteUrl("/")}#legal-service`,
    },
  };
}
