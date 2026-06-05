import { MergeField } from "@/components/MergeField";

const agreementSections = [
  {
    title: "1. The parties and what this agreement covers",
    body: (
      <>
        This Limited Scope Engagement Agreement is entered into on{" "}
        <MergeField>[order_date]</MergeField> between <MergeField>[owner_legal_name]</MergeField>{" "}
        and Zafrani Law PLLC, doing business as EZ Law. By signing, the Client retains
        the Firm for the single, limited purpose described in Section 2, and for no
        other matter.
      </>
    ),
  },
  {
    title: "2. The limited scope of services",
    body: (
      <>
        The deed is a <MergeField>[deed_type_selected]</MergeField> for the property
        located at <MergeField>[property_address]</MergeField>, in{" "}
        <MergeField>[property_county]</MergeField> County, Texas. Services include deed
        preparation, attorney review and confirmation, one review opportunity, signing
        and notarization instructions, recording, and return of the recorded deed.
      </>
    ),
  },
  {
    title: "3. What this engagement does not include",
    body:
      "This limited scope engagement does not include wills, trusts, powers of attorney, tax advice, Medicaid or long-term care planning, title examination or curative work, probate, disputes, litigation, notarization fees, or ongoing representation.",
  },
  {
    title: "4. Client responsibilities and reliance on provided information",
    body:
      "The Client agrees to provide accurate and complete information. EZ Law prepares the deed based on the information provided and does not independently verify ownership, title, the legal description, or the accuracy of the Client's information.",
  },
  {
    title: "5. Fees, costs, and payment handling",
    body: (
      <>
        The flat fee for the deed described is <MergeField>[fee_amount]</MergeField>.
        If legal-description retrieval is authorized, an additional flat $20 applies.
        County recording fees are included. The notary fee is paid directly to the notary.
      </>
    ),
  },
  {
    title: "6. Review, conflicts check, and right to decline",
    body:
      "After signature and payment, EZ Law checks for conflicts and reviews the information before beginning drafting. Signature and payment do not, by themselves, obligate EZ Law to accept the matter.",
  },
  {
    title: "7. No guarantee of outcome and 24-hour service commitment",
    body:
      "EZ Law does not guarantee any particular legal, tax, or other outcome. The 24-hour commitment is about how quickly the Firm works, excluding weekends and holidays, and county recording timing is outside the Firm's control.",
  },
  {
    title: "8. Client acknowledgment",
    body:
      "By signing, the Client acknowledges reading and understanding the Agreement, retaining the Firm only for the limited scope described, and agreeing to its terms.",
  },
];

export function AgreementPreview() {
  return (
    <div className="grid gap-4">
      {agreementSections.map((section) => (
        <section key={section.title} className="rounded-md border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-semibold tracking-normal text-white">{section.title}</h2>
          <p className="mt-3 text-sm leading-7 text-white/60">{section.body}</p>
        </section>
      ))}
    </div>
  );
}
