type Step = {
  title: string;
  description: string;
};

type ProcessStepsProps = {
  steps: Step[];
};

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="rounded-md border border-white/10 bg-white/[0.03] p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-sm font-black text-black">
            {index + 1}
          </span>
          <h3 className="mt-5 text-base font-semibold text-white">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/55">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
