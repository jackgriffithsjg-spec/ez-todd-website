import type { Submission } from "@/lib/submissionTypes";
import { SubmissionDetailCard } from "@/components/SubmissionDetailCard";
import { SubmissionStatusBadge } from "@/components/SubmissionStatusBadge";

export function MatterOverviewCard({ submission }: { submission: Submission }) {
  const items = [
    { label: "Submitted date", value: submission.submittedDate },
    { label: "Recommended deed", value: submission.recommendedDeed },
    { label: "Price estimate", value: submission.priceEstimate },
    { label: "Payment status", value: submission.paymentStatus },
    { label: "Engagement agreement", value: submission.engagementAgreementStatus },
  ];

  return (
    <SubmissionDetailCard title="Matter Overview">
      <div className="mb-5">
        <SubmissionStatusBadge status={submission.status} />
      </div>
      <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-md border border-white/10 bg-black p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              {item.label}
            </dt>
            <dd className="mt-2 text-sm font-semibold text-white">{item.value}</dd>
          </div>
        ))}
      </dl>
    </SubmissionDetailCard>
  );
}
