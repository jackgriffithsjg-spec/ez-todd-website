const deedChoices = [
  {
    id: "transfer-on-death-deed",
    title: "Transfer on Death Deed",
    description: "A straightforward option for many Texas owners who want a home or land to pass outside probate.",
    href: "/start",
  },
  {
    id: "lady-bird-deed",
    title: "Lady Bird Deed",
    description: "A flexible Texas deed option that may fit situations involving Medicaid, warranty, or signing needs.",
    href: "/start",
  },
  {
    id: "help-me-choose",
    title: "Not Sure? Help Me Choose",
    description: "Answer a few plain-language questions and a licensed Texas attorney will recommend the right deed.",
    href: "/which-deed-do-i-need",
  },
];

export function DeedChoiceCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {deedChoices.map((choice) => (
        <a
          id={choice.id}
          key={choice.title}
          href={choice.href}
          className="group rounded-md border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/35 hover:bg-white/[0.07]"
        >
          <h3 className="text-lg font-semibold text-white">{choice.title}</h3>
          <p className="mt-3 text-sm leading-6 text-white/55">{choice.description}</p>
          <span className="mt-5 inline-flex text-sm font-semibold text-white group-hover:underline">
            Choose this option
          </span>
        </a>
      ))}
    </div>
  );
}
