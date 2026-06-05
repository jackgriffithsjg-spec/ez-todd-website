export function getLegalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "EZ TODD by EZ Law",
    alternateName: "Zafrani Law PLLC",
    description:
      "Flat-fee Texas Transfer on Death Deeds and Lady Bird Deeds prepared and reviewed by a licensed Texas attorney.",
    areaServed: {
      "@type": "State",
      name: "Texas",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lubbock",
      addressRegion: "TX",
      addressCountry: "US",
    },
    serviceType: [
      "Transfer on Death Deed preparation",
      "Lady Bird Deed preparation",
      "Texas deed recording",
    ],
    url: "https://example.com",
  };
}
