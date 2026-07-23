import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Intake Submitted | EZ TODD by EZ Law",
  description:
    "Confirmation that your Texas deed intake has been submitted to EZ Law for attorney review.",
};

type ConfirmationPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function IntakeConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const params = searchParams ? await searchParams : {};
  const submissionId = firstParam(params.submissionId);

  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Intake submitted
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal sm:text-6xl">
              Thank you. EZ Law has received your deed questionnaire.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              An attorney will review your information before accepting the matter,
              confirming the deed path, or requesting payment. Please do not send
              sensitive information unless EZ Law asks for it.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/35">
                Step 1
              </p>
              <h2 className="mt-3 text-xl font-semibold">Attorney review</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">
                EZ Law reviews your answers for fit, conflicts, and any deed issues
                that need clarification.
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/35">
                Step 2
              </p>
              <h2 className="mt-3 text-xl font-semibold">Follow-up</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">
                The firm may contact you to confirm details, request your current
                deed, or schedule a short call.
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/35">
                Step 3
              </p>
              <h2 className="mt-3 text-xl font-semibold">Engagement</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">
                If EZ Law can help, you will receive the final engagement and payment
                instructions directly from the firm.
              </p>
            </div>
          </div>
          {submissionId ? (
            <p className="mx-auto mt-6 max-w-4xl rounded-md border border-white/10 bg-black p-4 text-sm leading-6 text-white/50">
              Reference ID: {submissionId}
            </p>
          ) : null}
        </section>

        <CTASection
          title="Need to talk to someone now?"
          body="Call or text EZ Law if your matter is urgent or if you need help with the questionnaire."
          primaryLabel="Call or Text EZ Law"
          primaryHref="tel:+18067776249"
          secondaryLabel="Back to Home"
          secondaryHref="/"
        />
      </main>
      <Footer />
    </>
  );
}
