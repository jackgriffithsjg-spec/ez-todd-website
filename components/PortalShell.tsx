import type { ReactNode } from "react";
import { PortalSidebar } from "@/components/PortalSidebar";
import { PortalTopbar } from "@/components/PortalTopbar";

type PortalShellProps = {
  children: ReactNode;
};

export function PortalShell({ children }: PortalShellProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <PortalSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <PortalTopbar />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
