import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { faqSections, getFaqJsonLd } from "@/lib/faq";

export const metadata: Metadata = {
  title: "EZ Law FAQ",
  description:
    "Plain-English answers about working with EZ Law for patents, trademarks, business law, copyright, real estate, estate planning, mediation, and civil litigation.",
};

export default function FaqPage() {
  const faqJsonLd = getFaqJsonLd();

  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              FAQ
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              EZ Law questions, answered plainly.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              Common questions about Patent Ed, intellectual property, business
              documents, real estate, estate planning, mediation, and how to contact
              EZ Law without accidentally sending confidential information too early.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8">
            {faqSections.map((section) => (
              <section
                key={section.title}
                className="rounded-md border border-white/10 bg-white/[0.03] p-5"
                aria-labelledby={`${section.title.toLowerCase().replaceAll(" ", "-")}-heading`}
              >
                <h2
                  id={`${section.title.toLowerCase().replaceAll(" ", "-")}-heading`}
                  className="text-2xl font-semibold tracking-normal"
                >
                  {section.title}
                </h2>
                <div className="mt-5 divide-y divide-white/10">
                  {section.items.map((item) => (
                    <details key={item.question} className="group py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-white">
                        {item.question}
                        <span className="text-xl text-white/45 group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-sm leading-6 text-white/60">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <CTASection
          title="Still have a question?"
          body="Call or text (806) 777-6249, or use the contact page to book online."
          primaryLabel="Contact EZ Law"
          primaryHref="/contact"
          secondaryLabel="Practice Areas"
          secondaryHref="/practice-areas"
        />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
