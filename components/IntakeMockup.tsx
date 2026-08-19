"use client";

import { type FormEvent, useMemo, useState } from "react";
import { HelpBar } from "@/components/HelpBar";
import { IntakeProgress } from "@/components/IntakeProgress";
import { IntakeStepCard } from "@/components/IntakeStepCard";
import { InternalMatterTags } from "@/components/InternalMatterTags";
import { PreliminaryRecommendationCard } from "@/components/PreliminaryRecommendationCard";
import { siteConfig } from "@/lib/site";

const progressSteps = ["Basics", "Owner", "Property", "Beneficiary", "Review", "Submit"];

type IntakeState = {
  texasProperty: string;
  mainReason: string;
  poaConcern: string;
  nameChanged: string;
  ownerOfRecord: string;
  maritalStatus: string;
  signingAuthority: string;
  propertyType: string;
  homestead: string;
  legalDescription: string;
};

type IntakeTextValues = {
  ownerLegalName: string;
  ownerMailingAddress: string;
  ownerPhone: string;
  ownerEmail: string;
  propertyCounty: string;
  propertyAddress: string;
  primaryBeneficiaryName: string;
};

type ReviewTrigger = {
  key: string;
  flag: string;
  resetField: keyof IntakeState;
};

type IntakeSubmissionError = {
  error?: string;
  detail?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const initialState: IntakeState = {
  texasProperty: "",
  mainReason: "",
  poaConcern: "",
  nameChanged: "",
  ownerOfRecord: "",
  maritalStatus: "",
  signingAuthority: "",
  propertyType: "",
  homestead: "",
  legalDescription: "",
};

const initialTextValues: IntakeTextValues = {
  ownerLegalName: "",
  ownerMailingAddress: "",
  ownerPhone: "",
  ownerEmail: "",
  propertyCounty: "",
  propertyAddress: "",
  primaryBeneficiaryName: "",
};

const reviewKeysByField: Partial<Record<keyof IntakeState, string[]>> = {
  texasProperty: ["texasProperty:no"],
  mainReason: ["mainReason:medicaid"],
  ownerOfRecord: ["ownerOfRecord:review"],
  signingAuthority: ["signingAuthority:poa"],
};

type ChoiceQuestion = {
  type: "choice";
  key: keyof IntakeState;
  groupIndex: number;
  eyebrow: string;
  title: string;
  helper: string;
  options: string[];
};

type TextQuestion = {
  type: "text";
  key: keyof IntakeTextValues;
  groupIndex: number;
  eyebrow: string;
  title: string;
  helper: string;
  placeholder?: string;
  inputType?: string;
  notice?: "sms";
};

type QuizQuestion = ChoiceQuestion | TextQuestion;

const quizQuestions: QuizQuestion[] = [
  {
    type: "choice",
    key: "texasProperty",
    groupIndex: 0,
    eyebrow: "First things first",
    title: "Is the property located in Texas?",
    helper: "EZ TODD is built for Texas real property.",
    options: ["Yes", "No"],
  },
  {
    type: "choice",
    key: "mainReason",
    groupIndex: 0,
    eyebrow: "Your goal",
    title: "What is the main reason you want this deed?",
    helper: "No perfect legal wording needed — just pick the closest fit.",
    options: [
      "Avoid probate and pass my home to my family",
      "Plan for Medicaid or long-term care",
      "Keep control now and decide later",
      "Not sure",
    ],
  },
  {
    type: "choice",
    key: "poaConcern",
    groupIndex: 0,
    eyebrow: "Signing",
    title: "Might someone need to sign for you under a power of attorney?",
    helper: "This helps the attorney spot whether extra review may be needed.",
    options: ["Yes", "No", "Not sure"],
  },
  {
    type: "text",
    key: "ownerLegalName",
    groupIndex: 1,
    eyebrow: "About you",
    title: "What is your full legal name?",
    helper: "Use the name you use on legal documents.",
    placeholder: "Jane A. Owner",
  },
  {
    type: "choice",
    key: "nameChanged",
    groupIndex: 1,
    eyebrow: "Name check",
    title: "Has your name changed since your current deed was recorded?",
    helper: "For example: marriage, divorce, or a legal name change.",
    options: ["Yes", "No"],
  },
  {
    type: "text",
    key: "ownerMailingAddress",
    groupIndex: 1,
    eyebrow: "Mailing address",
    title: "What is your mailing address?",
    helper: "This can be different from the property address.",
    placeholder: "Street, city, state, ZIP",
  },
  {
    type: "text",
    key: "ownerPhone",
    groupIndex: 1,
    eyebrow: "Best phone",
    title: "What phone number should EZ Law use to contact you?",
    helper: "Call or text updates may be used for this matter.",
    placeholder: "(806) 777-6249",
    inputType: "tel",
    notice: "sms",
  },
  {
    type: "text",
    key: "ownerEmail",
    groupIndex: 1,
    eyebrow: "Best email",
    title: "What email address should EZ Law use?",
    helper: "You’ll receive follow-up information here.",
    placeholder: "you@example.com",
    inputType: "email",
  },
  {
    type: "choice",
    key: "ownerOfRecord",
    groupIndex: 1,
    eyebrow: "Ownership",
    title: "Are you the current owner shown on the deed or county records?",
    helper: "If you are unsure, that is okay — the attorney can review it.",
    options: ["Yes", "No", "Not sure"],
  },
  {
    type: "choice",
    key: "maritalStatus",
    groupIndex: 1,
    eyebrow: "Marital status",
    title: "What is your marital status?",
    helper: "This can matter for Texas homestead and signing rules.",
    options: ["Married", "Divorced", "Widowed", "Separated", "Single"],
  },
  {
    type: "choice",
    key: "signingAuthority",
    groupIndex: 1,
    eyebrow: "Who signs",
    title: "Who will sign the deed?",
    helper: "Most people sign for themselves. Choose power of attorney if someone else will sign for you.",
    options: ["Myself", "Someone under a power of attorney"],
  },
  {
    type: "text",
    key: "propertyCounty",
    groupIndex: 2,
    eyebrow: "Property",
    title: "What Texas county is the property in?",
    helper: "The county is used for review and recording.",
    placeholder: "Lubbock County",
  },
  {
    type: "text",
    key: "propertyAddress",
    groupIndex: 2,
    eyebrow: "Property address",
    title: "What is the property street address?",
    helper: "If it is land without a street address, enter the best description you have.",
    placeholder: "123 Main Street",
  },
  {
    type: "choice",
    key: "propertyType",
    groupIndex: 2,
    eyebrow: "Property type",
    title: "What kind of property is it?",
    helper: "Pick the closest match.",
    options: [
      "Single-family home",
      "Condominium",
      "Townhome",
      "Vacant land",
      "Rural or agricultural land",
      "Rental property",
      "Commercial",
      "Mineral interest",
      "Other",
    ],
  },
  {
    type: "choice",
    key: "homestead",
    groupIndex: 2,
    eyebrow: "Homestead",
    title: "Is this your homestead?",
    helper: "In plain English: is this your primary residence?",
    options: ["Yes", "No"],
  },
  {
    type: "choice",
    key: "legalDescription",
    groupIndex: 2,
    eyebrow: "Legal description",
    title: "Do you have the property’s legal description?",
    helper: "It is okay if you do not. EZ Law can follow up if it is needed.",
    options: ["Yes", "No", "Not sure"],
  },
  {
    type: "text",
    key: "primaryBeneficiaryName",
    groupIndex: 3,
    eyebrow: "Beneficiary",
    title: "Who should receive the property?",
    helper: "Enter the full legal name of the primary beneficiary or organization.",
    placeholder: "Full legal name or organization",
  },
];

const fieldLabels: Record<keyof IntakeState | keyof IntakeTextValues, string> = {
  texasProperty: "whether the property is in Texas",
  mainReason: "your main reason",
  poaConcern: "whether power of attorney may be needed",
  nameChanged: "whether your name has changed",
  ownerOfRecord: "whether you are the owner of record",
  maritalStatus: "marital status",
  signingAuthority: "who will sign the deed",
  propertyType: "property type",
  homestead: "whether this is your homestead",
  legalDescription: "whether you have the legal description",
  ownerLegalName: "full legal name",
  ownerMailingAddress: "mailing address",
  ownerPhone: "phone number",
  ownerEmail: "email address",
  propertyCounty: "property county",
  propertyAddress: "property address",
  primaryBeneficiaryName: "primary beneficiary name",
};

function ChoiceField({
  question,
  value,
  onChange,
}: {
  question: ChoiceQuestion;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {question.options.map((option) => {
        const isSelected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-2xl border p-4 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:border-white/55 ${
              isSelected
                ? "border-white bg-white text-black shadow-xl shadow-white/10"
                : "border-white/10 bg-black text-white hover:bg-white/[0.06]"
            }`}
          >
            <span className="flex items-center justify-between gap-4">
              <span>{option}</span>
              <span
                className={`grid size-6 place-items-center rounded-full border text-xs ${
                  isSelected ? "border-black bg-black text-white" : "border-white/20 text-white/45"
                }`}
              >
                {isSelected ? "✓" : ""}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TextField({
  question,
  value,
  onChange,
}: {
  question: TextQuestion;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <input
        name={question.key}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-base text-white outline-none transition placeholder:text-white/25 focus:border-white/55"
        type={question.inputType ?? "text"}
        placeholder={question.placeholder}
        required
      />
      {question.notice === "sms" ? (
        <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-5 text-white/55">
          By providing your mobile number, you agree to receive text messages from
          Zafrani Law PLLC (EZ Law) regarding services or updates. Message frequency
          may vary. Message and data rates may apply. Reply STOP to opt out, HELP
          for assistance. See our{" "}
          <a href={siteConfig.privacyPolicyUrl} className="text-white underline underline-offset-4">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href={siteConfig.termsOfUseUrl} className="text-white underline underline-offset-4">
            Terms of Use
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}

export function IntakeMockup() {
  const [answers, setAnswers] = useState<IntakeState>(initialState);
  const [textValues, setTextValues] = useState<IntakeTextValues>(initialTextValues);
  const [confirmedReviewAnswers, setConfirmedReviewAnswers] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);

  const reviewScreenIndex = quizQuestions.length;
  const submitScreenIndex = quizQuestions.length + 1;
  const totalScreens = quizQuestions.length + 2;
  const activeQuestion = currentScreen < quizQuestions.length ? quizQuestions[currentScreen] : null;
  const currentGroupIndex = activeQuestion?.groupIndex ?? (currentScreen === reviewScreenIndex ? 4 : 5);
  const progressPercent = Math.round(((currentScreen + 1) / totalScreens) * 100);

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

  const setTextValue = (key: keyof IntakeTextValues, value: string) => {
    setSubmitError("");
    setTextValues((current) => ({ ...current, [key]: value }));
  };

  const getFieldValue = (key: keyof IntakeState | keyof IntakeTextValues) => {
    if (key in answers) return answers[key as keyof IntakeState];
    return textValues[key as keyof IntakeTextValues];
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
      answers.mainReason === "Keep control now and decide later"
    ) {
      return "Lady Bird Deed" as const;
    }
    return "Transfer on Death Deed" as const;
  }, [answers, tier1Flags.length]);

  const tier1SubmissionFlags = tier1Flags.map((flag) => ({
    tier: "Tier 1",
    label:
      flag === "Medicaid or long-term care planning selected"
        ? "Tier 1: Medicaid / long-term care planning"
        : flag === "Owner of record needs review"
          ? "Tier 1: Ownership not confirmed"
          : flag === "Property is not located in Texas"
            ? "Tier 1: Non-Texas property"
            : "Tier 1: Power of attorney signing issue",
    description: flag,
  }));

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

  function confirmReviewAnswer(key: string) {
    setSubmitError("");
    setConfirmedReviewAnswers((current) => ({ ...current, [key]: true }));
  }

  function changeReviewAnswer(trigger: ReviewTrigger) {
    const questionIndex = quizQuestions.findIndex(
      (question) => question.type === "choice" && question.key === trigger.resetField,
    );
    setConfirmedReviewAnswers((current) => {
      const next = { ...current };
      delete next[trigger.key];
      return next;
    });
    setAnswer(trigger.resetField, "");
    if (questionIndex >= 0) setCurrentScreen(questionIndex);
  }

  function reviewConfirmation(key: string) {
    const trigger = tier1ReviewTriggers.find((item) => item.key === key);
    if (!trigger) return null;

    if (confirmedReviewAnswers[key]) {
      return (
        <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white/55">
          Got it — EZ Law will review this answer.
        </p>
      );
    }

    return (
      <div className="mt-4 rounded-2xl border border-amber-300/30 bg-amber-400/10 p-4">
        <p className="text-sm leading-6 text-amber-50">
          Quick check: this answer may need attorney review. Did you mean to choose it?
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => confirmReviewAnswer(key)}
            className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black"
          >
            Yes, continue
          </button>
          <button
            type="button"
            onClick={() => changeReviewAnswer(trigger)}
            className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white"
          >
            Change answer
          </button>
        </div>
      </div>
    );
  }

  const activeValue = activeQuestion ? getFieldValue(activeQuestion.key) : "";

  function validateCurrentScreen() {
    if (!activeQuestion) return true;

    if (!activeValue.trim()) {
      setSubmitError(`Please complete ${fieldLabels[activeQuestion.key]} before continuing.`);
      return false;
    }

    if (activeQuestion.type === "choice") {
      const hasUnconfirmedReviewAnswer = (reviewKeysByField[activeQuestion.key] || []).some((key) =>
        unconfirmedReviewTriggers.some((trigger) => trigger.key === key),
      );

      if (hasUnconfirmedReviewAnswer) {
        setSubmitError("Please confirm or change this answer before continuing.");
        return false;
      }
    }

    setSubmitError("");
    return true;
  }

  function validateAllRequiredFields() {
    const firstIncompleteQuestionIndex = quizQuestions.findIndex((question) => !getFieldValue(question.key).trim());
    if (firstIncompleteQuestionIndex >= 0) {
      const question = quizQuestions[firstIncompleteQuestionIndex];
      setCurrentScreen(firstIncompleteQuestionIndex);
      setSubmitError(`Please complete ${fieldLabels[question.key]} before submitting.`);
      return false;
    }

    if (unconfirmedReviewTriggers.length > 0) {
      const firstTrigger = unconfirmedReviewTriggers[0];
      const questionIndex = quizQuestions.findIndex(
        (question) => question.type === "choice" && question.key === firstTrigger.resetField,
      );
      if (questionIndex >= 0) setCurrentScreen(questionIndex);
      setSubmitError("Please confirm or change each answer that may require attorney review before submitting.");
      return false;
    }

    return true;
  }

  function goToNextScreen() {
    if (!validateCurrentScreen()) return;
    setCurrentScreen((screen) => Math.min(screen + 1, submitScreenIndex));
  }

  function goToPreviousScreen() {
    setSubmitError("");
    setCurrentScreen((screen) => Math.max(screen - 1, 0));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    if (!validateAllRequiredFields()) return;

    setIsSubmitting(true);

    const legalDescriptionAddon =
      answers.legalDescription === "No" || answers.legalDescription === "Not sure";

    let response: Response;

    try {
      response = await fetch("/api/intake-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerLegalName: textValues.ownerLegalName,
          ownerPriorName: answers.nameChanged === "Yes" ? "[owner_prior_name]" : null,
          ownerMailingAddress: textValues.ownerMailingAddress,
          ownerPhone: textValues.ownerPhone,
          ownerEmail: textValues.ownerEmail,
          ownerMaritalStatus: answers.maritalStatus,
          spouseLegalName: answers.maritalStatus === "Married" ? "[spouse_legal_name]" : null,
          propertyCounty: textValues.propertyCounty,
          propertyAddress: textValues.propertyAddress,
          propertyType: answers.propertyType,
          isHomestead: answers.homestead,
          legalDescriptionStatus: answers.legalDescription,
          legalDescription: legalDescriptionAddon ? null : "[legal_description_from_client]",
          recommendation,
          recommendationReason:
            recommendation === "Lady Bird Deed"
              ? "Preliminary guidance selected Lady Bird Deed based on flexibility or power-of-attorney answers."
              : "Preliminary guidance selected Transfer on Death Deed based on probate-avoidance answers.",
          legalDescriptionAddon,
          flags: [...tier1SubmissionFlags, ...tier2SubmissionFlags],
          primaryBeneficiaryName: textValues.primaryBeneficiaryName,
          primaryBeneficiaryRelationship: null,
          primaryBeneficiaryAddress: null,
          alternateBeneficiaryName: null,
        }),
      });
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(
        error instanceof Error
          ? `Submission failed before reaching the server. ${error.message}`
          : "Submission failed before reaching the server. Please check the connection and try again.",
      );
      return;
    }

    setIsSubmitting(false);

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as IntakeSubmissionError | null;
      const errorMessage = data?.error || "Submission failed. Please try again or contact EZ Law.";
      const detail = data?.detail ? ` Reason: ${data.detail}` : "";
      setSubmitError(`${errorMessage}${detail} Status: ${response.status}.`);
      return;
    }

    const data = await response.json();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "intake_submission_success",
    });
    window.location.assign(`/intake/confirmation?submissionId=${data.id}`);
  }

  return (
    <>
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
            Guided intake
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-normal sm:text-6xl">
            Transfer on Death Deed Questionnaire
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">
            One question at a time. No payment here. EZ Law reviews your answers before moving forward.
          </p>
          <div className="mt-8 grid gap-4">
            <IntakeProgress
              steps={progressSteps}
              currentStep={currentGroupIndex}
              progressPercent={progressPercent}
              statusLabel={
                activeQuestion
                  ? `Question ${currentScreen + 1} of ${quizQuestions.length}`
                  : currentScreen === reviewScreenIndex
                    ? "Review your answers"
                    : "Ready to submit"
              }
            />
            <HelpBar showStartOver />
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            {activeQuestion ? (
              <IntakeStepCard eyebrow={activeQuestion.eyebrow} title={activeQuestion.title}>
                <p className="text-base leading-7 text-white/60">{activeQuestion.helper}</p>
                {activeQuestion.type === "choice" ? (
                  <>
                    <ChoiceField
                      question={activeQuestion}
                      value={answers[activeQuestion.key]}
                      onChange={(value) => setAnswer(activeQuestion.key, value)}
                    />
                    {(reviewKeysByField[activeQuestion.key] || []).map((key) => (
                      <div key={key}>{reviewConfirmation(key)}</div>
                    ))}
                  </>
                ) : (
                  <TextField
                    question={activeQuestion}
                    value={textValues[activeQuestion.key]}
                    onChange={(value) => setTextValue(activeQuestion.key, value)}
                  />
                )}
              </IntakeStepCard>
            ) : null}

            {currentScreen === reviewScreenIndex ? (
              <IntakeStepCard eyebrow="Almost there" title="Review your answers">
                <p className="text-base leading-7 text-white/60">
                  Give this a quick look. If anything feels off, go back and change it.
                </p>
                <div className="grid gap-3 rounded-2xl border border-white/10 bg-black p-5 text-sm text-white/60 sm:grid-cols-2">
                  <div><p className="font-semibold text-white">Owner</p><p>{textValues.ownerLegalName || "Not provided"}</p></div>
                  <div><p className="font-semibold text-white">Contact</p><p>{textValues.ownerEmail || "Not provided"} · {textValues.ownerPhone || "Not provided"}</p></div>
                  <div><p className="font-semibold text-white">Property</p><p>{textValues.propertyAddress || "Not provided"}, {textValues.propertyCounty || "Not provided"}</p></div>
                  <div><p className="font-semibold text-white">Goal</p><p>{answers.mainReason || "Not provided"}</p></div>
                  <div><p className="font-semibold text-white">Beneficiary</p><p>{textValues.primaryBeneficiaryName || "Not provided"}</p></div>
                  <div><p className="font-semibold text-white">Preliminary path</p><p>{recommendation}</p></div>
                </div>
                <InternalMatterTags tags={tier2Tags} />
                <PreliminaryRecommendationCard recommendation={recommendation} hasReviewTags={tier2Tags.length > 0} />
              </IntakeStepCard>
            ) : null}

            {currentScreen === submitScreenIndex ? (
              <IntakeStepCard eyebrow="Final step" title="Send it to EZ Law">
                <p className="text-base leading-7 text-white/60">
                  After you submit, EZ Law reviews your information before accepting the matter,
                  confirming the deed path, or requesting payment.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-white px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:bg-white/50 sm:w-auto"
                >
                  {isSubmitting ? "Submitting..." : "Submit Intake"}
                </button>
              </IntakeStepCard>
            ) : null}

            {submitError ? (
              <p className="rounded-2xl border border-red-300/30 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
                {submitError}
              </p>
            ) : null}

            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <button
                type="button"
                onClick={goToPreviousScreen}
                disabled={currentScreen === 0 || isSubmitting}
                className="rounded-2xl border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              {currentScreen < submitScreenIndex ? (
                <button
                  type="button"
                  onClick={goToNextScreen}
                  className="rounded-2xl bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-white/85"
                >
                  {currentScreen === reviewScreenIndex ? "Looks good" : "Continue"}
                </button>
              ) : (
                <a href="/start" className="rounded-2xl border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
                  Back to Start
                </a>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
