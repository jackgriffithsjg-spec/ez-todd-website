import type { Metadata } from "next";
import { AcknowledgmentBox } from "@/components/AcknowledgmentBox";
import { AgreementPreview } from "@/components/AgreementPreview";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MergeField } from "@/components/MergeField";
import type { DeedType } from "@/components/PricingSummaryCard";

export const metadata: Metadata = {
  title: "Limited Scope Engagement Agreement Mockup | EZ TODD by EZ Law",
  description:
    "Review a mock limited-scope engagement agreement preview for the EZ TODD deed product.",
};

type EngagementAgreementPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function selectedDeedFromParam(value: string | string[] | undefined): DeedType | undefined {
  const deed = firstParam(value);
  if (deed === "lady-bird") return "Lady Bird Deed";
  if (deed === "todd") return "Transfer on Death Deed";
  return undefined;
}

function queryString(selectedDeed: DeedType | undefined, legalDescriptionSelected: boolean) {
  if (!selectedDeed) return "";
  const deed = selectedDeed === "Lady Bird Deed" ? "lady-bird" : "todd";
  return `?deed=${deed}&legalDescription=${legalDescriptionSelected ? "yes" : "no"}`;
}

export default async function EngagementAgreementPage({
  searchParams,
}: EngagementAgreementPageProps) {
  const params = searchParams ? await searchParams : {};
  const selectedDeed = selectedDeedFromParam(params.deed);
  const legalDescriptionSelected = firstParam(params.legalDescription) === "yes";
  const fee = selectedDeed === "Lady Bird Deed" ? 600 : selectedDeed === "Transfer on Death Deed" ? 500 : undefined;
  const total = fee ? fee + (legalDescriptionSelected ? 20 : 0) : undefined;
  const nextQuery = queryString(selectedDeed, legalDescriptionSelected);

  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Agreement preview
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              Limited Scope Engagement Agreement
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
              This mockup shows representative agreement sections and merge fields.
              Final e-signature and acceptance workflow will be implemented later.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6">
            <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-2xl font-semibold tracking-normal">Agreement summary</h2>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-md border border-white/10 bg-black p-4"><dt className="text-white/40">Client</dt><dd className="mt-2"><MergeField>[owner_legal_name]</MergeField></dd></div>
                <div className="rounded-md border border-white/10 bg-black p-4"><dt className="text-white/40">Property</dt><dd className="mt-2"><MergeField>[property_address]</MergeField>, <MergeField>[property_county]</MergeField> County, Texas</dd></div>
                <div className="rounded-md border border-white/10 bg-black p-4"><dt className="text-white/40">Deed type</dt><dd className="mt-2">{selectedDeed ?? <MergeField>[deed_type_selected]</MergeField>}</dd></div>
                <div className="rounded-md border border-white/10 bg-black p-4"><dt className="text-white/40">Fee</dt><dd className="mt-2">{total ? `$${total}` : <MergeField>[fee_amount]</MergeField>}</dd></div>
              </dl>
            </section>
            <AgreementPreview />
            <AcknowledgmentBox label="I have reviewed the Limited Scope Engagement Agreement and understand that EZ Law must accept my matter before an attorney-client relationship begins." />
            <p className="rounded-md border border-white/10 bg-black p-4 text-sm leading-6 text-white/55">
              This is a website prototype. Final e-signature and acceptance workflow
              will be implemented later.
            </p>
          </div>
        </section>

        <CTASection
          title="Continue to checkout review."
          body="No real e-signature is collected in this prototype."
          primaryLabel="Continue to Checkout"
          primaryHref={`/checkout${nextQuery}`}
          secondaryLabel="Back to Summary"
          secondaryHref={`/intake/summary${nextQuery}`}
        />
      </main>
      <Footer />
    </>
  );
}
