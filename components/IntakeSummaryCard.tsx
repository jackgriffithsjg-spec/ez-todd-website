type SummaryItem = {
  label: string;
  value: string;
};

type IntakeSummaryCardProps = {
  title: string;
  items: SummaryItem[];
};

export function IntakeSummaryCard({ title, items }: IntakeSummaryCardProps) {
  return (
    <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
      <h2 className="text-2xl font-semibold tracking-normal text-white">{title}</h2>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-md border border-white/10 bg-black p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">{item.label}</dt>
            <dd className="mt-2 text-sm leading-6 text-white/70">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
