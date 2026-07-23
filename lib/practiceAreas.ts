export type PracticeArea = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  intro: string[];
  helpsWith: string[];
  questions: { question: string; answer: string }[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "patent",
    title: "Patent",
    eyebrow: "Patent attorney in Lubbock, Texas",
    summary:
      "Patent applications, patentability reviews, USPTO Office Action responses, and invention strategy for Texas inventors and businesses.",
    intro: [
      "Patents help inventors protect useful inventions, technical improvements, product designs, and processes. A strong application explains what makes the invention new, how it works, and why it deserves protection from the United States Patent and Trademark Office.",
      "EZ Law assists inventors with practical patent planning, including whether to start with a provisional patent application, how to think about prior art, and how to respond when the USPTO raises questions.",
    ],
    helpsWith: [
      "Provisional patent applications",
      "Non-provisional utility patent applications",
      "Patentability reviews and prior art discussions",
      "USPTO Office Action responses",
      "Invention development and filing strategy",
    ],
    questions: [
      {
        question: "Do I need a patent attorney for a patent application?",
        answer:
          "A patent attorney is not legally required, but patent applications are technical legal documents. Careful drafting can affect how broad, useful, and enforceable the patent may be.",
      },
      {
        question: "What is the difference between a provisional and non-provisional patent application?",
        answer:
          "A provisional application can establish an early filing date and gives the inventor up to 12 months to file a non-provisional application. A non-provisional application is examined by the USPTO.",
      },
    ],
  },
  {
    slug: "trademark",
    title: "Trademark",
    eyebrow: "Trademark lawyer for Texas brands",
    summary:
      "Trademark searches, USPTO applications, Office Action responses, brand protection, and maintenance guidance.",
    intro: [
      "Trademarks protect the names, logos, phrases, and brand identifiers that help customers recognize a business. Federal registration can strengthen rights, create a public record, and support enforcement against confusingly similar marks.",
      "EZ Law helps businesses evaluate whether a mark is strong, search for potential conflicts, prepare USPTO applications, and respond to application issues.",
    ],
    helpsWith: [
      "Federal trademark searches",
      "USPTO trademark applications",
      "Office Action responses",
      "Trademark maintenance filings",
      "Brand enforcement and cease-and-desist strategy",
    ],
    questions: [
      {
        question: "Should I search a trademark before filing?",
        answer:
          "Yes. A trademark search can identify similar marks, avoid preventable refusals, and help you decide whether a brand is worth filing or revising.",
      },
      {
        question: "Can a local Texas business register a federal trademark?",
        answer:
          "Many local businesses can pursue federal registration if the mark is used in qualifying commerce. The right filing basis depends on how the business uses the mark.",
      },
    ],
  },
  {
    slug: "business-law",
    title: "Business Law",
    eyebrow: "Texas business formation and contracts",
    summary:
      "Business formation, operating agreements, contract drafting, contract review, compliance questions, and general counsel support.",
    intro: [
      "Business law support helps owners choose the right structure, reduce preventable risk, and put important agreements in writing. Texas businesses often need help with formation, contracts, compliance, and practical legal planning.",
      "EZ Law works with founders, owners, and growing companies that want clear documents and direct guidance without unnecessary complexity.",
    ],
    helpsWith: [
      "LLC and entity formation",
      "Operating agreements",
      "Contract drafting and review",
      "Vendor, customer, and partner agreements",
      "Outside general counsel support",
    ],
    questions: [
      {
        question: "What legal documents does a new Texas LLC usually need?",
        answer:
          "Many LLCs need a certificate of formation, company agreement, ownership records, tax registrations, and written contracts for customers, vendors, or partners.",
      },
      {
        question: "Can business law services be flat fee?",
        answer:
          "Many formation and document review projects can be handled on a flat-fee basis. More open-ended advisory or negotiation work may require a custom scope.",
      },
    ],
  },
  {
    slug: "copyright",
    title: "Copyright",
    eyebrow: "Copyright protection for creators and businesses",
    summary:
      "Copyright registrations, licensing guidance, infringement evaluations, and digital content protection.",
    intro: [
      "Copyright protects original creative works such as writing, photos, art, software, music, and digital media. Rights begin when the work is created, but registration can make enforcement stronger.",
      "EZ Law helps creators and businesses understand ownership, registration, licensing, fair use questions, and practical responses to unauthorized copying.",
    ],
    helpsWith: [
      "Copyright registration",
      "Ownership and licensing review",
      "Infringement evaluations",
      "Digital content protection",
      "Response strategy for unauthorized use",
    ],
    questions: [
      {
        question: "Does copyright protection require registration?",
        answer:
          "Copyright protection begins automatically when an original work is fixed in a tangible form, but registration can be important before filing an infringement lawsuit and may improve available remedies.",
      },
      {
        question: "What types of work can be copyrighted?",
        answer:
          "Common examples include written content, photography, artwork, music, videos, software code, website content, and other original creative works.",
      },
    ],
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    eyebrow: "Texas real estate document review",
    summary:
      "Purchase agreement review, lease drafting, buyer and seller guidance, title concerns, and dispute prevention.",
    intro: [
      "Real estate matters involve detailed documents and significant financial decisions. Purchase contracts, leases, disclosures, title issues, and financing terms can all change the risk of a transaction.",
      "EZ Law helps buyers, sellers, landlords, tenants, and property owners understand documents before they sign and resolve issues before they become expensive disputes.",
    ],
    helpsWith: [
      "Purchase agreement review",
      "Lease drafting and review",
      "Buyer and seller representation",
      "Title concern evaluation",
      "Real estate dispute prevention",
    ],
    questions: [
      {
        question: "Should I have a lawyer review a real estate contract before signing?",
        answer:
          "Review before signing is usually best because the contract controls deadlines, rights, remedies, and financial obligations once it is accepted.",
      },
      {
        question: "Can EZ Law help with deeds?",
        answer:
          "Yes. EZ Law handles selected Texas deed matters, including the separate EZ TODD service for Transfer on Death Deeds and Lady Bird deeds.",
      },
    ],
  },
  {
    slug: "professional-mediation",
    title: "Professional Mediation",
    eyebrow: "Mediation in Lubbock and West Texas",
    summary:
      "Neutral mediation services for business, property, civil, and family-related disputes.",
    intro: [
      "Mediation gives parties a structured, confidential setting to discuss disputes with a neutral mediator. It can reduce cost, preserve control, and help people find practical solutions without waiting for trial.",
      "EZ Law offers mediation appointments for individuals, businesses, and attorneys who want a focused path toward resolution.",
    ],
    helpsWith: [
      "Business disputes",
      "Property and real estate conflicts",
      "Civil litigation mediation",
      "Family mediation",
      "Pre-suit resolution discussions",
    ],
    questions: [
      {
        question: "Does a mediator decide who wins?",
        answer:
          "No. A mediator does not act as a judge. The mediator helps parties discuss issues, evaluate options, and work toward a voluntary agreement.",
      },
      {
        question: "Is mediation confidential?",
        answer:
          "Mediation is generally designed to be confidential, which helps parties speak more openly while exploring possible settlement terms.",
      },
    ],
  },
  {
    slug: "estate-planning",
    title: "Estate Planning",
    eyebrow: "Texas wills, powers of attorney, and directives",
    summary:
      "Basic estate planning, wills, powers of attorney, medical directives, and probate-avoidance deed planning.",
    intro: [
      "Estate planning helps people organize decisions before a crisis. A practical Texas plan may include a will, financial power of attorney, medical power of attorney, HIPAA authorization, and directive to physicians.",
      "EZ Law helps families create clear documents that identify who can act, who receives property, and how important decisions should be handled.",
    ],
    helpsWith: [
      "Texas wills",
      "Financial powers of attorney",
      "Medical powers of attorney",
      "Directives to physicians",
      "Transfer on Death Deeds and Lady Bird deeds",
    ],
    questions: [
      {
        question: "What documents are usually included in a basic Texas estate plan?",
        answer:
          "A basic plan often includes a will, financial power of attorney, medical power of attorney, HIPAA authorization, and directive to physicians.",
      },
      {
        question: "Is a deed the same thing as a will?",
        answer:
          "No. A deed transfers or plans for a specific real property interest. A will controls probate property and can address broader estate issues.",
      },
    ],
  },
  {
    slug: "civil-litigation",
    title: "Civil Litigation",
    eyebrow: "Dispute help for people and businesses",
    summary:
      "Pre-litigation negotiation, demand letters, claim evaluation, settlement work, and selected courtroom representation.",
    intro: [
      "Civil litigation covers disputes involving contracts, property, business relationships, and other non-criminal claims. Early evaluation can help identify the strongest path before costs escalate.",
      "EZ Law represents selected clients in negotiations, demand letters, settlement discussions, and litigation when the matter fits the firm's scope.",
    ],
    helpsWith: [
      "Claim and defense evaluation",
      "Demand letters",
      "Pre-litigation negotiation",
      "Settlement strategy",
      "Selected courtroom representation",
    ],
    questions: [
      {
        question: "Do most civil cases go to trial?",
        answer:
          "No. Many civil cases resolve through negotiation, mediation, or settlement before trial, but preparation still matters because deadlines and evidence shape leverage.",
      },
      {
        question: "When should I contact a lawyer about a dispute?",
        answer:
          "It is best to seek advice before deadlines pass, evidence is lost, or communications make the dispute harder to resolve.",
      },
    ],
  },
];

export function getPracticeArea(slug: string) {
  return practiceAreas.find((area) => area.slug === slug);
}
