import { absoluteUrl, siteConfig } from "@/lib/site";

export function getLegalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${absoluteUrl("/")}#legal-service`,
    name: "EZ TODD by EZ Law",
    alternateName: [siteConfig.legalName, "Zafrani Law PLLC / EZ Law"],
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
      "Transfer on Death Deed preparation",
      "Lady Bird Deed preparation",
      "Texas Transfer on Death Deed recording",
      "Texas Transfer on Death Deed services",
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
      name: "EZ TODD deed services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Transfer on Death Deed",
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/which-deed-do-i-need"),
        },
        {
          "@type": "Offer",
          name: "Lady Bird Deed",
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/which-deed-do-i-need"),
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
