import type { ReactNode } from "react";

type SubmissionDetailCardProps = {
  title: string;
  children: ReactNode;
};

export function SubmissionDetailCard({ title, children }: SubmissionDetailCardProps) {
  return (
    <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
      <h2 className="text-xl font-semibold tracking-normal text-white">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
