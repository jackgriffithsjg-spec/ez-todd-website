export type DeedType = "Transfer on Death Deed" | "Lady Bird Deed" | "Attorney Review Needed";

export type MatterStatus =
  | "New Submission"
  | "Needs Attorney Review"
  | "Awaiting Client Info"
  | "Ready for Confirmation Call"
  | "Agreement Sent"
  | "Paid"
  | "Drafting"
  | "Sent for Client Review"
  | "Awaiting Signed/Notarized Deed"
  | "Submitted for Recording"
  | "Recorded / Complete"
  | "Declined / Refunded";

export type PaymentStatus = "Not Started" | "Payment Pending" | "Paid" | "Refunded";

export type ReviewFlag = {
  tier: 1 | 2;
  label:
    | "Tier 1: Medicaid / long-term care planning"
    | "Tier 1: Ownership not confirmed"
    | "Tier 1: Non-Texas property"
    | "Tier 1: Divorce decree or court order issue"
    | "Tier 1: Homestead spouse signature issue"
    | "Tier 1: Power of attorney signing issue"
    | "Tier 2: Legal description retrieval"
    | "Tier 2: Rural/agricultural property"
    | "Tier 2: Commercial property"
    | "Tier 2: Mineral interest"
    | "Tier 2: Name change review"
    | "Tier 2: Power of attorney concern";
};

export type Beneficiary = {
  name: string;
  relationship: string;
  mailingAddress: string;
  sharePercentage?: string;
  alternate?: string;
};

export type Submission = {
  id: string;
  client: {
    fullLegalName: string;
    priorName?: string;
    mailingAddress: string;
    phone: string;
    email: string;
    maritalStatus: string;
    spouseName?: string;
  };
  property: {
    county: string;
    streetAddress: string;
    propertyType: string;
    homesteadStatus: string;
    legalDescriptionStatus: string;
    legalDescriptionText: string;
    currentDeedUpload: string;
  };
  recommendedDeed: DeedType;
  recommendationReasoning: string;
  flags: ReviewFlag[];
  beneficiaries: Beneficiary[];
  status: MatterStatus;
  paymentStatus: PaymentStatus;
  engagementAgreementStatus: string;
  priceEstimate: string;
  submittedDate: string;
  internalNote: string;
};

