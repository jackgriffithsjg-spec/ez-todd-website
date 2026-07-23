import { PricingSummaryCard } from "@/components/PricingSummaryCard";
import type { DeedType } from "@/components/PricingSummaryCard";

type CheckoutSummaryProps = {
  selectedDeed?: DeedType;
  legalDescriptionSelected?: boolean;
};

export function CheckoutSummary({
  selectedDeed,
  legalDescriptionSelected = false,
}: CheckoutSummaryProps) {
  return (
    <div className="grid gap-4">
      {selectedDeed ? (
        <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-2xl font-semibold tracking-normal text-white">Order details</h2>
          <dl className="mt-5 grid gap-3">
            <div className="flex flex-col justify-between gap-2 rounded-md border border-white/10 bg-black p-4 sm:flex-row">
              <dt className="text-sm font-semibold text-white">Selected deed</dt>
              <dd className="text-sm text-white/60">{selectedDeed}</dd>
            </div>
            <div className="flex flex-col justify-between gap-2 rounded-md border border-white/10 bg-black p-4 sm:flex-row">
              <dt className="text-sm font-semibold text-white">Property county</dt>
              <dd className="text-sm text-white/60">[property_county] County, Texas</dd>
            </div>
          </dl>
        </section>
      ) : null}
      <PricingSummaryCard
        selectedDeed={selectedDeed}
        legalDescriptionSelected={legalDescriptionSelected}
        title="Pricing summary"
      />
    </div>
  );
}
