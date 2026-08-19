type IntakeProgressProps = {
  steps: string[];
  currentStep?: number;
  progressPercent?: number;
  statusLabel?: string;
};

export function IntakeProgress({
  steps,
  currentStep = 0,
  progressPercent: progressPercentOverride,
  statusLabel,
}: IntakeProgressProps) {
  const progressPercent = progressPercentOverride ?? Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/20">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
          {statusLabel ?? `Step ${currentStep + 1} of ${steps.length}`}
        </p>
        <p className="text-xs font-semibold text-white/60">{progressPercent}% complete</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <nav aria-label="Intake progress" className="mt-4 overflow-x-auto">
        <ol className="flex min-w-max gap-2">
          {steps.map((step, index) => (
            <li
              key={step}
              className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                index === currentStep
                  ? "border-white bg-white text-black"
                  : index < currentStep
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-white/10 bg-black text-white/55"
              }`}
            >
              {index + 1}. {step}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
