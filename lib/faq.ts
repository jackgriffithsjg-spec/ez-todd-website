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
        question: "What is a Texas Transfer on Death Deed?",
        answer:
          "A Texas Transfer on Death Deed lets an owner name a beneficiary to receive real property after the owner dies. The owner keeps control during life, and the deed must be signed, notarized, and recorded before death.",
      },
      {
        question: "Can a Transfer on Death Deed help avoid probate?",
        answer:
          "It may help the named property pass outside probate, but it is not a complete estate plan and may not fit every situation. EZ TODD has a licensed Texas attorney review your answers before drafting.",
      },
      {
        question: "Can I change my mind later?",
        answer:
          "In many situations, yes. A Transfer on Death Deed can usually be revoked or replaced if the owner is living and legally able to sign. The right approach depends on the facts.",
      },
    ],
  },
  {
    title: "Lady Bird Deeds",
    items: [
      {
        question: "What is a Lady Bird Deed?",
        answer:
          "A Lady Bird Deed is an option that can transfer Texas property at death while reserving broad rights for the current owner during life. It may be useful in situations where a standard Transfer on Death Deed is not the best fit.",
      },
      {
        question: "Which deed do I need?",
        answer:
          "If you are not sure, start with the questionnaire. EZ TODD uses your answers to flag whether a Transfer on Death Deed, Lady Bird Deed, or attorney review is the better path.",
      },
    ],
  },
  {
    title: "Pricing and Process",
    items: [
      {
        question: "How much does EZ TODD cost?",
        answer:
          "The flat fee is $500 for a Transfer on Death Deed and $600 for a Lady Bird Deed. Government recording fees are included. A $20 legal description retrieval add-on may apply if needed, and notary fees are separate.",
      },
      {
        question: "What happens after I submit the intake?",
        answer:
          "A licensed Texas attorney reviews your information, confirms the details with you, prepares the deed, and gives signing and notarization instructions.",
      },
      {
        question: "Does submitting the form create an attorney-client relationship?",
        answer:
          "No. Submitting the intake, calling, texting, or using the website does not create an attorney-client relationship. Representation begins only when EZ Law accepts your matter and you sign the engagement agreement.",
      },
    ],
  },
  {
    title: "Eligibility",
    items: [
      {
        question: "Is EZ TODD only for Texas property?",
        answer:
          "Yes. EZ TODD is for Texas real property only.",
      },
      {
        question: "Should I enter sensitive information?",
        answer:
          "No. Do not enter Social Security numbers, dates of birth, bank or financial account numbers, or upload identification documents through the intake.",
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
