import { NextResponse } from "next/server";
import { syncClioIntakeSubmission } from "@/lib/clio";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type IntakeFlag = {
  tier: "Tier 1" | "Tier 2";
  label: string;
  description?: string;
};

type SubmissionStage =
  | "reading the intake form"
  | "connecting to Supabase"
  | "saving the main intake record"
  | "saving beneficiary or flag details"
  | "finalizing the submission";

type ErrorWithSupabaseFields = Error & {
  code?: string;
  details?: string;
  hint?: string;
};

function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function booleanFromYesNo(value: unknown) {
  return value === "Yes";
}

function nullableNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;

  const normalized = value.replace("%", "").trim();
  if (!normalized) return null;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function getPrice(deedType: string, legalDescriptionAddon: boolean) {
  const base = deedType === "Lady Bird Deed" ? 600 : deedType === "Attorney Review Needed" ? 0 : 500;
  return {
    base,
    total: base + (legalDescriptionAddon ? 20 : 0),
  };
}

function errorDetail(error: unknown) {
  if (error instanceof Error) {
    const supabaseError = error as ErrorWithSupabaseFields;
    const parts = [
      supabaseError.message,
      supabaseError.code ? `Code: ${supabaseError.code}` : "",
      supabaseError.details ? `Details: ${supabaseError.details}` : "",
      supabaseError.hint ? `Hint: ${supabaseError.hint}` : "",
    ].filter(Boolean);

    return parts.join(" ");
  }

  if (typeof error === "string") return error;
  return "No additional error detail was provided.";
}

export async function POST(request: Request) {
  let stage: SubmissionStage = "reading the intake form";

  try {
    const body = await request.json();
    const flags = Array.isArray(body.flags) ? (body.flags as IntakeFlag[]) : [];
    const legalDescriptionAddon = body.legalDescriptionAddon === true;
    const deedType = stringValue(body.recommendation, "Transfer on Death Deed");
    const price = getPrice(deedType, legalDescriptionAddon);

    stage = "connecting to Supabase";
    const supabase = await createServerSupabaseClient();
    const submissionId = crypto.randomUUID();
    const ownerLegalName = stringValue(body.ownerLegalName, "[owner_legal_name]");
    const ownerPhone = stringValue(body.ownerPhone, "[owner_phone]");
    const ownerEmail = stringValue(body.ownerEmail, "[owner_email]");
    const propertyCounty = stringValue(body.propertyCounty, "[property_county]");
    const propertyAddress = stringValue(body.propertyAddress, "[property_address]");
    const status = flags.some((flag) => flag.tier === "Tier 1")
      ? "Needs Attorney Review"
      : "New Submission";

    stage = "saving the main intake record";
    const { error: submissionError } = await supabase
      .from("submissions")
      .insert({
        id: submissionId,
        owner_legal_name: ownerLegalName,
        owner_prior_name: body.ownerPriorName || null,
        owner_mailing_address: stringValue(body.ownerMailingAddress, "[owner_mailing_address]"),
        owner_phone: ownerPhone,
        owner_email: ownerEmail,
        owner_marital_status: stringValue(body.ownerMaritalStatus, "Not provided"),
        spouse_legal_name: body.spouseLegalName || null,
        property_county: propertyCounty,
        property_address: propertyAddress,
        property_type: stringValue(body.propertyType, "Not provided"),
        is_homestead: booleanFromYesNo(body.isHomestead),
        legal_description_status: stringValue(body.legalDescriptionStatus, "Not provided"),
        legal_description: body.legalDescription || null,
        deed_type_preliminary: deedType,
        deed_type_selected: deedType === "Attorney Review Needed" ? null : deedType,
        recommendation_reason: body.recommendationReason || null,
        price_base: price.base,
        legal_description_addon: legalDescriptionAddon,
        price_total: price.total,
        status,
      });

    if (submissionError) throw submissionError;
    const beneficiaryName = stringValue(body.primaryBeneficiaryName, "[primary_beneficiary]");
    const primaryBeneficiaryShare = nullableNumber(body.primaryBeneficiaryShare);

    stage = "saving beneficiary or flag details";
    const relatedInserts = [
      supabase.from("submission_beneficiaries").insert({
        submission_id: submissionId,
        beneficiary_type: "Primary",
        full_name: beneficiaryName,
        relationship: body.primaryBeneficiaryRelationship || null,
        mailing_address: body.primaryBeneficiaryAddress || null,
        share_percentage: primaryBeneficiaryShare,
        is_alternate: false,
      }),
    ];

    if (body.alternateBeneficiaryName) {
      relatedInserts.push(
        supabase.from("submission_beneficiaries").insert({
          submission_id: submissionId,
          beneficiary_type: "Alternate",
          full_name: body.alternateBeneficiaryName,
          relationship: null,
          mailing_address: null,
          share_percentage: null,
          is_alternate: true,
        }),
      );
    }

    if (flags.length > 0) {
      relatedInserts.push(
        supabase.from("submission_flags").insert(
          flags.map((flag) => ({
            submission_id: submissionId,
            tier: flag.tier,
            label: flag.label,
            description: flag.description || null,
          })),
        ),
      );
    }

    const results = await Promise.all(relatedInserts);
    const relatedError = results.find((result) => result.error)?.error;
    if (relatedError) throw relatedError;

    stage = "finalizing the submission";
    try {
      await syncClioIntakeSubmission({
        submissionId,
        clientName: ownerLegalName,
        clientPhone: ownerPhone,
        clientEmail: ownerEmail,
        propertyCounty,
        propertyAddress,
        recommendation: deedType,
        status,
        flags,
      });
    } catch (clioError) {
      console.error("Clio sync failed", clioError);
    }

    return NextResponse.json({ id: submissionId });
  } catch (error) {
    console.error("Intake submission failed", error);

    return NextResponse.json(
      {
        error: `Submission failed while ${stage}.`,
        detail: errorDetail(error),
      },
      { status: 500 },
    );
  }
}
