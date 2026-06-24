import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MatterOverviewCard } from "@/components/MatterOverviewCard";
import { PortalShell } from "@/components/PortalShell";
import { ReviewFlagBadge } from "@/components/ReviewFlagBadge";
import { SubmissionDetailCard } from "@/components/SubmissionDetailCard";
import { SubmissionReviewClient } from "@/components/SubmissionReviewClient";
import { fetchSubmissionById } from "@/lib/submissions";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Submission Details | EZ TODD Lawyer Portal",
  description: "Prototype submission detail review for the EZ TODD lawyer portal.",
  robots: {
    index: false,
    follow: false,
  },
};

type SubmissionDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

function DetailGrid({ items }: { items: { label: string; value?: string }[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-md border border-white/10 bg-black p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">{item.label}</dt>
          <dd className="mt-2 text-sm leading-6 text-white/75">{item.value || "Not provided"}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function SubmissionDetailPage({ params }: SubmissionDetailPageProps) {
  const { id } = await params;
  let submission = null;
  let loadError = "";
  const supabase = await createServerSupabaseClient().catch((error) => {
    loadError = error instanceof Error ? error.message : "Supabase is not configured.";
    return null;
  });

  if (!supabase) {
    return (
      <PortalShell>
        <section className="rounded-md border border-red-300/30 bg-red-500/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-100/70">
            Portal setup required
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-red-100">
            Unable to load submission.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-red-100/80">{loadError}</p>
          <a href="/portal" className="mt-6 inline-flex rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black">
            Back to Dashboard
          </a>
        </section>
      </PortalShell>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/portal/login");

  try {
    submission = await fetchSubmissionById(supabase, id);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unable to load submission.";
  }

  if (!submission) {
    return (
      <PortalShell>
        <section className="rounded-md border border-white/10 bg-white/[0.03] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
            Submission not found
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal">No matching submission.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
            {loadError || "The requested submission was not found in Supabase."}
          </p>
          <a href="/portal" className="mt-6 inline-flex rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black">
            Back to Dashboard
          </a>
        </section>
      </PortalShell>
    );
  }

  const tier1Flags = submission.flags.filter((flag) => flag.tier === 1);
  const tier2Flags = submission.flags.filter((flag) => flag.tier === 2);
  const clientPhoneHref = `tel:+1${submission.client.phone.replace(/\D/g, "")}`;

  return (
    <PortalShell>
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
            Submission {submission.id}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
            {submission.client.fullLegalName}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
            {submission.property.streetAddress}, {submission.property.county} County, Texas
          </p>
        </div>
        <a href="/portal" className="rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white/70">
          Back to Dashboard
        </a>
      </div>

      <div className="grid gap-6">
        <MatterOverviewCard submission={submission} />

        <SubmissionDetailCard title="Client Information">
          <DetailGrid
            items={[
              { label: "Full legal name", value: submission.client.fullLegalName },
              { label: "Prior name", value: submission.client.priorName },
              { label: "Mailing address", value: submission.client.mailingAddress },
              { label: "Phone", value: submission.client.phone },
              { label: "Email", value: submission.client.email },
              { label: "Marital status", value: submission.client.maritalStatus },
              { label: "Spouse name", value: submission.client.spouseName },
            ]}
          />
        </SubmissionDetailCard>

        <SubmissionDetailCard title="Property Information">
          <DetailGrid
            items={[
              { label: "County", value: `${submission.property.county} County` },
              { label: "Property street address", value: submission.property.streetAddress },
              { label: "Property type", value: submission.property.propertyType },
              { label: "Homestead status", value: submission.property.homesteadStatus },
              { label: "Legal description status", value: submission.property.legalDescriptionStatus },
              { label: "Legal description text", value: submission.property.legalDescriptionText },
              { label: "Current deed upload", value: submission.property.currentDeedUpload },
            ]}
          />
        </SubmissionDetailCard>

        <SubmissionDetailCard title="Deed Recommendation">
          <div className="rounded-md border border-white/10 bg-black p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Preliminary recommendation
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">{submission.recommendedDeed}</p>
            <p className="mt-4 text-sm leading-6 text-white/60">{submission.recommendationReasoning}</p>
            <p className="mt-4 rounded-md border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/70">
              Based on the intake answers, this may be the better fit. The attorney confirms the correct
              deed during the confirmation call.
            </p>
          </div>
        </SubmissionDetailCard>

        <SubmissionDetailCard title="Red Flags and Review Tags">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-md border border-red-300/20 bg-red-500/10 p-4">
              <h3 className="font-semibold text-red-100">Tier 1 flags</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {tier1Flags.length > 0 ? (
                  tier1Flags.map((flag) => <ReviewFlagBadge key={flag.label} flag={flag} />)
                ) : (
                  <p className="text-sm text-red-100/60">No Tier 1 flags.</p>
                )}
              </div>
            </div>
            <div className="rounded-md border border-amber-300/20 bg-amber-400/10 p-4">
              <h3 className="font-semibold text-amber-100">Tier 2 review tags</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {tier2Flags.length > 0 ? (
                  tier2Flags.map((flag) => <ReviewFlagBadge key={flag.label} flag={flag} />)
                ) : (
                  <p className="text-sm text-amber-100/60">No Tier 2 tags.</p>
                )}
              </div>
            </div>
          </div>
        </SubmissionDetailCard>

        <SubmissionDetailCard title="Beneficiaries">
          <div className="grid gap-4 lg:grid-cols-2">
            {submission.beneficiaries.map((beneficiary) => (
              <article key={beneficiary.name} className="rounded-md border border-white/10 bg-black p-4">
                <h3 className="font-semibold text-white">{beneficiary.name}</h3>
                <dl className="mt-4 grid gap-2 text-sm text-white/60">
                  <div><dt className="font-semibold text-white">Relationship</dt><dd>{beneficiary.relationship}</dd></div>
                  <div><dt className="font-semibold text-white">Mailing address</dt><dd>{beneficiary.mailingAddress}</dd></div>
                  <div><dt className="font-semibold text-white">Share percentage</dt><dd>{beneficiary.sharePercentage || "Placeholder if available"}</dd></div>
                  <div><dt className="font-semibold text-white">Alternate beneficiary</dt><dd>{beneficiary.alternate || "Alternate beneficiary placeholder"}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </SubmissionDetailCard>

        <SubmissionReviewClient submission={submission} />

        <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-semibold tracking-normal text-white">Action Buttons</h2>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={clientPhoneHref} className="rounded-md bg-white px-4 py-2.5 text-center text-sm font-semibold text-black">
              Call Client
            </a>
            <a href={`mailto:${submission.client.email}`} className="rounded-md border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white">
              Email Client
            </a>
            <button type="button" className="rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-white">
              Mark Ready for Confirmation Call
            </button>
            <button type="button" className="rounded-md border border-red-300/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-100">
              Decline / Needs Custom Review
            </button>
            <a href="/portal" className="rounded-md border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white">
              Back to Dashboard
            </a>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
