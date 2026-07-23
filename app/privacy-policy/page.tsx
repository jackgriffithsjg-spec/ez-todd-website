import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Zafrani Law PLLC / EZ Law",
  description:
    "Privacy Policy for Zafrani Law PLLC, doing business as EZ Law, including SMS text-message disclosures.",
  alternates: {
    canonical: siteConfig.privacyPolicyUrl,
  },
};

const sections = [
  {
    title: "Information we collect",
    body: "Zafrani Law PLLC, doing business as EZ Law, may collect information you provide through this website, including your name, mailing address, email address, phone number, property details, intake responses, and other information you choose to submit. Do not send confidential or sensitive information until EZ Law confirms representation.",
  },
  {
    title: "How we use information",
    body: "We use submitted information to respond to inquiries, review potential matters, provide service updates, schedule communications, maintain business records, operate the website, and comply with legal or professional obligations.",
  },
  {
    title: "SMS / text-message communications",
    body: "By providing your mobile number, you agree that Zafrani Law PLLC (EZ Law) may send text messages regarding services, scheduling, intake, matter updates, or client alerts. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out, HELP for assistance.",
  },
  {
    title: "Mobile information",
    body: "Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes. SMS opt-in data and consent are used for Zafrani Law PLLC / EZ Law communications and are not sold, rented, or shared for third-party marketing.",
  },
  {
    title: "Service providers and legal obligations",
    body: "We may use service providers to operate this website, intake systems, communications tools, scheduling systems, hosting, analytics, or related business operations. We may also disclose information when required by law, court order, professional obligation, or to protect rights, safety, or security.",
  },
  {
    title: "Attorney-client relationship",
    body: "Submitting information through this website does not create an attorney-client relationship. Representation begins only after EZ Law accepts the matter and the required engagement process is completed.",
  },
  {
    title: "Contact",
    body: `For privacy or SMS assistance, contact ${siteConfig.legalName}, doing business as EZ Law, at ${siteConfig.email} or ${siteConfig.phoneDisplay}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Privacy Policy
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              Privacy Policy for Zafrani Law PLLC / EZ Law
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              This policy explains how EZ Law collects and uses website, intake,
              and SMS/text-message information.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl gap-4">
            {sections.map((section) => (
              <section key={section.title} className="rounded-md border border-white/10 bg-white/[0.03] p-5">
                <h2 className="text-2xl font-semibold tracking-normal">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/60">{section.body}</p>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
