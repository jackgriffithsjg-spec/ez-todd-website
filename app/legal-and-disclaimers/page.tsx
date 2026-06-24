import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Legal and Disclaimers | EZ TODD by EZ Law",
  description:
    "Legal notices and disclaimers for the EZ TODD by EZ Law Texas deed product website.",
};

const notices = [
  {
    title: "About this website and who publishes it",
    body: "This website is published by Zafrani Law PLLC, doing business as EZ Law, a Texas law practice with its principal office in Lubbock, Texas. The attorney responsible for this website is Edmund Zafrani, who is licensed to practice law in Texas. You can reach us at (806) 777-6249 or Edzafrani@gmail.com. This website is a communication about legal services and may be considered attorney advertising.",
  },
  {
    title: "General information, not legal advice",
    body: "Everything on this website, including the questions and answers and other educational material, is general information about Texas law. It is not legal advice, and it may not apply to your situation. The law changes, and how it applies depends on your specific facts. Please do not rely on this website as a substitute for advice from an attorney about your own circumstances.",
  },
  {
    title: "No attorney-client relationship until you engage us",
    body: "Using this website, reading our materials, submitting a question, or contacting us by phone or email does not create an attorney-client relationship. An attorney-client relationship with EZ Law begins only when you sign our engagement agreement and we accept your matter after our review. Until then, please do not send us confidential or sensitive information through this website or by email, because no attorney-client relationship yet exists and that information may not be protected.",
  },
  {
    title: "Texas real property only",
    body: "We prepare deeds for real property located in Texas. A Texas Transfer on Death Deed or Lady Bird deed should not be used for real estate located in another state, which must be handled under the law of the state where the property sits. We do not provide legal services in states where we are not licensed.",
  },
  {
    title: "A deed is not a will or a complete estate plan",
    body: "A Transfer on Death Deed or Lady Bird deed transfers only the specific Texas property described in it. It is not a will and is not a complete estate plan. It does not name an executor, appoint a guardian for your children, or handle your bank accounts, vehicles, or other property. We encourage you to consider a will and a complete estate plan, which EZ Law can provide under a separate engagement.",
  },
  {
    title: "What our deed service does not include",
    body: "Our flat-fee deed service is limited to preparing and recording the deed you order. It does not include tax advice, Medicaid or long-term care planning, title examination, title curative work, or title insurance, resolving ownership, heirship, or probate, or representation in any dispute. We prepare your deed based on the information you provide, and we do not independently verify ownership, title, or the accuracy of your information. Some situations need a closer look before a flat-fee deed is appropriate, and we will tell you if yours is one of them.",
  },
  {
    title: "No guarantee of results, and what the 24-hour commitment means",
    body: "We perform our work with reasonable professional skill and care, but we do not guarantee any particular legal, tax, or other outcome. Our 24-hour commitment is a commitment about how quickly we work, not a guarantee of a legal result. We prepare your deed within 24 hours after we confirm your information and receive your payment, and we submit your signed, notarized deed for recording within 24 hours after we receive it, in each case excluding weekends and holidays. The time the county takes to complete recording and return stamped copies is set by the county, varies, and is outside our control.",
  },
  {
    title: "Fees and refunds",
    body: "Our fees are a flat $500 for a Transfer on Death Deed and $600 for a Lady Bird deed. County recording fees are included. Two costs are separate: a flat $20 if you ask us to retrieve your legal description, and the notary fee, which you pay directly to the notary. The flat fee is earned when paid. If we decline your matter, cannot prepare a proper deed, or you cancel before we begin drafting, we refund it in full; and if the engagement ends after we begin but before we deliver your recorded deed, we refund any unearned portion. Your engagement agreement controls the details.",
  },
  {
    title: "Recorded deeds are public records",
    body: "We treat your inquiries and information as confidential, but please understand that a deed becomes part of the public real property records once it is recorded. Anyone searching the county records may be able to see your recorded deed.",
  },
  {
    title: "Third-party services",
    body: "We may recommend third-party services, such as an online notarization provider, to help you complete your deed. Those providers are independent of us, set their own fees and terms, and are responsible for their own services. We are not responsible for third-party platforms or for the notarization itself.",
  },
  {
    title: "No claim of specialization or certification",
    body: "Unless we expressly state that an attorney is board certified by the Texas Board of Legal Specialization, nothing on this website should be understood as a claim of specialization or certification in any area of law.",
  },
  {
    title: "Testimonials and reviews",
    body: "Any client testimonials or reviews shown on this website reflect the experiences of specific clients and are not a promise or guarantee that you will have the same experience or result. Every matter is different, and past results do not guarantee future outcomes.",
  },
  {
    title: "Changes to this website and these notices",
    body: "We may update this website, our services, our fees, and these notices at any time. The version posted at the time you use the website applies.",
  },
  {
    title: "Governing law",
    body: "These notices and your use of this website are governed by the laws of the State of Texas.",
  },
  {
    title: "Contact",
    body: "Questions about these notices may be directed to Zafrani Law PLLC, doing business as EZ Law, attention Edmund Zafrani, at (806) 777-6249 or Edzafrani@gmail.com. These deed-specific notices supplement EZ Law's general firm disclaimers. Insert your existing general disclaimer language alongside these on the site.",
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
              Disclaimers and Legal Notices
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              Website Disclaimers and Legal Notices for the EZ TODD by EZ Law deed product.
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
