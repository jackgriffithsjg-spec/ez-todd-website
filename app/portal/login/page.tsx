import type { Metadata } from "next";
import { PortalLoginForm } from "@/components/PortalLoginForm";

export const metadata: Metadata = {
  title: "Portal Login | EZ TODD by EZ Law",
  description: "Secure login for the EZ TODD lawyer portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLoginPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md flex-col justify-center">
        <a href="/" className="mb-8 inline-flex items-center gap-3" aria-label="EZ TODD home">
          <img
            src="/brand/ez-law-mark-white-v2.png"
            alt=""
            className="block h-10 w-10 object-contain"
            width="1000"
            height="1120"
          />
          <span>
            <span className="block text-base font-semibold">EZ TODD</span>
            <span className="block text-xs text-white/45">Lawyer Portal</span>
          </span>
        </a>
        <section className="rounded-md border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
            Internal access
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal">Sign in to the portal.</h1>
          <p className="mt-4 text-sm leading-6 text-white/55">
            Authorized EZ Law users can review submitted deed intake records here.
          </p>
          {/* TODO before production: add role-based access, stricter protected-route
             checks, secure session policies, audit logs, and session timeout. */}
          <PortalLoginForm />
        </section>
      </div>
    </main>
  );
}
