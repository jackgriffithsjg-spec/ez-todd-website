export type DeedType = "Transfer on Death Deed" | "Lady Bird Deed";

const deedPrices: Record<DeedType, number> = {
  "Transfer on Death Deed": 500,
  "Lady Bird Deed": 600,
};

const includedItems = [
  "Attorney preparation and review",
  "Confirmation call",
  "Signing and notarization instructions",
  "County recording fees",
  "Return of recorded deed",
];

type PricingSummaryCardProps = {
  selectedDeed?: DeedType;
  legalDescriptionSelected?: boolean;
  title?: string;
};

export function PricingSummaryCard({
  selectedDeed,
  legalDescriptionSelected = false,
  title = "Estimated Price",
}: PricingSummaryCardProps) {
  if (!selectedDeed) {
    return (
      <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-2xl font-semibold tracking-normal text-white">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-white/60">
          No deed has been selected yet. Compare the flat-fee options before
          estimating a total.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {Object.entries(deedPrices).map(([deed, price]) => (
            <div key={deed} className="rounded-md border border-white/10 bg-black p-4">
              <p className="text-sm font-semibold text-white">{deed}</p>
              <p className="mt-3 text-3xl font-semibold tracking-normal text-white">
                ${price}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const basePrice = deedPrices[selectedDeed];
  const addOnPrice = legalDescriptionSelected ? 20 : 0;
  const total = basePrice + addOnPrice;

  return (
    <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal text-white">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-white/60">Selected deed name</p>
          <p className="mt-1 text-xl font-semibold text-white">{selectedDeed}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-black p-4 text-left sm:min-w-44 sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Base price
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-normal text-white">
            ${basePrice}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-white/10 bg-black p-4">
          <h3 className="text-sm font-semibold text-white">Included items</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/60">
            {includedItems.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4">
          <div className="rounded-md border border-white/10 bg-black p-4">
            <h3 className="text-sm font-semibold text-white">Optional add-on</h3>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Legal description retrieval: +$20 if selected
            </p>
          </div>
          <div className="rounded-md border border-white/10 bg-black p-4">
            <h3 className="text-sm font-semibold text-white">Not included</h3>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Notary fee paid separately
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-white bg-white p-5 text-black">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/55">
            Estimated total due today
          </p>
          <p className="text-4xl font-semibold tracking-normal">${total}</p>
        </div>
      </div>
    </section>
  );
}
