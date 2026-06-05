import { CTASection } from "@/components/CTASection";
import { DeedChoiceCards } from "@/components/DeedChoiceCards";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PricingPreview } from "@/components/PricingPreview";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TrustStrip } from "@/components/TrustStrip";
import { getLegalServiceJsonLd } from "@/lib/schema";

const processSteps = [
  {
    title: "Answer a few questions",
    description:
      "Choose a deed path and provide the basic property, owner, and beneficiary information.",
  },
  {
    title: "Confirm with the attorney",
    description:
      "A licensed Texas attorney reviews your information, confirms the details, and prepares the deed.",
  },
  {
    title: "Notarize, and you are done",
    description:
      "You sign and notarize using our instructions, return the deed, and we submit it for recording.",
  },
];

export default function Home() {
  const legalServiceJsonLd = getLegalServiceJsonLd();

  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <Hero />
        <TrustStrip />

        <section className="px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="choices-heading">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <h2 id="choices-heading" className="text-3xl font-semibold tracking-normal sm:text-4xl">
                Choose your deed path
              </h2>
              <p className="mt-4 text-base leading-7 text-white/55">
                Pick the deed you already know you need, or start with the chooser if
                you want the attorney to recommend the right option.
              </p>
            </div>
            <DeedChoiceCards />
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-y border-white/10 bg-white/[0.03] px-4 py-14 sm:px-6 lg:px-8"
          aria-labelledby="process-heading"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
                  Three simple steps
                </p>
                <h2 id="process-heading" className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
                  From questions to recorded deed
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-white/55">
                Help is one call or text away while you complete the process.
              </p>
            </div>
            <ProcessSteps steps={processSteps} />
          </div>
        </section>

        <section id="pricing" className="px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="pricing-heading">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
                Flat-fee pricing
              </p>
              <h2 id="pricing-heading" className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
                Real prices. No price-match language.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/55">
                Government recording fees are included in the flat fee.
              </p>
            </div>
            <PricingPreview />
          </div>
        </section>

        <section
          id="faq"
          className="border-y border-white/10 bg-white/[0.03] px-4 py-12 sm:px-6 lg:px-8"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-6xl text-center">
            <h2 id="faq-heading" className="text-3xl font-semibold tracking-normal sm:text-4xl">
              Questions before you start?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/55">
              The full FAQ will live on its own focused page. For this first homepage
              version, the next step stays simple: choose a deed, start now, or call/text
              [firm phone] for help.
            </p>
          </div>
        </section>

        <CTASection
          id="final-cta"
          title="Start your Texas deed today"
          body="A simple TODD or Lady Bird deed is drafted and submitted for recording in 24 hours or less, guaranteed, excluding weekends and holidays."
          primaryLabel="Start Now"
          primaryHref="/start"
          secondaryLabel="Call/Text [firm phone]"
          secondaryHref="tel:"
        />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }}
      />
    </>
  );
}
