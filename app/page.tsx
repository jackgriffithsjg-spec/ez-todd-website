import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { practiceAreas } from "@/lib/practiceAreas";
import { getLegalServiceJsonLd, getWebsiteJsonLd } from "@/lib/schema";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zafrani Law PLLC / EZ Law | Lubbock Patent Attorney and Texas Legal Services",
  description:
    "EZ Law helps Texas clients with patents, trademarks, business law, copyright, real estate, mediation, estate planning, and civil litigation.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

const answerCards = [
  {
    question: "Who is Patent Ed?",
    answer:
      "Patent Ed is Edmund Zafrani, a Lubbock attorney licensed by the State Bar of Texas and registered with the United States Patent and Trademark Office.",
  },
  {
    question: "What does EZ Law help with?",
    answer:
      "EZ Law helps with patents, trademarks, copyright, business formation and contracts, real estate documents, mediation, estate planning, and selected civil disputes.",
  },
  {
    question: "Where does EZ Law serve clients?",
    answer:
      "The office is in Lubbock, Texas, with services available to clients in West Texas and across Texas when the matter can be handled remotely.",
  },
];

const proofPoints = [
  "USPTO-registered patent attorney",
  "State Bar of Texas licensed attorney",
  "Flat-fee options when the scope fits",
  "Call or text access at (806) 777-6249",
];

export default function Home() {
  const legalServiceJsonLd = getLegalServiceJsonLd();
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="relative overflow-hidden bg-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <img
                src="/brand/ez-law-logo-full-white-v2.png"
                alt="EZ Law"
                className="mb-7 block h-auto w-52 object-contain sm:w-64"
                width="2000"
                height="1600"
              />
              <p className="mb-4 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/75">
                Lubbock patent attorney and Texas legal services
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-normal text-white sm:text-6xl">
                Zafrani Law PLLC / EZ Law helps Texas creators, owners, and businesses protect what matters.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                Work directly with Edmund Zafrani at EZ Law for patent, trademark,
                business, copyright, real estate, mediation, estate planning, and
                civil litigation matters.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-white/85"
                >
                  Book Online
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                >
                  Call or Text {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>

            <aside className="rounded-md border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
                Quick answers
              </p>
              <div className="mt-5 divide-y divide-white/10">
                {answerCards.map((item) => (
                  <article key={item.question} className="py-4 first:pt-0 last:pb-0">
                    <h2 className="text-lg font-semibold tracking-normal">{item.question}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/60">{item.answer}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-white/10 bg-black px-4 py-5 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-3 text-center text-sm font-semibold text-white/75 md:grid-cols-4">
            {proofPoints.map((item) => (
              <div key={item} className="rounded-md border border-white/10 px-4 py-3">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="practice-heading">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
                  Practice areas
                </p>
                <h2 id="practice-heading" className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
                  Legal help built for searchable, specific problems.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-white/55">
                Each practice page answers the questions people actually search before
                calling a lawyer.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {practiceAreas.map((area) => (
                <a
                  key={area.slug}
                  href={`/${area.slug}`}
                  className="group rounded-md border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/35 hover:bg-white/[0.07]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                    {area.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{area.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{area.summary}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-white group-hover:underline">
                    View service
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
                Why the redesign works
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
                Clear answers for Google, AI results, and real clients.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Direct question-and-answer content for answer engines.",
                "Dedicated pages for every high-intent practice area.",
                "Local signals for Lubbock, West Texas, and Texas-wide service.",
                "Structured data for legal service, website, and FAQs.",
              ].map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-black p-5 text-sm leading-6 text-white/60">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          id="final-cta"
          title="Talk with Patent Ed."
          body="Call, text, or book online to ask about patents, trademarks, business documents, real estate, mediation, estate planning, or civil litigation."
          primaryLabel="Book Online"
          primaryHref="/contact"
          secondaryLabel={`Call/Text ${siteConfig.phoneDisplay}`}
          secondaryHref={siteConfig.phoneHref}
        />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([legalServiceJsonLd, websiteJsonLd]) }}
      />
    </>
  );
}
