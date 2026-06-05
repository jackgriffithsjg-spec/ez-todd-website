import type { Metadata } from "next";
import { CheckoutMockup } from "@/components/CheckoutMockup";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { DeedType } from "@/components/PricingSummaryCard";

export const metadata: Metadata = {
  title: "Checkout Review Mockup | EZ TODD by EZ Law",
  description:
    "Review a mock checkout summary for the EZ TODD deed product. No payment is collected.",
};

type CheckoutPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function selectedDeedFromParam(value: string | string[] | undefined): DeedType | undefined {
  const deed = firstParam(value);
  if (deed === "lady-bird") return "Lady Bird Deed";
  if (deed === "todd") return "Transfer on Death Deed";
  return undefined;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = searchParams ? await searchParams : {};
  const selectedDeed = selectedDeedFromParam(params.deed);
  const legalDescriptionSelected = firstParam(params.legalDescription) === "yes";

  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Checkout mockup
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              Review checkout details.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
              No payment is collected in this prototype. This page shows how the
              order review and payment placeholder could feel before launch.
            </p>
          </div>
        </section>
        <CheckoutMockup
          selectedDeed={selectedDeed}
          legalDescriptionSelected={legalDescriptionSelected}
        />
      </main>
      <Footer />
    </>
  );
}
