type CTASectionProps = {
  id?: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export function CTASection({
  id,
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section id={id} className="bg-white px-4 py-14 text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-black/65">{body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={primaryHref}
            className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            {primaryLabel}
          </a>
          <a
            href={secondaryHref}
            className="rounded-md border border-black/15 px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
