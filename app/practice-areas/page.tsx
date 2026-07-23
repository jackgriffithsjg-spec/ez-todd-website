import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { practiceAreas } from "@/lib/practiceAreas";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Explore EZ Law services for patents, trademarks, business law, copyright, real estate, mediation, estate planning, and civil litigation in Texas.",
  alternates: {
    canonical: absoluteUrl("/practice-areas"),
  },
};

export default function PracticeAreasPage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Practice areas
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              Legal help for inventions, brands, businesses, property, and disputes.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              EZ Law serves clients in Lubbock, West Texas, and across Texas in
              selected matters that can be handled efficiently in person or remotely.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
            {practiceAreas.map((area) => (
              <a
                key={area.slug}
                href={`/${area.slug}`}
                className="group rounded-md border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/35 hover:bg-white/[0.07]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                  {area.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-normal">{area.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/60">{area.summary}</p>
                <span className="mt-5 inline-flex text-sm font-semibold text-white group-hover:underline">
                  Learn more
                </span>
              </a>
            ))}
          </div>
        </section>

        <CTASection
          title="Need help choosing the right service?"
          body="Call or text with the general issue. Do not send confidential facts until an attorney-client relationship is confirmed."
          primaryLabel="Contact EZ Law"
          primaryHref="/contact"
          secondaryLabel={`Call/Text ${siteConfig.phoneDisplay}`}
          secondaryHref={siteConfig.phoneHref}
        />
      </main>
      <Footer />
    </>
  );
}
