import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProcessSteps } from "@/components/ProcessSteps";

export const metadata: Metadata = {
  title: "How EZ TODD Works | Three-Step Texas Deed Process",
  description:
    "Learn the three-step EZ TODD process for attorney-prepared Texas Transfer on Death Deeds and Lady Bird Deeds.",
};

const steps = [
  {
    title: "Answer a few questions",
    description:
      "Complete the questionnaire, review and sign the limited-scope engagement agreement, and pay the flat fee online.",
  },
  {
    title: "Confirm with the attorney",
    description:
      "A licensed Texas attorney reviews your answers, confirms the details with you, prepares the deed, and sends it for review.",
  },
  {
    title: "Notarize and return",
    description:
      "You sign and notarize using the instructions provided, return the deed, and EZ Law records it with the county.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              How it works
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              Three steps from questions to recorded deed.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              EZ TODD is built to keep the path simple: answer the questions, confirm
              the deed strategy with the attorney, then sign and notarize so EZ Law can
              record the deed.
            </p>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ProcessSteps steps={steps} />
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="commitment-heading">
          <div className="mx-auto max-w-4xl rounded-md border border-white/10 bg-white/[0.03] p-6">
            <h2 id="commitment-heading" className="text-3xl font-semibold tracking-normal">
              The 24-hour commitment
            </h2>
            <p className="mt-4 text-base leading-7 text-white/60">
              A simple TODD or Lady Bird deed is drafted within 24 hours after the
              confirmation call and payment, and submitted for recording within 24
              hours after receiving the signed, notarized deed, excluding weekends and
              holidays. County recording completion times vary and are outside the
              firm's control.
            </p>
          </div>
        </section>

        <CTASection
          title="Ready to start?"
          body="Begin with a few plain-language questions, then confirm the details with a licensed Texas attorney."
          primaryLabel="Start Now"
          primaryHref="/start"
          secondaryLabel="View Pricing"
          secondaryHref="/pricing"
        />
      </main>
      <Footer />
    </>
  );
}
