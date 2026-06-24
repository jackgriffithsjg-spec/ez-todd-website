"use client";

import { useState } from "react";
import type { MatterStatus } from "@/lib/submissionTypes";
import { matterStatuses } from "@/lib/submissionTypes";
import { SubmissionStatusBadge } from "@/components/SubmissionStatusBadge";

export function StatusControls({
  submissionId,
  initialStatus,
}: {
  submissionId: string;
  initialStatus: MatterStatus;
}) {
  const [status, setStatus] = useState<MatterStatus>(initialStatus);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function updateStatus(nextStatus: MatterStatus) {
    setStatus(nextStatus);
    setMessage("");
    setIsSaving(true);

    const response = await fetch(`/api/portal/submissions/${submissionId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });

    setIsSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setStatus(initialStatus);
      setMessage(data?.error || "Status update failed.");
      return;
    }

    setMessage("Status saved to Supabase and status history updated.");
  }

  return (
    <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
      <h2 className="text-xl font-semibold tracking-normal text-white">Status Controls</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
            Current status
          </span>
          <select
            value={status}
            onChange={(event) => updateStatus(event.target.value as MatterStatus)}
            className="mt-2 w-full rounded-md border border-white/10 bg-black px-3 py-3 text-sm text-white outline-none focus:border-white/40"
          >
            {matterStatuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <SubmissionStatusBadge status={status} />
      </div>
      <p className="mt-4 text-sm leading-6 text-white/50">
        {isSaving
          ? "Saving status..."
          : "Status changes persist to Supabase and create a status history entry."}
      </p>
      {message ? <p className="mt-3 text-sm text-white/60">{message}</p> : null}
    </section>
  );
}
