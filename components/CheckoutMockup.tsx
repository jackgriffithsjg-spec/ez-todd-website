"use client";

import { useState } from "react";
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
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.85fr]">
        <CheckoutSummary
          selectedDeed={selectedDeed}
          legalDescriptionSelected={legalDescriptionSelected}
        />
        <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
          {submitted ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                Success state
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-normal">
                Mock order received.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/60">
                Next, EZ Law would review your information, confirm details with you,
                and begin drafting if the matter is accepted.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold tracking-normal">Payment placeholder</h2>
              <p className="mt-4 rounded-md border border-white/10 bg-black p-4 text-sm leading-6 text-white/60">
                Payment integration coming soon.
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-white/60">
                <li>- Payment does not by itself mean EZ Law has accepted the matter.</li>
                <li>- EZ Law reviews for conflicts and fit before beginning work.</li>
                <li>- If EZ Law declines the matter, payment is refunded according to the engagement agreement.</li>
                <li>- No attorney-client relationship begins until the agreement is signed and EZ Law accepts the matter.</li>
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-black"
                >
                  Submit Mock Order
                </button>
                <a
                  href="/engagement-agreement"
                  className="rounded-md border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white"
                >
                  Back to Engagement Agreement
                </a>
              </div>
            </>
          )}
        </section>
      </div>
    </section>
  );
}
