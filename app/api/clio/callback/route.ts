import { NextResponse } from "next/server";
import { exchangeClioAuthorizationCode, getClioAuthorizedUser, verifyClioState } from "@/lib/clio";

function htmlResponse(body: string, status = 200) {
  return new NextResponse(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const error = url.searchParams.get("error");
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (error) {
    return htmlResponse(`<h1>Clio authorization declined</h1><p>${escapeHtml(error)}</p>`, 400);
  }

  if (!code || !state || !(await verifyClioState(state))) {
    return htmlResponse("<h1>Clio authorization failed</h1><p>The callback was missing a valid code or state.</p>", 400);
  }

  try {
    const token = await exchangeClioAuthorizationCode(code);
    const refreshToken = token.refresh_token;
    const user = await getClioAuthorizedUser(token.access_token);

    if (!refreshToken) {
      return htmlResponse("<h1>Clio connected</h1><p>No refresh token was returned by Clio.</p>");
    }

    return htmlResponse(`
      <main style="font-family: system-ui, sans-serif; max-width: 760px; margin: 48px auto; line-height: 1.5;">
        <h1>Clio connected</h1>
        <p>Add this server-side environment variable in Vercel and your local .env.local file. Treat it like a password.</p>
        <label style="display:block; font-weight:700; margin: 24px 0 8px;">CLIO_REFRESH_TOKEN</label>
        <textarea readonly style="width:100%; min-height:120px; font: 14px ui-monospace, SFMono-Regular, Menlo, monospace;">${escapeHtml(refreshToken)}</textarea>
        <p>Authorized Clio user: ${escapeHtml(user.data?.name || "Unknown")}.</p>
        <p>After saving the variable, redeploy or restart the app. The final intake-record mapping can then be enabled.</p>
      </main>
    `);
  } catch (exchangeError) {
    return htmlResponse(
      `<h1>Clio authorization failed</h1><p>${escapeHtml(
        exchangeError instanceof Error ? exchangeError.message : "Unable to exchange Clio authorization code.",
      )}</p>`,
      500,
    );
  }
}
