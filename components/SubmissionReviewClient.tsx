"use client";

import type { Submission } from "@/lib/submissionTypes";
import { InternalNotesCard } from "@/components/InternalNotesCard";
import { StatusControls } from "@/components/StatusControls";

export function SubmissionReviewClient({ submission }: { submission: Submission }) {
  return (
    <>
      <InternalNotesCard submissionId={submission.id} initialNote={submission.internalNote} />
      <StatusControls submissionId={submission.id} initialStatus={submission.status} />
    </>
  );
}
