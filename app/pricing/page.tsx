import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PricingPreview } from "@/components/PricingPreview";

export const metadata: Metadata = {
  title: "EZ TODD Pricing | Flat-Fee Texas Deeds",
  description:
    "Flat-fee pricing available for attorney-prepared Texas Transfer on Death Deeds and Lady Bird Deeds by EZ TODD by EZ Law.",
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Pricing
            </p>
            <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              Flat-fee Texas deed pricing.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              Real prices for attorney-prepared deeds, with recording included and
              the common outside costs disclosed up front.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <PricingPreview showExclusions />
          </div>
        </section>

        <CTASection
          title="Start with the deed you need."
          body="Choose Transfer on Death Deed, Lady Bird Deed, or Not Sure? Help Me Choose from the homepage."
          primaryLabel="Start Now"
          primaryHref="/start"
          secondaryLabel="How It Works"
          secondaryHref="/how-it-works"
        />
      </main>
      <Footer />
    </>
  );
}
