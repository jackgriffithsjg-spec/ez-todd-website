"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export function PortalLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    let signInErrorMessage = "";

    try {
      const supabase = createBrowserSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      signInErrorMessage = signInError?.message || "";
    } catch (clientError) {
      signInErrorMessage =
        clientError instanceof Error
          ? clientError.message
          : "Supabase is not configured for this environment.";
    }

    setIsLoading(false);

    if (signInErrorMessage) {
      setError(`Login failed. ${signInErrorMessage}`);
      return;
    }

    router.push("/portal");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <label className="block">
        <span className="text-sm font-semibold text-white">Email</span>
        <input
          name="email"
          type="email"
          placeholder="lawyer@example.com"
          className="mt-2 w-full rounded-md border border-white/10 bg-black px-3 py-3 text-sm text-white outline-none focus:border-white/40"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-white">Password</span>
        <input
          name="password"
          type="password"
          placeholder="Prototype password"
          className="mt-2 w-full rounded-md border border-white/10 bg-black px-3 py-3 text-sm text-white outline-none focus:border-white/40"
        />
      </label>
      {error ? (
        <p className="rounded-md border border-red-300/30 bg-red-500/10 p-3 text-sm leading-6 text-red-100">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:bg-white/50"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
      <p className="text-sm leading-6 text-white/50">
        Supabase email/password authentication is connected. Role-based access,
        session hardening, and production audit controls are still required before launch.
      </p>
    </form>
  );
}
