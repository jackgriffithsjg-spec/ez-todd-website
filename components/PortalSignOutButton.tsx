"use client";

import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export function PortalSignOutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={signOut} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black">
      Sign Out
    </button>
  );
}
