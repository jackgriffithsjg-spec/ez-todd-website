type IntakeProgressProps = {
  steps: string[];
  currentStep?: number;
};

export function IntakeProgress({ steps, currentStep = 0 }: IntakeProgressProps) {
  return (
    <nav aria-label="Intake progress" className="overflow-x-auto">
      <ol className="flex min-w-max gap-2">
        {steps.map((step, index) => (
          <li
            key={step}
            className={`rounded-full border px-3 py-2 text-xs font-semibold ${
              index === currentStep
                ? "border-white bg-white text-black"
                : "border-white/10 bg-white/[0.03] text-white/55"
            }`}
          >
            {index + 1}. {step}
          </li>
        ))}
      </ol>
    </nav>
  );
}
