import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use | Zafrani Law PLLC / EZ Law",
  description:
    "Terms of Use for Zafrani Law PLLC, doing business as EZ Law, including SMS text-message program disclosures.",
  alternates: {
    canonical: siteConfig.termsOfUseUrl,
  },
};

const terms = [
  {
    title: "Website use",
    body: "This website is provided by Zafrani Law PLLC, doing business as EZ Law. The website provides general information about legal services and does not provide legal advice for your specific situation.",
  },
  {
    title: "No attorney-client relationship",
    body: "Using this website, submitting an intake form, calling, texting, emailing, or booking an appointment does not create an attorney-client relationship. Representation begins only after EZ Law accepts the matter and the required engagement process is completed.",
  },
  {
    title: "SMS text-message program",
    body: "Zafrani Law PLLC operates an SMS text-message program to provide service updates and client alerts. Message and data rates may apply. Message frequency may vary. Reply STOP to opt out, HELP for assistance.",
  },
  {
    title: "Consent and opt-out",
    body: "By providing your mobile number to EZ Law, you agree to receive text messages regarding services, scheduling, intake, matter updates, or client alerts. Consent to receive text messages is not a condition of hiring EZ Law. You may opt out at any time by replying STOP. For help, reply HELP or contact EZ Law directly.",
  },
  {
    title: "Privacy Policy",
    body: "Our Privacy Policy explains how we handle personal information and mobile information. Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes.",
  },
  {
    title: "Third-party services",
    body: "EZ Law may link to or use third-party services for hosting, booking, intake, communications, payments, filing, or related business functions. Those services may have their own terms and privacy practices.",
  },
  {
    title: "Contact",
    body: `Questions about these Terms of Use or the SMS program may be directed to ${siteConfig.legalName}, doing business as EZ Law, at ${siteConfig.email} or ${siteConfig.phoneDisplay}.`,
  },
];

export default function TermsOfUsePage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Terms of Use
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              Terms of Use for Zafrani Law PLLC / EZ Law
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              These terms describe website use, communications, and SMS/text-message
              program disclosures for EZ Law.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl gap-4">
            {terms.map((term) => (
              <section key={term.title} className="rounded-md border border-white/10 bg-white/[0.03] p-5">
                <h2 className="text-2xl font-semibold tracking-normal">{term.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {term.title === "Privacy Policy" ? (
                    <>
                      Our{" "}
                      <a href={siteConfig.privacyPolicyUrl} className="text-white underline underline-offset-4">
                        Privacy Policy
                      </a>{" "}
                      explains how we handle personal information and mobile information.
                      Mobile information will not be shared with third parties or affiliates
                      for marketing or promotional purposes.
                    </>
                  ) : (
                    term.body
                  )}
                </p>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
