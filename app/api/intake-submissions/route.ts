import { NextResponse } from "next/server";
import { createClioInboxLead } from "@/lib/clio";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type IntakeFlag = {
  tier: "Tier 1" | "Tier 2";
  label: string;
  description?: string;
};

function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function booleanFromYesNo(value: unknown) {
  return value === "Yes";
}

function getPrice(deedType: string, legalDescriptionAddon: boolean) {
  const base = deedType === "Lady Bird Deed" ? 600 : deedType === "Attorney Review Needed" ? 0 : 500;
  return {
    base,
    total: base + (legalDescriptionAddon ? 20 : 0),
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const flags = Array.isArray(body.flags) ? (body.flags as IntakeFlag[]) : [];
    const legalDescriptionAddon = body.legalDescriptionAddon === true;
    const deedType = stringValue(body.recommendation, "Transfer on Death Deed");
    const price = getPrice(deedType, legalDescriptionAddon);
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

    const relatedInserts = [
      supabase.from("submission_beneficiaries").insert({
        submission_id: submissionId,
        beneficiary_type: "Primary",
        full_name: beneficiaryName,
        relationship: body.primaryBeneficiaryRelationship || null,
        mailing_address: body.primaryBeneficiaryAddress || null,
        share_percentage: body.primaryBeneficiaryShare || null,
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

    try {
      await createClioInboxLead({
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
      console.error("Clio Grow sync failed", clioError);
    }

    return NextResponse.json({ id: submissionId });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Submission failed. Please try again or contact EZ Law.",
      },
      { status: 500 },
    );
  }
}
