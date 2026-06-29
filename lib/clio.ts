type ClioInboxLeadInput = {
  submissionId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  propertyCounty: string;
  propertyAddress: string;
  recommendation: string;
  status: string;
  flags: Array<{
    tier: "Tier 1" | "Tier 2";
    label: string;
    description?: string;
  }>;
};

function getClioInboxLeadUrl() {
  if (process.env.CLIO_GROW_INBOX_LEADS_URL) {
    return process.env.CLIO_GROW_INBOX_LEADS_URL;
  }

  const baseUrl = process.env.CLIO_GROW_API_BASE_URL;
  if (!baseUrl) return "";

  return `${baseUrl.replace(/\/$/, "")}/inbox_leads`;
}

function buildLeadMessage(input: ClioInboxLeadInput) {
  const reviewFlags =
    input.flags.length > 0
      ? input.flags
          .map((flag) => `- ${flag.label}${flag.description ? `: ${flag.description}` : ""}`)
          .join("\n")
      : "None";

  return [
    "New EZ TODD website intake submission.",
    "",
    `Submission ID: ${input.submissionId}`,
    `Status: ${input.status}`,
    `Preliminary recommendation: ${input.recommendation}`,
    "",
    `Client: ${input.clientName}`,
    `Phone: ${input.clientPhone}`,
    `Email: ${input.clientEmail}`,
    "",
    `Property: ${input.propertyAddress}`,
    `County: ${input.propertyCounty}`,
    "",
    "Review flags:",
    reviewFlags,
  ].join("\n");
}

export async function createClioInboxLead(input: ClioInboxLeadInput) {
  const url = getClioInboxLeadUrl();
  const token = process.env.CLIO_GROW_API_TOKEN;

  if (!url || !token) {
    console.info("Clio Grow sync skipped: missing CLIO_GROW_API_TOKEN or inbox lead URL.");
    return;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: input.clientName,
      email: input.clientEmail,
      phone: input.clientPhone,
      source: "EZ TODD Website",
      referring_url: process.env.NEXT_PUBLIC_SITE_URL || null,
      message: buildLeadMessage(input),
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Clio Grow sync failed with ${response.status}: ${body}`);
  }
}
