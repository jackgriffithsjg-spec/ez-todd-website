"use client";

import { useMemo, useState } from "react";
import type { MatterStatus, ReviewFlag, Submission } from "@/lib/submissionTypes";
import { matterStatuses } from "@/lib/submissionTypes";
import { ReviewFlagBadge } from "@/components/ReviewFlagBadge";
import { SubmissionStatusBadge } from "@/components/SubmissionStatusBadge";

const flagFilters = [
  { label: "All flags", value: "all" },
  { label: "Tier 1 only", value: "tier1" },
  { label: "Tier 2 only", value: "tier2" },
  { label: "Legal description", value: "legal-description" },
  { label: "Rural/agricultural", value: "rural" },
];

function matchesFlagFilter(flags: ReviewFlag[], filter: string) {
  if (filter === "all") return true;
  if (filter === "tier1") return flags.some((flag) => flag.tier === 1);
  if (filter === "tier2") return flags.some((flag) => flag.tier === 2);
  if (filter === "legal-description") {
    return flags.some((flag) => flag.label === "Tier 2: Legal description retrieval");
  }
  if (filter === "rural") {
    return flags.some((flag) => flag.label === "Tier 2: Rural/agricultural property");
  }
  return true;
}

type SubmissionTableProps = {
  submissions: Submission[];
};

export function SubmissionTable({ submissions }: SubmissionTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<MatterStatus | "all">("all");
  const [flag, setFlag] = useState("all");

  const filteredSubmissions = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return submissions.filter((submission) => {
      const haystack = [
        submission.client.fullLegalName,
        submission.client.email,
        submission.client.phone,
        submission.property.county,
        submission.property.streetAddress,
        submission.recommendedDeed,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText ? haystack.includes(searchText) : true;
      const matchesStatus = status === "all" ? true : submission.status === status;
      const matchesFlag = matchesFlagFilter(submission.flags, flag);
      return matchesSearch && matchesStatus && matchesFlag;
    });
  }, [flag, search, status, submissions]);

  return (
    <section className="rounded-md border border-white/10 bg-white/[0.03]">
      <div className="grid gap-3 border-b border-white/10 p-4 lg:grid-cols-[1fr_220px_180px]">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Search</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Client, county, address, email, phone..."
            className="mt-2 w-full rounded-md border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-white/40"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Status</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as MatterStatus | "all")}
            className="mt-2 w-full rounded-md border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-white/40"
          >
            <option value="all">All statuses</option>
            {matterStatuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Flag</span>
          <select
            value={flag}
            onChange={(event) => setFlag(event.target.value)}
            className="mt-2 w-full rounded-md border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-white/40"
          >
            {flagFilters.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto xl:overflow-visible">
        <table className="w-full table-fixed text-left text-xs xl:text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-[0.16em] text-white/40">
            <tr>
              <th className="w-[17%] px-3 py-3 font-semibold">Client</th>
              <th className="w-[18%] px-3 py-3 font-semibold">Property</th>
              <th className="w-[12%] px-3 py-3 font-semibold">Deed</th>
              <th className="w-[15%] px-3 py-3 font-semibold">Status</th>
              <th className="w-[18%] px-3 py-3 font-semibold">Flags</th>
              <th className="w-[7%] px-3 py-3 font-semibold">Price</th>
              <th className="w-[7%] px-3 py-3 font-semibold">Submitted</th>
              <th className="w-[6%] px-3 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredSubmissions.map((submission) => (
              <tr key={submission.id} className="align-top">
                <td className="px-3 py-4">
                  <p className="font-semibold text-white">{submission.client.fullLegalName}</p>
                  <p className="mt-1 text-white/55">{submission.client.email}</p>
                  <p className="mt-1 text-white/55">{submission.client.phone}</p>
                </td>
                <td className="px-3 py-4">
                  <p className="font-semibold text-white">{submission.property.county} County</p>
                  <p className="mt-1 text-white/55">{submission.property.streetAddress}</p>
                </td>
                <td className="px-3 py-4 text-white/75">{submission.recommendedDeed}</td>
                <td className="px-3 py-4">
                  <SubmissionStatusBadge status={submission.status} />
                </td>
                <td className="px-3 py-4">
                  <div className="flex flex-wrap gap-2">
                    {submission.flags.length > 0 ? (
                      submission.flags.map((item) => <ReviewFlagBadge key={item.label} flag={item} />)
                    ) : (
                      <span className="text-white/45">No flags</span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-4 font-semibold text-white">{submission.priceEstimate}</td>
                <td className="px-3 py-4 text-white/60">{submission.submittedDate}</td>
                <td className="px-3 py-4">
                  <a
                    href={`/portal/submissions/${submission.id}`}
                    className="inline-flex rounded-md bg-white px-2.5 py-2 text-xs font-semibold text-black"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredSubmissions.length === 0 ? (
        <p className="border-t border-white/10 p-5 text-sm text-white/55">No submissions match those filters.</p>
      ) : null}
    </section>
  );
}
