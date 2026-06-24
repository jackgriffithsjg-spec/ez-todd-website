import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  try {
    return await updateSupabaseSession(request);
  } catch {
    if (request.nextUrl.pathname.startsWith("/portal") && request.nextUrl.pathname !== "/portal/login") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/portal/login";
      redirectUrl.searchParams.set("error", "supabase-not-configured");
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/portal/:path*"],
};
