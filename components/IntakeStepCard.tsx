import type { ReactNode } from "react";

type IntakeStepCardProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

export function IntakeStepCard({ title, eyebrow, children }: IntakeStepCardProps) {
  return (
    <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-normal text-white">{title}</h2>
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}
