import type { MatterStatus } from "@/lib/submissionTypes";

const urgentStatuses: MatterStatus[] = ["Needs Attorney Review", "Declined / Refunded"];
const activeStatuses: MatterStatus[] = ["Drafting", "Sent for Client Review", "Submitted for Recording"];
const completeStatuses: MatterStatus[] = ["Recorded / Complete"];

export function SubmissionStatusBadge({ status }: { status: MatterStatus }) {
  const color = urgentStatuses.includes(status)
    ? "border-red-300/30 bg-red-400/10 text-red-100"
    : completeStatuses.includes(status)
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-100"
      : activeStatuses.includes(status)
        ? "border-sky-300/30 bg-sky-400/10 text-sky-100"
        : "border-white/15 bg-white/[0.04] text-white/70";

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}
