import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IntakeMockup } from "@/components/IntakeMockup";

export const metadata: Metadata = {
  title: "EZ TODD Intake | Texas Deed Questionnaire",
  description:
    "Submit the EZ TODD Texas deed intake questionnaire for attorney review.",
};

export default function IntakePage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <IntakeMockup />
      </main>
      <Footer />
    </>
  );
}
