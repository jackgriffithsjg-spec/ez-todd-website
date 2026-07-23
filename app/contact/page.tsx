import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact EZ TODD by EZ Law",
  description:
    "Contact EZ TODD by EZ Law for Texas Transfer on Death Deeds and Lady Bird Deeds.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
                Contact
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
                Contact EZ TODD about a Texas deed.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
                Reach out about a Texas Transfer on Death Deed or Lady Bird Deed.
                Do not send confidential information until EZ Law confirms
                representation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-white/85"
                >
                  Call or Text {siteConfig.phoneDisplay}
                </a>
                <a
                  href="https://getezlaw.cliogrow.com/intake/b640a87d28d6b3ff27c8bd0491595175"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                >
                  Book Online
                </a>
              </div>
            </div>

            <aside className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-2xl font-semibold tracking-normal">Before you send a message</h2>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/65">
                <li>- Share whether you are asking about a TODD or Lady Bird Deed.</li>
                <li>- Include the Texas county where the property is located.</li>
                <li>- Avoid confidential facts until representation is confirmed.</li>
                <li>- Call or text if the matter is time-sensitive.</li>
              </ul>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
