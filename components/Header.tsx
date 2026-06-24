const navLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Call/Text", detail: "(806) 777-6249", href: "tel:+18067776249" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 text-white backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3" aria-label="EZ TODD by EZ Law home">
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white text-sm font-black text-black">
              EZ
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold tracking-normal text-white">
                EZ TODD
              </span>
              <span className="block text-xs font-medium text-white/55">by EZ Law</span>
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
            href="/start"
            className="hidden rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:bg-white/85 sm:inline-flex"
          >
            Start Now
          </a>
        </div>

        <div className="mt-4 grid gap-3 lg:hidden">
          <a
            href="/start"
            className="rounded-md bg-white px-4 py-2.5 text-center text-sm font-semibold text-black shadow-sm"
          >
            Start Now
          </a>
          <nav className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="shrink-0 text-sm font-medium text-white/65">
                {link.label}
                {"detail" in link ? <span className="ml-1 text-white/45">{link.detail}</span> : null}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
