"use client";

import { type FormEvent, useMemo, useState } from "react";
import { FieldGroup } from "@/components/FieldGroup";
import { HelpBar } from "@/components/HelpBar";
import { IntakeProgress } from "@/components/IntakeProgress";
import { IntakeStepCard } from "@/components/IntakeStepCard";
import { InternalMatterTags } from "@/components/InternalMatterTags";
import { PreliminaryRecommendationCard } from "@/components/PreliminaryRecommendationCard";

const progressSteps = [
  "Getting Started",
  "About You",
  "Property",
  "Beneficiaries",
  "Review",
  "Next Steps",
];

type IntakeState = {
  texasProperty: string;
  mainReason: string;
  poaConcern: string;
  warranty: string;
  nameChanged: string;
  ownerOfRecord: string;
  maritalStatus: string;
  spouseWillSign: string;
  divorceOrder: string;
  signingAuthority: string;
  propertyType: string;
  homestead: string;
  legalDescription: string;
};

type ReviewTrigger = {
  key: string;
  flag: string;
  resetField: keyof IntakeState;
};

const initialState: IntakeState = {
  texasProperty: "",
  mainReason: "",
  poaConcern: "",
  warranty: "",
  nameChanged: "",
  ownerOfRecord: "",
  maritalStatus: "",
  spouseWillSign: "",
  divorceOrder: "",
  signingAuthority: "",
  propertyType: "",
  homestead: "",
  legalDescription: "",
};

