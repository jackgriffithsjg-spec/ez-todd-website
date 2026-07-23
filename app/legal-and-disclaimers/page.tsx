import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "EZ TODD Legal Notices and Disclaimers",
  description:
    "Legal notices and disclaimers for EZ TODD by EZ Law.",
  alternates: {
    canonical: absoluteUrl("/legal-and-disclaimers"),
  },
};

const notices = [
  {
    title: "About this website",
    body: `${siteConfig.legalName}, doing business as EZ Law, publishes this website from its principal office in Lubbock, Texas. The attorney responsible for this website is ${siteConfig.responsibleAttorney}, who is licensed to practice law in Texas. This website is a communication about legal services and may be considered attorney advertising.`,
  },
  {
    title: "General information, not legal advice",
    body: "Everything on this website is general information. It is not legal advice and may not apply to your situation. Laws change, deadlines matter, and legal outcomes depend on specific facts.",
  },
  {
    title: "No attorney-client relationship",
    body: "Using this website, reading materials, submitting a message, calling, texting, or emailing does not create an attorney-client relationship. Representation begins only after EZ Law accepts the matter and an engagement agreement is signed. Do not send confidential or sensitive information before that happens.",
  },
  {
    title: "Texas deed service",
    body: "EZ TODD is for Texas real property deed matters, including Transfer on Death Deeds and Lady Bird Deeds. EZ Law does not provide legal services in jurisdictions where the firm is not authorized to practice.",
  },
  {
    title: "No guarantee of results",
    body: "EZ Law performs legal work with reasonable professional skill and care, but no website statement, consultation, estimate, prior result, or review guarantees any particular legal, probate, tax, title, Medicaid, or financial outcome.",
  },
  {
    title: "Fees and scope",
    body: "EZ TODD uses flat fees for eligible Texas deed matters. The signed engagement agreement controls the scope of work, fees, payment terms, and refund terms.",
  },
  {
    title: "Third-party services",
    body: "EZ Law may link to or use third-party platforms, including booking, intake, payment, filing, notarization, court, or government systems. Those services are controlled by their own providers and may have separate terms, fees, and privacy practices.",
  },
  {
    title: "No claim of board certification",
    body: "Unless expressly stated, nothing on this website should be understood as a claim that an attorney is board certified by the Texas Board of Legal Specialization.",
  },
  {
    title: "Contact",
    body: `Questions about these notices may be directed to ${siteConfig.legalName}, doing business as EZ Law, attention ${siteConfig.responsibleAttorney}, at ${siteConfig.phoneDisplay} or ${siteConfig.email}.`,
  },
];

export default function LegalAndDisclaimersPage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Legal notices
            </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              EZ TODD Disclaimers and Legal Notices
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              Important notices about this website, attorney advertising, legal
              information, confidentiality, and representation.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl gap-4">
            {notices.map((notice) => (
              <section key={notice.title} className="rounded-md border border-white/10 bg-white/[0.03] p-5">
                <h2 className="text-2xl font-semibold tracking-normal">{notice.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/60">{notice.body}</p>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