export const matterStatuses: MatterStatus[] = [
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

export const mockSubmissions: Submission[] = [
  {
    id: "sub-1001",
    client: {
      fullLegalName: "Maria Elena Torres",
      mailingAddress: "4217 86th Street, Lubbock, TX 79423",
      phone: "(806) 555-0148",
      email: "maria.torres@example.com",
      maritalStatus: "Widowed",
    },
    property: {
      county: "Lubbock",
      streetAddress: "4217 86th Street, Lubbock, TX 79423",
      propertyType: "Single-family home",
      homesteadStatus: "Yes",
      legalDescriptionStatus: "Provided",
      legalDescriptionText: "[legal_description_from_current_deed]",
      currentDeedUpload: "current-deed-torres.pdf",
    },
    recommendedDeed: "Transfer on Death Deed",
    recommendationReasoning:
      "Client wants to avoid probate, owns Texas property, will sign personally, and no power-of-attorney or Medicaid planning issue was selected.",
    flags: [],
    beneficiaries: [
      {
        name: "Sofia Torres",
        relationship: "Daughter",
        mailingAddress: "1902 Avenue Q, Lubbock, TX 79401",
        sharePercentage: "100%",
        alternate: "Daniel Torres",
      },
    ],
    status: "New Submission",
    paymentStatus: "Not Started",
    engagementAgreementStatus: "Not sent",
    priceEstimate: "$500",
    submittedDate: "2026-06-22",
    internalNote: "Clean TODD path based on intake answers.",
  },
  {
    id: "sub-1002",
    client: {
      fullLegalName: "Robert James McKenzie",
      priorName: "Robert J. King",
      mailingAddress: "310 Cherry Lane, Amarillo, TX 79109",
      phone: "(806) 555-0199",
      email: "rjmckenzie@example.com",
      maritalStatus: "Married",
      spouseName: "Linda McKenzie",
    },
    property: {
      county: "Potter",
      streetAddress: "310 Cherry Lane, Amarillo, TX 79109",
      propertyType: "Single-family home",
      homesteadStatus: "Yes",
      legalDescriptionStatus: "Provided",
      legalDescriptionText: "[lot_block_subdivision_description]",
      currentDeedUpload: "mckenzie-deed.pdf",
    },
    recommendedDeed: "Lady Bird Deed",
    recommendationReasoning:
      "Client asked for more flexibility and warranty language, and may want the spouse involved in signing.",
    flags: [{ tier: 2, label: "Tier 2: Name change review" }],
    beneficiaries: [
      {
        name: "Amanda White",
        relationship: "Daughter",
        mailingAddress: "8406 Memphis Avenue, Lubbock, TX 79423",
        sharePercentage: "50%",
      },
      {
        name: "Jacob McKenzie",
        relationship: "Son",
        mailingAddress: "2201 S Coulter Street, Amarillo, TX 79106",
        sharePercentage: "50%",
      },
    ],
    status: "Ready for Confirmation Call",
    paymentStatus: "Payment Pending",
    engagementAgreementStatus: "Sent",
    priceEstimate: "$600",
    submittedDate: "2026-06-21",
    internalNote: "Confirm name variation and spouse signing plan on call.",
  },
  {
    id: "sub-1003",
    client: {
      fullLegalName: "Elaine Porter",
      mailingAddress: "7701 Quaker Avenue, Lubbock, TX 79424",
      phone: "(806) 555-0126",
      email: "elaine.porter@example.com",
      maritalStatus: "Single",
    },
    property: {
      county: "Hale",
      streetAddress: "118 County Road 212, Plainview, TX 79072",
      propertyType: "Vacant land",
      homesteadStatus: "No",
      legalDescriptionStatus: "Needs retrieval",
      legalDescriptionText: "[legal_description_retrieval_needed]",
      currentDeedUpload: "No upload provided",
    },
    recommendedDeed: "Transfer on Death Deed",
    recommendationReasoning:
      "Client wants a straightforward probate-avoidance deed and will sign personally, but the legal description must be retrieved before drafting.",
    flags: [{ tier: 2, label: "Tier 2: Legal description retrieval" }],
    beneficiaries: [
      {
        name: "North Texas Animal Rescue",
        relationship: "Charity",
        mailingAddress: "PO Box 1200, Plainview, TX 79073",
        sharePercentage: "100%",
      },
    ],
    status: "Awaiting Client Info",
    paymentStatus: "Not Started",
    engagementAgreementStatus: "Not sent",
    priceEstimate: "$520",
    submittedDate: "2026-06-20",
    internalNote: "Add $20 legal-description retrieval if matter proceeds.",
  },
  {
    id: "sub-1004",
    client: {
      fullLegalName: "Thomas Ray Whitaker",
      mailingAddress: "502 Oak Street, Midland, TX 79701",
      phone: "(432) 555-0177",
      email: "thomas.whitaker@example.com",
      maritalStatus: "Married",
      spouseName: "Carol Whitaker",
    },
    property: {
      county: "Midland",
      streetAddress: "502 Oak Street, Midland, TX 79701",
      propertyType: "Single-family home",
      homesteadStatus: "Yes",
      legalDescriptionStatus: "Provided",
      legalDescriptionText: "[metes_and_bounds_or_lot_block_description]",
      currentDeedUpload: "whitaker-current-deed.pdf",
    },
    recommendedDeed: "Attorney Review Needed",
    recommendationReasoning:
      "Client selected Medicaid or long-term care planning as a main reason, so the flat-fee deed path needs attorney review before checkout.",
    flags: [{ tier: 1, label: "Tier 1: Medicaid / long-term care planning" }],
    beneficiaries: [
      {
        name: "Carol Whitaker",
        relationship: "Spouse",
        mailingAddress: "502 Oak Street, Midland, TX 79701",
        sharePercentage: "100%",
        alternate: "Rebecca Whitaker",
      },
    ],
    status: "Needs Attorney Review",
    paymentStatus: "Not Started",
    engagementAgreementStatus: "Blocked pending review",
    priceEstimate: "Review required",
    submittedDate: "2026-06-19",
    internalNote: "Do not send to payment until attorney reviews Medicaid planning concern.",
  },
  {
    id: "sub-1005",
    client: {
      fullLegalName: "Grace Ann Bell",
      mailingAddress: "PO Box 88, Tulia, TX 79088",
      phone: "(806) 555-0113",
      email: "grace.bell@example.com",
      maritalStatus: "Widowed",
    },
    property: {
      county: "Swisher",
      streetAddress: "FM 146 and County Road 12, Tulia, TX 79088",
      propertyType: "Rural or agricultural land",
      homesteadStatus: "No",
      legalDescriptionStatus: "Provided",
      legalDescriptionText: "[rural_metes_and_bounds_description]",
      currentDeedUpload: "bell-ranch-deed.pdf",
    },
    recommendedDeed: "Transfer on Death Deed",
    recommendationReasoning:
      "Client wants probate avoidance and will sign personally, but rural land drafting should be checked carefully.",
    flags: [{ tier: 2, label: "Tier 2: Rural/agricultural property" }],
    beneficiaries: [
      {
        name: "Caleb Bell",
        relationship: "Son",
        mailingAddress: "1401 Broadway, Plainview, TX 79072",
        sharePercentage: "100%",
        alternate: "Hannah Bell",
      },
    ],
    status: "Drafting",
    paymentStatus: "Paid",
    engagementAgreementStatus: "Signed and accepted",
    priceEstimate: "$500",
    submittedDate: "2026-06-18",
    internalNote: "Check rural legal description and acreage references before draft.",
  },
];

export function getSubmissionById(id: string) {
  return mockSubmissions.find((submission) => submission.id === id);
}
