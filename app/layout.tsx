import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EZ TODD by EZ Law | Attorney-Prepared Texas Deeds",
  description:
    "EZ TODD by EZ Law offers flat-fee Texas Transfer on Death Deeds and Lady Bird Deeds prepared and reviewed by a licensed Texas attorney.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
