"use client";

import type { Submission } from "@/lib/mockSubmissions";
import { InternalNotesCard } from "@/components/InternalNotesCard";
import { StatusControls } from "@/components/StatusControls";

export function SubmissionReviewClient({ submission }: { submission: Submission }) {
  return (
    <>
      <InternalNotesCard initialNote={submission.internalNote} />
      <StatusControls initialStatus={submission.status} />
    </>
  );
}
