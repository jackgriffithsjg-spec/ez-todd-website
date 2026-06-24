import type { ReviewFlag } from "@/lib/mockSubmissions";

export function ReviewFlagBadge({ flag }: { flag: ReviewFlag }) {
  const urgent = flag.tier === 1;

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        urgent
          ? "border-red-300/35 bg-red-500/15 text-red-100"
          : "border-amber-300/30 bg-amber-400/10 text-amber-100"
      }`}
    >
      {flag.label}
    </span>
  );
}
