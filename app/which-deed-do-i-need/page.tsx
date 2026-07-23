import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Which Deed Do I Need? | EZ TODD by EZ Law",
  description:
    "Compare Texas Transfer on Death Deeds and Lady Bird Deeds before starting the EZ TODD questionnaire.",
};

const toddFit = [
  "You mainly want to avoid probate",
  "You want to keep ownership while alive",
  "You want the beneficiary to receive the property only after death",
  "You will sign the deed yourself",
  "You want a straightforward statutory deed option",
];

const ladyBirdFit = [
  "You want more flexibility",
  "You may need someone to sign under power of attorney",
  "Medicaid or long-term care planning may be involved",
  "You want warranty language or a more customized deed structure",
  "The attorney recommends it after reviewing your answers",
];

export default function WhichDeedDoINeedPage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Deed chooser
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              Which Deed Do I Need?
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              Most Texas homeowners use either a Transfer on Death Deed or a Lady
              Bird Deed to help pass real property outside of probate. The
              questionnaire gives a preliminary direction, and the attorney confirms
              the right deed during the confirmation call.
            </p>
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-2xl font-semibold tracking-normal">Transfer on Death Deed may fit if:</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-white/65">
                {toddFit.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-2xl font-semibold tracking-normal">Lady Bird Deed may fit if:</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-white/65">
                {ladyBirdFit.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold tracking-normal">Not Sure?</h2>
            <p className="mt-4 text-base leading-7 text-white/60">
              If you are not sure, start the questionnaire. EZ Law will review your
              answers and confirm the right deed before drafting.
            </p>
            <p className="mt-5 rounded-md border border-white/10 bg-black p-4 text-sm leading-6 text-white/55">
              The deed recommendation is preliminary guidance only. The attorney
              confirms the correct deed during the confirmation call.
            </p>
          </div>
        </section>

        <CTASection
          title="Start with the questionnaire."
          body="Answer a few plain-English questions so EZ Law can point you toward the right deed."
          primaryLabel="Start Questionnaire"
          primaryHref="/intake"
          secondaryLabel="View Pricing"
          secondaryHref="/pricing"
        />
      </main>
      <Footer />
    </>
  );
}
