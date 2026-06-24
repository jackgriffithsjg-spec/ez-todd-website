import type { SupabaseClient } from "@supabase/supabase-js";
import type { DeedType, MatterStatus, PaymentStatus, Submission } from "@/lib/submissionTypes";

type SubmissionRow = {
  id: string;
  owner_legal_name: string;
  owner_prior_name: string | null;
  owner_mailing_address: string;
  owner_phone: string;
  owner_email: string;
  owner_marital_status: string;
  spouse_legal_name: string | null;
  property_county: string;
  property_address: string;
  property_type: string;
  is_homestead: boolean;
  legal_description_status: string;
  legal_description: string | null;
  deed_type_preliminary: string;
  deed_type_selected: string | null;
  recommendation_reason: string | null;
  price_base: number;
  legal_description_addon: boolean;
  price_total: number;
  status: string;
  payment_status: string;
  agreement_status: string;
  created_at: string;
  submission_beneficiaries?: BeneficiaryRow[];
  submission_flags?: FlagRow[];
  submission_notes?: NoteRow[];
};

type BeneficiaryRow = {
  beneficiary_type: string;
  full_name: string;
  relationship: string | null;
  mailing_address: string | null;
  share_percentage: number | null;
  is_alternate: boolean;
};

type FlagRow = {
  tier: string;
  label: string;
  description: string | null;
};

type NoteRow = {
  note: string;
  created_at: string;
};

const submissionSelect = `
  *,
  submission_beneficiaries(*),
  submission_flags(*),
  submission_notes(note, created_at)
`;

function toDeedType(value: string): DeedType {
  if (value === "Lady Bird Deed") return "Lady Bird Deed";
  if (value === "Attorney Review Needed") return "Attorney Review Needed";
  return "Transfer on Death Deed";
}

function toMatterStatus(value: string): MatterStatus {
  const allowed: MatterStatus[] = [
    "New Submission",
    "Needs Attorney Review",
    "Awaiting Client Info",
    "Ready for Confirmation Call",
    "Agreement Sent",
    "Paid",
    "Drafting",
    "Sent for Client Review",
    "Awaiting Signed/Notarized Deed",
    "Submitted for Recording",
    "Recorded / Complete",
    "Declined / Refunded",
  ];
  return allowed.includes(value as MatterStatus) ? (value as MatterStatus) : "New Submission";
}

function toPaymentStatus(value: string): PaymentStatus {
  if (value === "Payment Pending" || value === "Paid" || value === "Refunded") return value;
  return "Not Started";
}

export function mapSubmissionRow(row: SubmissionRow): Submission {
  const notes = [...(row.submission_notes ?? [])].sort((a, b) => b.created_at.localeCompare(a.created_at));
  const selectedDeed = row.deed_type_selected || row.deed_type_preliminary;

  return {
    id: row.id,
    client: {
      fullLegalName: row.owner_legal_name,
      priorName: row.owner_prior_name ?? undefined,
      mailingAddress: row.owner_mailing_address,
      phone: row.owner_phone,
      email: row.owner_email,
      maritalStatus: row.owner_marital_status,
      spouseName: row.spouse_legal_name ?? undefined,
    },
    property: {
      county: row.property_county,
      streetAddress: row.property_address,
      propertyType: row.property_type,
      homesteadStatus: row.is_homestead ? "Yes" : "No",
      legalDescriptionStatus: row.legal_description_status,
      legalDescriptionText: row.legal_description || "[legal_description_placeholder]",
      currentDeedUpload: "File storage not connected yet",
    },
    recommendedDeed: toDeedType(selectedDeed),
    recommendationReasoning: row.recommendation_reason || "Recommendation reason was not provided.",
    flags: (row.submission_flags ?? []).map((flag) => ({
      tier: flag.tier === "Tier 1" ? 1 : 2,
      label: flag.label,
      description: flag.description ?? undefined,
    })),
    beneficiaries: (row.submission_beneficiaries ?? []).map((beneficiary) => ({
      name: beneficiary.full_name,
      relationship: beneficiary.relationship || "Not provided",
      mailingAddress: beneficiary.mailing_address || "Not provided",
      sharePercentage:
        beneficiary.share_percentage === null ? undefined : `${beneficiary.share_percentage}%`,
      alternate: beneficiary.is_alternate ? "Alternate beneficiary" : undefined,
    })),
    status: toMatterStatus(row.status),
    paymentStatus: toPaymentStatus(row.payment_status),
    engagementAgreementStatus: row.agreement_status,
    priceEstimate: row.price_total > 0 ? `$${row.price_total}` : "Review required",
    submittedDate: row.created_at.slice(0, 10),
    internalNote: notes[0]?.note || "",
  };
}

export async function fetchSubmissions(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("submissions")
    .select(submissionSelect)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as SubmissionRow[]).map(mapSubmissionRow);
}

export async function fetchSubmissionById(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase.from("submissions").select(submissionSelect).eq("id", id).single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return mapSubmissionRow(data as SubmissionRow);
}
