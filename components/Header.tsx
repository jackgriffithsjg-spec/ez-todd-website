import { practiceAreas } from "@/lib/practiceAreas";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Meet Patent Ed", href: "/meet-patent-ed" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Call/Text", detail: siteConfig.phoneDisplay, href: siteConfig.phoneHref },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 text-white backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3" aria-label="EZ Law home">
            <img
              src="/brand/ez-law-mark-white-v2.png"
              alt=""
              className="block h-10 w-10 object-contain"
              width="1000"
              height="1120"
            />
            <span className="leading-tight">
              <span className="block text-base font-semibold tracking-normal text-white">
                EZ Law
              </span>
              <span className="block text-xs font-medium text-white/55">Patent Ed</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
              href={link.href}
              className="text-sm font-medium text-white/65 transition hover:text-white"
            >
              {link.label}
              {"detail" in link ? <span className="ml-1 text-white/45">{link.detail}</span> : null}
            </a>
          ))}
          </nav>

          <a
            href="/contact"
            className="hidden rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:bg-white/85 sm:inline-flex"
          >
            Book Online
          </a>
        </div>

        <div className="mt-4 grid gap-3 lg:hidden">
          <a
            href="/contact"
            className="rounded-md bg-white px-4 py-2.5 text-center text-sm font-semibold text-black shadow-sm"
          >
            Book Online
          </a>
          <nav className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="shrink-0 text-sm font-medium text-white/65">
                {link.label}
                {"detail" in link ? <span className="ml-1 text-white/45">{link.detail}</span> : null}
              </a>
            ))}
          </nav>
          <nav className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1" aria-label="Practice areas">
            {practiceAreas.slice(0, 5).map((area) => (
              <a key={area.slug} href={`/${area.slug}`} className="shrink-0 text-xs font-medium text-white/45">
                {area.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
