import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meet Patent Ed",
  description:
    "Meet Edmund Zafrani of EZ Law, a Lubbock attorney licensed in Texas and registered with the USPTO.",
  alternates: {
    canonical: absoluteUrl("/meet-patent-ed"),
  },
};

const credentials = [
  "JD, Texas Tech School of Law",
  "MS Biotechnology, TTUHSC",
  "BS Microbiology, Texas Tech University",
  "State Bar of Texas",
  "United States Patent and Trademark Office",
  "Texas Mediator and Texas Family Mediator",
  "Texas Notary",
];

const details = [
  "Former mechanic with a practical, systems-minded approach to technical problems.",
  "Patent work supported by science training in biotechnology and microbiology.",
  "Local Lubbock practice serving creators, owners, businesses, and families across Texas.",
  "Direct communication style with call-or-text access for clients and prospective clients.",
];

export default function MeetPatentEdPage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
                Meet Patent Ed
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
                Edmund G. Zafrani
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
                Edmund Zafrani is the attorney behind EZ Law and Patent Ed. His work
                combines Texas legal practice, USPTO patent registration, science
                training, and practical problem solving for clients who want direct
                guidance.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
                <h2 className="text-2xl font-semibold tracking-normal">Education and licenses</h2>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/65">
                  {credentials.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </article>
              <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
                <h2 className="text-2xl font-semibold tracking-normal">Practice style</h2>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/65">
                  {details.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <CTASection
          title="Ready to talk with Patent Ed?"
          body="Call, text, or book online. Please do not send confidential facts until representation is confirmed."
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
