import { PortalSignOutButton } from "@/components/PortalSignOutButton";

export function PortalTopbar() {
  return (
    <header className="border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
            Internal portal
          </p>
          <p className="mt-1 text-sm text-white/60">
            Review submitted intake records. Payment, e-signature, and document generation are handled outside the website for launch.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:+18067776249"
            className="rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-white/70"
          >
            Call (806) 777-6249
          </a>
          <PortalSignOutButton />
        </div>
      </div>
    </header>
  );
}
