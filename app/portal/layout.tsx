import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // TODO before production: add role-based access, stricter protected-route checks,
  // secure session policies, audit logs, file upload security, file access controls,
  // session timeout, and tighter RLS policies for every portal route.
  return children;
}
