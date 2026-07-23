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
    title: "Patents and Inventions",
    items: [
      {
        question: "Who is Patent Ed?",
        answer:
          "Patent Ed is Edmund Zafrani, the attorney behind EZ Law. He is licensed by the State Bar of Texas and registered to practice before the United States Patent and Trademark Office.",
      },
      {
        question: "Can EZ Law help with a provisional patent application?",
        answer:
          "Yes. EZ Law assists with provisional patent applications, non-provisional patent applications, patentability discussions, and USPTO Office Action responses.",
      },
      {
        question: "Do I need to keep my invention confidential before filing?",
        answer:
          "You should be careful before publicly disclosing an invention. Public disclosures can affect patent rights and filing deadlines. Speak with a patent attorney before sharing details widely.",
      },
    ],
  },
  {
    title: "Brands and Creative Work",
    items: [
      {
        question: "Can EZ Law help register a trademark?",
        answer:
          "Yes. EZ Law helps with trademark searches, USPTO applications, Office Action responses, trademark maintenance, and brand protection strategy.",
      },
      {
        question: "Does copyright protection happen automatically?",
        answer:
          "Copyright protection generally begins when an original work is fixed in a tangible form, but registration can strengthen enforcement options and may be required before filing a lawsuit.",
      },
    ],
  },
  {
    title: "Business and Property",
    items: [
      {
        question: "Does EZ Law help form Texas LLCs?",
        answer:
          "Yes. EZ Law assists with Texas business formation, operating agreements, contracts, compliance questions, and outside general counsel support.",
      },
      {
        question: "Can EZ Law review real estate contracts?",
        answer:
          "Yes. EZ Law handles selected real estate document review, lease review, purchase agreement review, title concern evaluation, and dispute-prevention work.",
      },
      {
        question: "Does EZ Law still offer Transfer on Death Deeds and Lady Bird deeds?",
        answer:
          "Yes. Texas deed work is available, and EZ Law has a separate EZ TODD service for Transfer on Death Deeds and Lady Bird deeds.",
      },
    ],
  },
  {
    title: "Working With EZ Law",
    items: [
      {
        question: "Where is EZ Law located?",
        answer:
          "EZ Law is based in Lubbock, Texas, and serves clients in West Texas and across Texas when the matter can be handled remotely.",
      },
      {
        question: "Can I call or text EZ Law?",
        answer:
          "Yes. You can call or text (806) 777-6249. Do not send confidential facts until EZ Law confirms representation.",
      },
      {
        question: "Does contacting EZ Law create an attorney-client relationship?",
        answer:
          "No. Contacting the firm, reading the website, or sending a message does not create an attorney-client relationship. Representation begins only after EZ Law accepts the matter and an engagement agreement is signed.",
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
