export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = {
  title: string;
  items: FaqItem[];
};

export const faqSections: FaqSection[] = [
  {
    title: "Transfer on Death Deeds",
    items: [
      {
        question: "What is a Transfer on Death Deed?",
        answer:
          "A Transfer on Death Deed, or TODD, is a written and recorded deed that lets a Texas real property owner name one or more beneficiaries to receive the property at death without probate. It is signed and recorded during life, but it does not change ownership until death.",
      },
      {
        question: "What kind of property can a TODD transfer?",
        answer:
          "A TODD can transfer Texas real property, such as a house, condominium, vacant land, mineral interest, or fractional real estate interest. It does not transfer cars, bank accounts, brokerage accounts, household goods, or real estate in another state.",
      },
      {
        question: "Who can be named as a beneficiary?",
        answer:
          "A beneficiary can be one or more individuals, a trust, a charity, a business entity, or another person or organization that can legally hold title to Texas real estate. The beneficiary does not have to be a relative.",
      },
      {
        question: "Does the TODD have to be recorded before the owner dies?",
        answer:
          "Yes. A TODD must be recorded in the county deed records before the owner's death. A signed and notarized TODD that is left unrecorded transfers nothing.",
      },
      {
        question: "Does a TODD avoid probate for that piece of real estate?",
        answer:
          "Yes, that is its main purpose. The property passes by operation of the recorded TODD at death, so that specific real estate does not need probate to transfer title. Other assets may still require probate.",
      },
    ],
  },
  {
    title: "Lady Bird Deeds",
    items: [
      {
        question: "What is a Lady Bird deed?",
        answer:
          "A Lady Bird deed, formally an enhanced life estate deed, lets you name beneficiaries to receive real estate at your death while you keep control during life. You can still sell, mortgage, lease, give away, or revoke the deed without beneficiary permission.",
      },
      {
        question: "How is a Lady Bird deed different from a regular life estate deed?",
        answer:
          "A regular life estate gives beneficiaries a present future interest, which can limit your ability to sell or change the property without them. A Lady Bird deed keeps you in control because you retain enhanced powers to sell, mortgage, give away, or revoke.",
      },
      {
        question: "What rights do I keep during my lifetime?",
        answer:
          "You keep essentially every right you had before signing. You can live in the property, rent it, keep income, sell it, refinance it, gift it, revoke the deed, and remain responsible for taxes, insurance, and upkeep.",
      },
      {
        question: "Does the property go through probate?",
        answer:
          "If you still own the property at death, title passes automatically to the named remainder beneficiaries without probate. Beneficiaries usually record a certified death certificate and sometimes an affidavit to clear title.",
      },
    ],
  },
  {
    title: "Choosing the Right Deed",
    items: [
      {
        question: "Which one is better for me, a Lady Bird deed or a Transfer on Death Deed?",
        answer:
          "It depends on your property, family situation, title needs, capacity concerns, and planning goals. A TODD is often a straightforward probate-avoidance tool; a Lady Bird deed may be useful when extra flexibility, warranty language, or power-of-attorney signing issues matter.",
      },
      {
        question: "Which gives me better Medicaid Estate Recovery protection in Texas?",
        answer:
          "Both can keep the property outside the probate estate, which is important because Texas Medicaid Estate Recovery is generally limited to probate assets. Lady Bird deeds have the longer Medicaid-planning history, but TODDs are also probate-avoidance tools.",
      },
      {
        question: "Are there any disadvantages to using a TODD?",
        answer:
          "Yes. A TODD cannot be created or revoked through a power of attorney, passes without warranty, may leave a creditor exposure period after death, and cannot be overridden by a will. Careful beneficiary and contingency drafting matters.",
      },
      {
        question: "Are there any disadvantages to using a Lady Bird deed?",
        answer:
          "Yes. There is no Texas statute defining Lady Bird deeds, so drafting language and title-company acceptance matter. They can also be awkward with multiple beneficiaries or if no backup beneficiary is named.",
      },
    ],
  },
  {
    title: "Pricing and Process",
    items: [
      {
        question: "How much does a TODD or Lady Bird deed cost and what is included in the fee?",
        answer:
          "A Transfer on Death Deed costs $500, and a Lady Bird deed costs $600. The flat fee includes attorney preparation and review, a confirmation call, one review opportunity before signing, signing and notarization instructions, county recording, and return of the recorded deed.",
      },
      {
        question: "What information do I need to provide, and how fast will my deed be ready?",
        answer:
          "You will need the property address, legal description, owner names and mailing addresses, beneficiary names and mailing addresses, and payment. A simple deed is drafted within 24 hours after the confirmation call and payment, excluding weekends and holidays.",
      },
      {
        question: "Do I have to come into an office, or can I do everything online?",
        answer:
          "The process is designed to be handled online or by phone. You answer questions, confirm details with the attorney, receive signing instructions, notarize the deed, return it, and EZ Law records it.",
      },
      {
        question: "How do I get my deed notarized, and is the notary fee included?",
        answer:
          "You may use any lawful notary. The notary fee is paid directly to the notary and is not included in the flat fee. EZ Law provides signing and notarization instructions.",
      },
      {
        question: "What if I do not know or cannot find my legal description?",
        answer:
          "The legal description is usually found in your prior deed or county property records. If you do not have it, legal description retrieval is available for a flat $20 add-on.",
      },
    ],
  },
  {
    title: "After the Owner Dies",
    items: [
      {
        question: "When does the transfer actually happen?",
        answer:
          "For a TODD, transfer happens at the owner's death. For a Lady Bird deed, the remainder beneficiaries take if the owner dies still owning the property. During life, the owner keeps control.",
      },
      {
        question: "Does the beneficiary need to know about the TODD, consent to it, or sign anything?",
        answer:
          "No. The beneficiary does not need notice, consent, or a signature for the TODD to be valid. The beneficiary's role comes after death, when they may accept the property by recording the appropriate death documentation, or disclaim the gift if they do not want it.",
      },
      {
        question: "Is my information secure, and is the recorded deed private?",
        answer:
          "No. A recorded deed becomes part of the public real property records. Anyone searching county records may be able to see the recorded deed.",
      },
    ],
  },
  {
    title: "Common Mistakes",
    items: [
      {
        question: "What are the most common drafting mistakes that invalidate or undermine these deeds?",
        answer:
          "Common mistakes include failing to record before death, using the wrong legal description, signing a TODD by power of attorney, missing notarization, omitting required transfer-at-death language, naming no backup beneficiary, and using weak Lady Bird deed language.",
      },
      {
        question: "What if I sign a TODD but it is not recorded before I die?",
        answer:
          "The TODD is invalid. Texas law requires the deed to be recorded before death in the county deed records. Recording it after death cannot fix the problem.",
      },
      {
        question: "Can my will override a TODD or a Lady Bird deed?",
        answer:
          "A will does not revoke or override a recorded TODD. A will also generally does not control property that passes outside probate by a valid Lady Bird deed. Changes should be made by the correct deed or revocation document during life.",
      },
      {
        question: "If I lose capacity, can my agent under a power of attorney sign or revoke a TODD or Lady Bird deed for me?",
        answer:
          "Texas law does not allow a TODD to be created or revoked by an agent under power of attorney. A Lady Bird deed may be signed by an agent if the power of attorney gives proper real-property authority and meets Texas requirements.",
      },
    ],
  },
];

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSections.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };
}
