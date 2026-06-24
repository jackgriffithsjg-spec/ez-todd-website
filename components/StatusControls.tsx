"use client";

import { useState } from "react";
import type { MatterStatus } from "@/lib/mockSubmissions";
import { matterStatuses } from "@/lib/mockSubmissions";
import { SubmissionStatusBadge } from "@/components/SubmissionStatusBadge";

export function StatusControls({ initialStatus }: { initialStatus: MatterStatus }) {
  const [status, setStatus] = useState<MatterStatus>(initialStatus);

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
            onChange={(event) => setStatus(event.target.value as MatterStatus)}
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
        Status changes update this screen only. Database storage and audit logging are not connected.
      </p>
    </section>
  );
}
