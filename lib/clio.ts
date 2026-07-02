import { createHmac, randomUUID, timingSafeEqual } from "crypto";

type ClioIntakeSyncInput = {
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

type ClioTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
};

type ClioStatePayload = {
  createdAt: number;
  nonce: string;
};

const DEFAULT_CLIO_BASE_URL = "https://app.clio.com";
const STATE_MAX_AGE_MS = 10 * 60 * 1000;

function getClioBaseUrl() {
  return (process.env.CLIO_MANAGE_BASE_URL || DEFAULT_CLIO_BASE_URL).replace(/\/$/, "");
}

function getClioRedirectUri() {
  if (process.env.CLIO_REDIRECT_URI) return process.env.CLIO_REDIRECT_URI;
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/api/clio/callback`;
  }
  return "";
}

function getClioClientConfig() {
  return {
    clientId: process.env.CLIO_CLIENT_ID || "",
    clientSecret: process.env.CLIO_CLIENT_SECRET || "",
    redirectUri: getClioRedirectUri(),
    baseUrl: getClioBaseUrl(),
  };
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

async function signStatePayload(encodedPayload: string) {
  const secret = process.env.CLIO_CONNECT_SECRET;
  if (!secret) throw new Error("Missing CLIO_CONNECT_SECRET.");

  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

export async function createClioState() {
  const payload: ClioStatePayload = {
    createdAt: Date.now(),
    nonce: randomUUID(),
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await signStatePayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export async function verifyClioState(state: string) {
  const [encodedPayload, signature] = state.split(".");
  if (!encodedPayload || !signature) return false;

  const expectedSignature = await signStatePayload(encodedPayload);
  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);
  if (
    signatureBuffer.length !== expectedSignatureBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
  ) {
    return false;
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload)) as ClioStatePayload;
  return Date.now() - payload.createdAt <= STATE_MAX_AGE_MS;
}

export async function buildClioAuthorizationUrl() {
  const { clientId, redirectUri, baseUrl } = getClioClientConfig();
  if (!clientId || !redirectUri) {
    throw new Error("Missing CLIO_CLIENT_ID or CLIO_REDIRECT_URI.");
  }

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    state: await createClioState(),
    redirect_on_decline: "true",
  });

  return `${baseUrl}/oauth/authorize?${params.toString()}`;
}

export async function exchangeClioAuthorizationCode(code: string) {
  const { clientId, clientSecret, redirectUri, baseUrl } = getClioClientConfig();
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Missing CLIO_CLIENT_ID, CLIO_CLIENT_SECRET, or CLIO_REDIRECT_URI.");
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  const response = await fetch(`${baseUrl}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(`Clio authorization failed with ${response.status}: ${errorBody}`);
  }

  return (await response.json()) as ClioTokenResponse;
}

async function refreshClioAccessToken() {
  const { clientId, clientSecret, baseUrl } = getClioClientConfig();
  const refreshToken = process.env.CLIO_REFRESH_TOKEN || process.env.CLIO_MANAGE_REFRESH_TOKEN || "";
  if (!clientId || !clientSecret || !refreshToken) return null;

  const response = await fetch(`${baseUrl}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(`Clio token refresh failed with ${response.status}: ${errorBody}`);
  }

  return (await response.json()) as ClioTokenResponse;
}

export async function getClioAuthorizedUser(accessToken: string) {
  const response = await fetch(`${getClioBaseUrl()}/api/v4/users/who_am_i`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(`Clio authorization check failed with ${response.status}: ${errorBody}`);
  }

  return (await response.json()) as { data?: { id?: number; name?: string } };
}

function getClioGrowInboxLeadUrl() {
  if (process.env.CLIO_GROW_INBOX_LEADS_URL) return process.env.CLIO_GROW_INBOX_LEADS_URL;

  const baseUrl = process.env.CLIO_GROW_API_BASE_URL;
  if (!baseUrl) return "";

  return `${baseUrl.replace(/\/$/, "")}/inbox_leads`;
}

function buildLeadMessage(input: ClioIntakeSyncInput) {
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

async function createClioGrowInboxLead(input: ClioIntakeSyncInput) {
  const url = getClioGrowInboxLeadUrl();
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

async function logClioManageSyncReadiness() {
  const token = await refreshClioAccessToken();
  if (!token?.access_token) {
    console.info("Clio Manage sync skipped: missing CLIO_REFRESH_TOKEN or OAuth client configuration.");
    return;
  }

  await getClioAuthorizedUser(token.access_token);
  console.info(
    "Clio Manage OAuth is configured. Intake record creation is waiting on the target Clio object mapping.",
  );
}

export async function syncClioIntakeSubmission(input: ClioIntakeSyncInput) {
  if (process.env.CLIO_REFRESH_TOKEN || process.env.CLIO_MANAGE_REFRESH_TOKEN) {
    await logClioManageSyncReadiness();
    return;
  }

  await createClioGrowInboxLead(input);
}
