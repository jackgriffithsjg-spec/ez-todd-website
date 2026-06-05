import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Start Your Texas Deed Review | EZ TODD by EZ Law",
  description:
    "Start the EZ TODD Texas deed review mockup and see what information to have ready before the questionnaire.",
};

const checklist = [
  "Your full legal name",
  "Your mailing address",
  "Your phone and email",
  "The property address",
  "The county where the property is located",
  "Your current deed, if available",
  "Names of the people or organizations you want to receive the property",
  "Whether the property is your homestead",
  "Whether you are married, divorced, widowed, or separated",
];

export default function StartPage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Start
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              Start Your Texas Deed Review
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              The questionnaire helps EZ Law understand your property, your goals,
              and whether a Transfer on Death Deed or Lady Bird Deed may be appropriate.
            </p>
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-2xl font-semibold tracking-normal">Before you begin</h2>
              <ul className="mt-5 grid gap-3 text-sm text-white/65 sm:grid-cols-2">
                {checklist.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="grid gap-5">
              <div className="rounded-md border border-white/10 bg-white/[0.03] p-5">
                <h2 className="text-xl font-semibold tracking-normal">Texas-only gate preview</h2>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  This service is for Texas real property only.
                </p>
              </div>
              <div className="rounded-md border border-white/10 bg-black p-5">
                <h2 className="text-xl font-semibold tracking-normal">Do not enter sensitive information</h2>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  Do not enter Social Security numbers, dates of birth, bank or
                  financial account numbers, or upload identification documents. The
                  notary verifies identity later.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title="Begin the questionnaire."
          body="This mockup does not submit information, connect to payment, or store data."
          primaryLabel="Begin Questionnaire"
          primaryHref="/intake"
          secondaryLabel="Call or Text for Help"
          secondaryHref="tel:"
        />
      </main>
      <Footer />
    </>
  );
}
