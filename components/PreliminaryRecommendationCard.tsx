type PreliminaryRecommendationCardProps = {
  recommendation: "Transfer on Death Deed" | "Lady Bird Deed" | "Attorney Review Needed";
  hasReviewTags?: boolean;
};

export function PreliminaryRecommendationCard({
  recommendation,
  hasReviewTags = false,
}: PreliminaryRecommendationCardProps) {
  return (
    <div className="rounded-md border border-white/10 bg-black p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
        Preliminary guidance only
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">
        {recommendation}
      </h3>
      <p className="mt-3 text-sm leading-6 text-white/55">
        Based on your answers, this may be the better fit. The attorney confirms
        the correct deed during your confirmation call.
      </p>
      {hasReviewTags ? (
        <p className="mt-4 rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm text-white/60">
          Your matter includes details the attorney will confirm during the call.
        </p>
      ) : null}
    </div>
  );
}
