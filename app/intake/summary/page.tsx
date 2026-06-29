import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IntakeSummaryCard } from "@/components/IntakeSummaryCard";
import { InternalMatterTags } from "@/components/InternalMatterTags";
import { PreliminaryRecommendationCard } from "@/components/PreliminaryRecommendationCard";
import { PricingSummaryCard } from "@/components/PricingSummaryCard";
import type { DeedType } from "@/components/PricingSummaryCard";

export const metadata: Metadata = {
  title: "Review Your Intake Summary | EZ TODD by EZ Law",
  description:
    "Review mock intake answers before continuing to the limited-scope engagement agreement.",
};

const ownerItems = [
  { label: "Full legal name", value: "[owner_legal_name]" },
  { label: "Mailing address", value: "[owner_mailing_address]" },
  { label: "Phone", value: "[owner_phone]" },
  { label: "Email", value: "[owner_email]" },
  { label: "Marital status", value: "[owner_marital_status]" },
];

const propertyItems = [
  { label: "Property street address", value: "[property_address]" },
  { label: "County", value: "[property_county] County, Texas" },
  { label: "Property type", value: "[property_type]" },
  { label: "Homestead status", value: "[is_homestead]" },
  { label: "Legal description status", value: "[legal_description_status]" },
  { label: "Current deed upload", value: "Current deed upload placeholder" },
];

const beneficiaryItems = [
  { label: "Primary beneficiary", value: "[beneficiary_name]" },
  { label: "Relationship", value: "[beneficiary_relationship]" },
  { label: "Mailing address", value: "[beneficiary_mailing_address]" },
  { label: "Alternate beneficiary", value: "[alternate_beneficiary_placeholder]" },
];

const reviewTags = [
  "Attorney review: name change",
  "Drafting review: rural property",
  "Add-on: legal description retrieval",
  "Deed choice review: power of attorney concern",
];

type SummaryPageProps = {
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

export default async function IntakeSummaryPage({ searchParams }: SummaryPageProps) {
  const params = searchParams ? await searchParams : {};
  const selectedDeed = selectedDeedFromParam(params.deed);
  const legalDescriptionSelected = firstParam(params.legalDescription) === "yes";
  const nextQuery = queryString(selectedDeed, legalDescriptionSelected);

  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Intake summary
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              Review your answers.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
              This mock summary shows how intake answers would be reviewed before the
              client continues to the limited-scope engagement agreement.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6">
            <IntakeSummaryCard title="Owner Information" items={ownerItems} />
            <IntakeSummaryCard title="Property Information" items={propertyItems} />
            <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-2xl font-semibold tracking-normal">Deed Recommendation</h2>
              <div className="mt-5">
                {selectedDeed ? (
                  <PreliminaryRecommendationCard recommendation={selectedDeed} hasReviewTags />
                ) : (
                  <p className="rounded-md border border-white/10 bg-black p-5 text-sm leading-6 text-white/60">
                    No preliminary deed recommendation is selected yet. Complete the
                    intake flow to carry a recommendation into this summary.
                  </p>
                )}
              </div>
            </section>
            <IntakeSummaryCard title="Beneficiaries" items={beneficiaryItems} />
            <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-2xl font-semibold tracking-normal">Attorney Review Notes</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Your matter includes details the attorney will confirm during the call.
              </p>
              <div className="mt-5">
                <InternalMatterTags tags={reviewTags} />
              </div>
            </section>
            <PricingSummaryCard
              selectedDeed={selectedDeed}
              legalDescriptionSelected={legalDescriptionSelected}
            />
          </div>
        </section>

        {selectedDeed ? (
          <CTASection
            title="Continue when the summary looks right."
            body="This prototype does not save, submit, or verify the information shown here."
            primaryLabel="Continue to Engagement Agreement"
            primaryHref={`/engagement-agreement${nextQuery}`}
            secondaryLabel="Edit Answers"
            secondaryHref="/intake"
          />
        ) : (
          <CTASection
            title="Attorney review is the next step."
            body="Because one or more answers may need attorney review, checkout is not available from this summary."
            primaryLabel="Call or Text EZ Law"
            primaryHref="tel:+18067776249"
            secondaryLabel="Edit Answers"
            secondaryHref="/intake"
          />
        )}
      </main>
      <Footer />
    </>
  );
}
