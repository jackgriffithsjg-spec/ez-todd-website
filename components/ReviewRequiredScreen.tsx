import { RedFlagAlert } from "@/components/RedFlagAlert";

type ReviewRequiredScreenProps = {
  reasons: string[];
};

export function ReviewRequiredScreen({ reasons }: ReviewRequiredScreenProps) {
  return (
    <section className="rounded-md border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
        Attorney review required
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
        This situation needs attorney review before checkout.
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-white/60">
        Based on your answers, your situation may need a closer look before EZ Law can
        offer the flat-fee deed path. You can request a call and the attorney will
        review the issue before payment.
      </p>
      <RedFlagAlert flags={reasons} />
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href="tel:"
          className="rounded-md bg-white px-6 py-3 text-center text-sm font-semibold text-black"
        >
          Request Attorney Call
        </a>
        <a
          href="tel:"
          className="rounded-md border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white"
        >
          Call or Text EZ Law
        </a>
      </div>
      <p className="mt-4 text-xs leading-5 text-white/40">
        Checkout is intentionally unavailable from this state in the mockup.
      </p>
    </section>
  );
}
