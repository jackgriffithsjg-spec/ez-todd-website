const prices = [
  {
    title: "Transfer on Death Deed",
    price: "$500",
    tag: "TODD",
  },
  {
    title: "Lady Bird Deed",
    price: "$600",
    tag: "Lady Bird",
  },
];

const included = [
  "Attorney preparation",
  "Attorney review",
  "Confirmation call",
  "One review opportunity before signing",
  "Signing and notarization instructions",
  "County recording",
  "Return of the recorded deed",
];

const notIncluded = [
  "Notary fee",
  "Broader estate planning",
  "Tax advice",
  "Medicaid or long-term care planning",
  "Title examination or title curative work",
  "Probate representation",
  "Disputes or litigation",
];

type PricingPreviewProps = {
  showExclusions?: boolean;
};

export function PricingPreview({ showExclusions = false }: PricingPreviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {prices.map((item) => (
        <article
          key={item.title}
          className="rounded-md border border-white/10 bg-white/[0.03] p-6 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">{item.tag}</p>
          <p className="mt-4 text-6xl font-semibold tracking-normal text-white">{item.price}</p>
          <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
        </article>
      ))}
      <article className="md:col-span-2 rounded-md border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <h3 className="text-2xl font-semibold tracking-normal text-white">
          Flat fee. Attorney reviewed. Personalized drafting.
        </h3>
        <ul className="mt-6 grid gap-2 text-sm text-white/65 sm:grid-cols-2">
          {included.map((feature) => (
            <li key={feature}>- {feature}</li>
          ))}
        </ul>
      </article>
      <p className="md:col-span-2 rounded-md border border-white/10 bg-black p-4 text-sm leading-6 text-white/55">
        Separate costs: $20 if we need to retrieve your legal description, and the
        notary fee paid directly to the notary. County recording fees are included.
      </p>
      {showExclusions ? (
        <div className="md:col-span-2 rounded-md border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-lg font-semibold text-white">Not included in the flat fee</h3>
          <ul className="mt-4 grid gap-2 text-sm text-white/60 sm:grid-cols-2">
            {notIncluded.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-6 text-white/55">
            Legal description retrieval is available for a flat $20 add-on if you
            do not have the legal description.
          </p>
        </div>
      ) : null}
    </div>
  );
}
