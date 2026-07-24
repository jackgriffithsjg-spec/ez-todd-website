import type { Metadata } from "next";
import Script from "next/script";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "EZ TODD by EZ Law | Attorney-Prepared Texas Deeds",
    template: "%s | EZ Law",
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: "EZ TODD by EZ Law | Attorney-Prepared Texas Deeds",
    description: siteConfig.description,
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-BCGVCMWNWJ" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BCGVCMWNWJ');
          `}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
