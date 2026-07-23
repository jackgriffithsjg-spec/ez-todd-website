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
  label: string;
  description?: string;
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
