import { practiceAreas } from "@/lib/practiceAreas";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Meet Patent Ed", href: "/meet-patent-ed" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: siteConfig.privacyPolicyUrl },
  { label: "Terms of Use", href: siteConfig.termsOfUseUrl },
  { label: "Call/Text", href: siteConfig.phoneHref },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img
              src="/brand/ez-law-mark-white-v2.png"
              alt=""
              className="block h-10 w-10 object-contain"
              width="1000"
              height="1120"
            />
            <span className="text-lg font-semibold">EZ Law | Patent Ed</span>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-white/55">
            {siteConfig.legalName}, doing business as EZ Law. Principal office:
            Lubbock, Texas. Responsible attorney: {siteConfig.responsibleAttorney}.
            Phone {siteConfig.phoneDisplay}. Email {siteConfig.email}. This website is
            attorney advertising and provides general information only. It is not
            legal advice, and using this site, reading our answers, or contacting us
            does not create an attorney-client relationship. An attorney-client
            relationship begins only when you sign an engagement agreement and we
            accept your matter. Results depend on your specific facts, and no
            particular legal or tax outcome is guaranteed.{" "}
            <a href="/legal-and-disclaimers" className="text-white underline underline-offset-4">
              See our full Disclaimers and Legal Notices.
            </a>
          </p>
        </div>

        <div className="grid gap-6 md:justify-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-white/55 hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <nav className="flex max-w-lg flex-wrap gap-x-4 gap-y-2 text-sm md:justify-end" aria-label="Practice area links">
            {practiceAreas.map((area) => (
              <a key={area.slug} href={`/${area.slug}`} className="text-white/40 hover:text-white">
                {area.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
