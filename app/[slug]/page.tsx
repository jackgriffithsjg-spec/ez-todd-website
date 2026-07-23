import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getPracticeArea, practiceAreas } from "@/lib/practiceAreas";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PracticePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PracticePageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeArea(slug);

  if (!area) {
    return {};
  }

  return {
    title: `${area.title} Lawyer in Lubbock, Texas`,
    description: area.summary,
    alternates: {
      canonical: absoluteUrl(`/${area.slug}`),
    },
  };
}

export default async function PracticeAreaPage({ params }: PracticePageProps) {
  const { slug } = await params;
  const area = getPracticeArea(slug);

  if (!area) {
    notFound();
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              {area.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              {area.title} lawyer in Lubbock, Texas
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              {area.summary}
            </p>
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.72fr]">
            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-2xl font-semibold tracking-normal">What this service covers</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-white/65">
                {area.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
            <aside className="rounded-md border border-white/10 bg-black p-6">
              <h2 className="text-2xl font-semibold tracking-normal">How EZ Law can help</h2>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/65">
                {area.helpsWith.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Quick answers
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal">
              Common {area.title.toLowerCase()} questions
            </h2>
            <div className="mt-6 divide-y divide-white/10 rounded-md border border-white/10 bg-black px-5">
              {area.questions.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-white">
                    {item.question}
                    <span className="text-xl text-white/45 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-white/60">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title={`Talk with EZ Law about ${area.title.toLowerCase()}.`}
          body="Call, text, or book online. Please do not send confidential details until EZ Law confirms representation."
          primaryLabel="Contact EZ Law"
          primaryHref="/contact"
          secondaryLabel={`Call/Text ${siteConfig.phoneDisplay}`}
          secondaryHref={siteConfig.phoneHref}
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
