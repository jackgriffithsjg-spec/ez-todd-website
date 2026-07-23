import { CheckoutSummary } from "@/components/CheckoutSummary";
import type { DeedType } from "@/components/PricingSummaryCard";

type CheckoutMockupProps = {
  selectedDeed?: DeedType;
  legalDescriptionSelected?: boolean;
};

export function CheckoutMockup({
  selectedDeed,
  legalDescriptionSelected = false,
}: CheckoutMockupProps) {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.85fr]">
        <CheckoutSummary
          selectedDeed={selectedDeed}
          legalDescriptionSelected={legalDescriptionSelected}
        />
        <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-2xl font-semibold tracking-normal">Payment is handled after review</h2>
          <p className="mt-4 rounded-md border border-white/10 bg-black p-4 text-sm leading-6 text-white/60">
            EZ Law reviews the submitted intake first. If the firm can help, the
            attorney will provide final engagement, payment, and next-step instructions.
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-white/60">
            <li>- Submitting intake does not by itself mean EZ Law has accepted the matter.</li>
            <li>- EZ Law reviews for conflicts and fit before beginning work.</li>
            <li>- No attorney-client relationship begins until EZ Law accepts the matter.</li>
            <li>- Online payment processing can be added in a later launch phase.</li>
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="/intake"
              className="rounded-md bg-white px-6 py-3 text-center text-sm font-semibold text-black"
            >
              Submit Intake
            </a>
            <a
              href="/contact"
              className="rounded-md border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Contact EZ Law
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
