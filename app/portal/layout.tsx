import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // TODO before production: add real authentication, role-based access, protected routes,
  // secure sessions, database storage, audit logs, file upload security, file access controls,
  // and session timeout for every portal route.
  return children;
}
