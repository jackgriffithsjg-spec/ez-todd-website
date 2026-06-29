const trustItems = [
  "Reviewed by a licensed Texas attorney",
  "May avoid probate",
  "24-hour guarantee",
];

export function TrustStrip() {
  return (
    <section className="border-y border-white/10 bg-black px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-3 text-center text-sm font-semibold text-white/75 md:grid-cols-3">
        {trustItems.map((item) => (
          <div key={item} className="rounded-md border border-white/10 px-4 py-3">
            {item}
          </div>
        ))}
      </div>
      <p className="mx-auto mt-3 max-w-4xl text-center text-xs leading-5 text-white/40">
        24-hour commitment excludes weekends and holidays. Drafting begins after
        confirmation call and payment; recording submission begins after we receive
        the signed, notarized deed. County recording times vary.
      </p>
    </section>
  );
}
