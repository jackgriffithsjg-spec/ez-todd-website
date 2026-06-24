import type { Metadata } from "next";
import { PortalShell } from "@/components/PortalShell";
import { SubmissionTable } from "@/components/SubmissionTable";
import { mockSubmissions } from "@/lib/mockSubmissions";

export const metadata: Metadata = {
  title: "EZ TODD Submissions | Lawyer Portal",
  description: "Prototype dashboard for reviewing EZ TODD intake submissions.",
  robots: {
    index: false,
    follow: false,
  },
};

const summaryCards = [
  {
    label: "New Submissions",
    value: mockSubmissions.filter((item) => item.status === "New Submission").length,
  },
  {
    label: "Needs Attorney Review",
    value: mockSubmissions.filter((item) => item.status === "Needs Attorney Review").length,
  },
  {
    label: "Ready for Confirmation Call",
    value: mockSubmissions.filter((item) => item.status === "Ready for Confirmation Call").length,
  },
  {
    label: "Drafting",
    value: mockSubmissions.filter((item) => item.status === "Drafting").length,
  },
  {
    label: "Completed",
    value: mockSubmissions.filter((item) => item.status === "Recorded / Complete").length,
  },
];

export default function PortalDashboardPage() {
  return (
    <PortalShell>
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
            Lawyer review
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
            EZ TODD Submissions
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
            Scan mock intake submissions, spot Tier 1 red flags, and open matters for attorney review.
          </p>
        </div>
        <a href="/portal/login" className="rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white/70">
          Back to Mock Login
        </a>
      </div>

      <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map((card) => (
          <article key={card.label} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
          </article>
        ))}
      </section>

      <SubmissionTable submissions={mockSubmissions} />
    </PortalShell>
  );
}
