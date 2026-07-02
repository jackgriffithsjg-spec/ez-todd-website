import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  console.info("Clio deauthorization callback received", {
    clientId: payload?.client_id,
    userId: payload?.user_id,
    accessToken: payload?.access_token === "all" ? "all" : payload?.access_token ? "[redacted]" : undefined,
  });

  return new NextResponse(null, { status: 204 });
}
