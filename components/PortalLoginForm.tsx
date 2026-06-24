"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export function PortalLoginForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/portal");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <label className="block">
        <span className="text-sm font-semibold text-white">Email</span>
        <input
          type="email"
          placeholder="lawyer@example.com"
          className="mt-2 w-full rounded-md border border-white/10 bg-black px-3 py-3 text-sm text-white outline-none focus:border-white/40"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-white">Password</span>
        <input
          type="password"
          placeholder="Prototype password"
          className="mt-2 w-full rounded-md border border-white/10 bg-black px-3 py-3 text-sm text-white outline-none focus:border-white/40"
        />
      </label>
      <button type="submit" className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-black">
        Sign In
      </button>
      <p className="text-sm leading-6 text-white/50">
        Prototype login only. Real authentication will be added before launch.
      </p>
    </form>
  );
}