const reviewKeysByField: Partial<Record<keyof IntakeState, string[]>> = {
  texasProperty: ["texasProperty:no"],
  mainReason: ["mainReason:medicaid"],
  ownerOfRecord: ["ownerOfRecord:review"],
  divorceOrder: ["divorceOrder:yes"],
  homestead: ["homesteadSpouse:review"],
  spouseWillSign: ["homesteadSpouse:review"],
  signingAuthority: ["signingAuthority:poa"],
};

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white">
        {label}
        {required ? <span className="text-white/45"> *</span> : null}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-white/10 bg-black px-3 py-3 text-sm text-white outline-none focus:border-white/45"
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function IntakeMockup() {
  const [answers, setAnswers] = useState<IntakeState>(initialState);
  const [confirmedReviewAnswers, setConfirmedReviewAnswers] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setAnswer = (key: keyof IntakeState, value: string) => {
    setSubmitError("");
    const reviewKeys = reviewKeysByField[key] || [];
    if (reviewKeys.length > 0) {
      setConfirmedReviewAnswers((current) => {
        const next = { ...current };
        reviewKeys.forEach((reviewKey) => {
          delete next[reviewKey];
        });
        return next;
      });
    }
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  const tier1ReviewTriggers = useMemo(() => {
    const triggers: ReviewTrigger[] = [];
    if (answers.texasProperty === "No") {
      triggers.push({
        key: "texasProperty:no",
        flag: "Property is not located in Texas",
        resetField: "texasProperty",
      });
    }
    if (answers.mainReason === "Plan for Medicaid or long-term care") {
      triggers.push({
        key: "mainReason:medicaid",
        flag: "Medicaid or long-term care planning selected",
        resetField: "mainReason",
      });
    }
    if (answers.ownerOfRecord === "No" || answers.ownerOfRecord === "Not sure") {
      triggers.push({
        key: "ownerOfRecord:review",
        flag: "Owner of record needs review",
        resetField: "ownerOfRecord",
      });
    }
    if (answers.divorceOrder === "Yes") {
      triggers.push({
        key: "divorceOrder:yes",
        flag: "Divorce decree or court order involves the property",
        resetField: "divorceOrder",
      });
    }
    if (answers.homestead === "Yes" && (answers.spouseWillSign === "No" || answers.spouseWillSign === "Not sure")) {
      triggers.push({
        key: "homesteadSpouse:review",
        flag: "Homestead spouse signature issue",
        resetField: "spouseWillSign",
      });
    }
    if (answers.signingAuthority === "Someone under a power of attorney") {
      triggers.push({
        key: "signingAuthority:poa",
        flag: "Someone will sign under a power of attorney",
        resetField: "signingAuthority",
      });
    }
    return triggers;
  }, [answers]);

  const tier1Flags = useMemo(
    () => tier1ReviewTriggers.map((trigger) => trigger.flag),
    [tier1ReviewTriggers],
  );

  const unconfirmedReviewTriggers = useMemo(
    () => tier1ReviewTriggers.filter((trigger) => !confirmedReviewAnswers[trigger.key]),
    [confirmedReviewAnswers, tier1ReviewTriggers],
  );

  const tier2Tags = useMemo(() => {
    const tags: string[] = [];
    if (answers.nameChanged === "Yes") tags.push("Attorney review: name change");
    if (answers.propertyType === "Rural or agricultural land") tags.push("Drafting review: rural property");
    if (answers.propertyType === "Commercial") tags.push("Drafting review: commercial property");
    if (answers.propertyType === "Mineral interest") tags.push("Drafting review: mineral interest");
    if (answers.legalDescription === "No" || answers.legalDescription === "Not sure") tags.push("Add-on: legal description retrieval");
    if (answers.poaConcern === "Yes" || answers.poaConcern === "Not sure") tags.push("Deed choice review: power of attorney concern");
    return tags;
  }, [answers]);

  const recommendation = useMemo(() => {
    if (tier1Flags.length > 0) return "Attorney Review Needed" as const;
    if (
      answers.poaConcern === "Yes" ||
      answers.poaConcern === "Not sure" ||
      answers.warranty === "Yes" ||
      answers.mainReason === "Keep control now and decide later"
    ) {
      return "Lady Bird Deed" as const;
    }
    return "Transfer on Death Deed" as const;
  }, [answers, tier1Flags.length]);

  const summaryHref =
    recommendation === "Attorney Review Needed"
      ? "/intake/summary"
      : `/intake/summary?deed=${recommendation === "Lady Bird Deed" ? "lady-bird" : "todd"}&legalDescription=${
          answers.legalDescription === "No" || answers.legalDescription === "Not sure"
            ? "yes"
            : "no"
        }`;

  const tier1SubmissionFlags = tier1Flags.map((flag) => ({
    tier: "Tier 1",
    label:
      flag === "Medicaid or long-term care planning selected"
        ? "Tier 1: Medicaid / long-term care planning"
        : flag === "Owner of record needs review"
          ? "Tier 1: Ownership not confirmed"
          : flag === "Property is not located in Texas"
            ? "Tier 1: Non-Texas property"
            : flag === "Divorce decree or court order involves the property"
              ? "Tier 1: Divorce decree or court order issue"
              : flag === "Homestead spouse signature issue"
                ? "Tier 1: Homestead spouse signature issue"
                : "Tier 1: Power of attorney signing issue",
    description: flag,
  }));

  function confirmReviewAnswer(key: string) {
    setSubmitError("");
    setConfirmedReviewAnswers((current) => ({ ...current, [key]: true }));
  }

  function changeReviewAnswer(trigger: ReviewTrigger) {
    setConfirmedReviewAnswers((current) => {
      const next = { ...current };
      delete next[trigger.key];
      return next;
    });
    setAnswer(trigger.resetField, "");
  }

  function reviewConfirmation(key: string) {
    const trigger = tier1ReviewTriggers.find((item) => item.key === key);
    if (!trigger) return null;

    if (confirmedReviewAnswers[key]) {
      return (
        <p className="mt-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs leading-5 text-white/50">
          Attorney review acknowledged for this answer.
        </p>
      );
    }

    return (
      <div className="mt-2 rounded-md border border-amber-300/30 bg-amber-400/10 p-3">
        <p className="text-sm leading-6 text-amber-50">
          That answer may require attorney review. Did you mean to choose it?
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => confirmReviewAnswer(key)}
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black"
          >
            Yes, continue
          </button>
          <button
            type="button"
            onClick={() => changeReviewAnswer(trigger)}
            className="rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white"
          >
            Change answer
          </button>
        </div>
      </div>
    );
  }

  const tier2SubmissionFlags = tier2Tags.map((tag) => ({
    tier: "Tier 2",
    label:
      tag === "Attorney review: name change"
        ? "Tier 2: Name change review"
        : tag === "Drafting review: rural property"
          ? "Tier 2: Rural/agricultural property"
          : tag === "Drafting review: commercial property"
            ? "Tier 2: Commercial property"
            : tag === "Drafting review: mineral interest"
              ? "Tier 2: Mineral interest"
              : tag === "Add-on: legal description retrieval"
                ? "Tier 2: Legal description retrieval"
                : "Tier 2: Power of attorney concern",
    description: tag,
  }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    if (unconfirmedReviewTriggers.length > 0) {
      setSubmitError("Please confirm or change each answer that may require attorney review before continuing.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const legalDescriptionAddon =
      answers.legalDescription === "No" || answers.legalDescription === "Not sure";

    const response = await fetch("/api/intake-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ownerLegalName: formData.get("ownerLegalName"),
        ownerPriorName: answers.nameChanged === "Yes" ? "[owner_prior_name]" : null,
        ownerMailingAddress: formData.get("ownerMailingAddress"),
        ownerPhone: formData.get("ownerPhone"),
        ownerEmail: formData.get("ownerEmail"),
        ownerMaritalStatus: answers.maritalStatus,
        spouseLegalName: answers.maritalStatus === "Married" ? "[spouse_legal_name]" : null,
        propertyCounty: formData.get("propertyCounty"),
        propertyAddress: formData.get("propertyAddress"),
        propertyType: answers.propertyType,
        isHomestead: answers.homestead,
        legalDescriptionStatus: answers.legalDescription,
        legalDescription: legalDescriptionAddon ? null : "[legal_description_from_client]",
        recommendation,
        recommendationReason:
          recommendation === "Lady Bird Deed"
            ? "Preliminary guidance selected Lady Bird Deed based on flexibility, warranty, or power-of-attorney answers."
            : "Preliminary guidance selected Transfer on Death Deed based on probate-avoidance answers.",
        legalDescriptionAddon,
        flags: [...tier1SubmissionFlags, ...tier2SubmissionFlags],
        primaryBeneficiaryName: formData.get("primaryBeneficiaryName"),
        primaryBeneficiaryRelationship: formData.get("primaryBeneficiaryRelationship"),
        primaryBeneficiaryAddress: formData.get("primaryBeneficiaryAddress"),
        alternateBeneficiaryName: formData.get("alternateBeneficiaryName"),
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setSubmitError(data?.error || "Submission failed. Please try again or contact EZ Law.");
      return;
    }

    const data = await response.json();
    window.location.assign(`${summaryHref}${summaryHref.includes("?") ? "&" : "?"}submissionId=${data.id}`);
  }

  return (
    <>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
            Intake mockup
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
            Texas Deed Questionnaire
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
            This is a polished client-facing prototype. It can now save intake
            submissions to Supabase, but it does not collect payment or create a
            signed engagement.
          </p>
          <div className="mt-8 grid gap-4">
            <IntakeProgress steps={progressSteps} currentStep={0} />
            <HelpBar showStartOver />
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6">
            <form className="grid gap-6" onSubmit={handleSubmit}>
              <IntakeStepCard eyebrow="Step 1" title="Getting Started">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <SelectField label="Is the property located in Texas?" value={answers.texasProperty} onChange={(value) => setAnswer("texasProperty", value)} options={["Yes", "No"]} required />
                    {reviewConfirmation("texasProperty:no")}
                  </div>
                  <div>
                    <SelectField label="What is your main reason for doing this?" value={answers.mainReason} onChange={(value) => setAnswer("mainReason", value)} options={["Avoid probate and pass my home to my family", "Plan for Medicaid or long-term care", "Keep control now and decide later", "Not sure"]} required />
                    {reviewConfirmation("mainReason:medicaid")}
                  </div>
                  <SelectField label="Might you need someone to sign for you under a power of attorney, now or later?" value={answers.poaConcern} onChange={(value) => setAnswer("poaConcern", value)} options={["Yes", "No", "Not sure"]} required />
                  <SelectField label="Do you want your deed to include a warranty of title?" value={answers.warranty} onChange={(value) => setAnswer("warranty", value)} options={["Yes", "No", "Not sure"]} />
                </div>
              </IntakeStepCard>

              <IntakeStepCard eyebrow="Step 2" title="About You">
                <div className="grid gap-5 md:grid-cols-2">
                  <FieldGroup name="ownerLegalName" label="Full legal name" placeholder="Jane A. Owner" required />
                  <SelectField label="Has your name changed since your current deed was recorded?" value={answers.nameChanged} onChange={(value) => setAnswer("nameChanged", value)} options={["Yes", "No"]} required />
                  <FieldGroup name="ownerMailingAddress" label="Mailing address" placeholder="Street, city, state, ZIP" required />
                  <FieldGroup name="ownerPhone" label="Phone number" type="tel" placeholder="[firm phone format]" required />
                  <FieldGroup name="ownerEmail" label="Email address" type="email" placeholder="you@example.com" required />
                  <div>
                    <SelectField label="Are you the current owner shown on the deed or county records?" value={answers.ownerOfRecord} onChange={(value) => setAnswer("ownerOfRecord", value)} options={["Yes", "No", "Not sure"]} required />
                    {reviewConfirmation("ownerOfRecord:review")}
                  </div>
                  <SelectField label="Marital status" value={answers.maritalStatus} onChange={(value) => setAnswer("maritalStatus", value)} options={["Married", "Divorced", "Widowed", "Separated", "Single"]} required />
                  <div>
                    <SelectField label="Will your spouse sign the deed if needed?" value={answers.spouseWillSign} onChange={(value) => setAnswer("spouseWillSign", value)} options={["Yes", "No", "Not sure"]} />
                    {reviewConfirmation("homesteadSpouse:review")}
                  </div>
                  <div>
                    <SelectField label="Does a divorce decree or court order involve this property?" value={answers.divorceOrder} onChange={(value) => setAnswer("divorceOrder", value)} options={["Yes", "No"]} />
                    {reviewConfirmation("divorceOrder:yes")}
                  </div>
                  <div>
                    <SelectField label="Will you sign the deed yourself, or will someone sign for you under a power of attorney?" value={answers.signingAuthority} onChange={(value) => setAnswer("signingAuthority", value)} options={["Myself", "Someone under a power of attorney"]} required />
                    {reviewConfirmation("signingAuthority:poa")}
                  </div>
                </div>
              </IntakeStepCard>

              <IntakeStepCard eyebrow="Step 3" title="Property">
                <div className="grid gap-5 md:grid-cols-2">
                  <FieldGroup name="propertyCounty" label="County where the property is located" placeholder="County, Texas" required />
                  <FieldGroup name="propertyAddress" label="Property street address" placeholder="Property address" required />
                  <SelectField label="Property type" value={answers.propertyType} onChange={(value) => setAnswer("propertyType", value)} options={["Single-family home", "Condominium", "Townhome", "Vacant land", "Rural or agricultural land", "Rental property", "Commercial", "Mineral interest", "Other"]} required />
                  <SelectField label="Is this your homestead?" value={answers.homestead} onChange={(value) => setAnswer("homestead", value)} options={["Yes", "No"]} required />
                  <SelectField label="Do you have your property's legal description?" value={answers.legalDescription} onChange={(value) => setAnswer("legalDescription", value)} options={["Yes", "No", "Not sure"]} required />
                  <FieldGroup label="Upload current deed placeholder" type="file" />
                </div>
              </IntakeStepCard>

              <IntakeStepCard eyebrow="Step 4" title="Beneficiaries">
                <div className="grid gap-5 md:grid-cols-2">
                  <FieldGroup name="primaryBeneficiaryName" label="Primary beneficiary name" placeholder="Full legal name or organization" required />
                  <FieldGroup name="primaryBeneficiaryRelationship" label="Relationship to you" placeholder="Child, spouse, trust, charity, etc." />
                  <FieldGroup name="primaryBeneficiaryAddress" label="Beneficiary mailing address" placeholder="Street, city, state, ZIP" />
                  <FieldGroup label="Add another beneficiary placeholder" placeholder="Additional beneficiary" />
                  <FieldGroup name="alternateBeneficiaryName" label="Add alternate beneficiary placeholder" placeholder="Backup beneficiary" />
                </div>
              </IntakeStepCard>

              <IntakeStepCard eyebrow="Step 5" title="Review">
                <div className="rounded-md border border-white/10 bg-black p-5">
                  <h3 className="text-lg font-semibold">Mock summary of answers</h3>
                  <dl className="mt-4 grid gap-3 text-sm text-white/60 sm:grid-cols-2">
                    <div><dt className="font-semibold text-white">Property</dt><dd>{answers.texasProperty || "Texas real property"} in [county]</dd></div>
                    <div><dt className="font-semibold text-white">Goal</dt><dd>{answers.mainReason || "Avoid probate / attorney review needed"}</dd></div>
                    <div><dt className="font-semibold text-white">Owner</dt><dd>[Client full legal name]</dd></div>
                    <div><dt className="font-semibold text-white">Beneficiary</dt><dd>[Primary beneficiary]</dd></div>
                  </dl>
                </div>
                <InternalMatterTags tags={tier2Tags} />
                <PreliminaryRecommendationCard recommendation={recommendation} hasReviewTags={tier2Tags.length > 0} />
              </IntakeStepCard>

              <IntakeStepCard eyebrow="Step 6" title="Next Steps">
                <p className="text-sm leading-6 text-white/60">
                  After the questionnaire, the client reviews the engagement agreement,
                  pays the flat fee, confirms details with the attorney, receives the
                  deed for review, signs and notarizes it, and EZ Law records it.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-white px-6 py-3 text-center text-sm font-semibold text-black disabled:cursor-not-allowed disabled:bg-white/50"
                  >
                    {isSubmitting ? "Saving..." : "Continue to Summary"}
                  </button>
                  <a href="/start" className="rounded-md border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white">
                    Back to Start
                  </a>
                </div>
                {submitError ? (
                  <p className="rounded-md border border-red-300/30 bg-red-500/10 p-3 text-sm leading-6 text-red-100">
                    {submitError}
                  </p>
                ) : null}
              </IntakeStepCard>
            </form>
        </div>
      </section>
    </>
  );
}
