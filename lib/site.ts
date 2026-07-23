export const siteConfig = {
  name: "EZ TODD by EZ Law",
  shortName: "EZ TODD",
  legalName: "Zafrani Law PLLC",
  responsibleAttorney: "Edmund Zafrani",
  phoneDisplay: "(806) 777-6249",
  phoneHref: "tel:+18067776249",
  email: "contact@getezlaw.com",
  emailHref: "mailto:contact@getezlaw.com",
  privacyPolicyUrl: "https://www.transferondeathdeedtexas.com/privacy-policy",
  termsOfUseUrl: "https://www.transferondeathdeedtexas.com/terms-of-use",
  city: "Lubbock",
  state: "Texas",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.transferondeathdeedtexas.com",
  description:
    "Flat-fee Texas Transfer on Death Deeds and Lady Bird Deeds prepared and reviewed by a licensed Texas attorney.",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.siteUrl).toString();
}
