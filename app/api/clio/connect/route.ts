import { NextResponse } from "next/server";
import { buildClioAuthorizationUrl } from "@/lib/clio";

export async function GET(request: Request) {
  const expectedSetupSecret = process.env.CLIO_CONNECT_SECRET;
  const providedSetupSecret = new URL(request.url).searchParams.get("setup");

  if (!expectedSetupSecret || providedSetupSecret !== expectedSetupSecret) {
    return NextResponse.json({ error: "Clio setup is not authorized." }, { status: 401 });
  }

  try {
    return NextResponse.redirect(await buildClioAuthorizationUrl());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to start Clio authorization." },
      { status: 500 },
    );
  }
}
