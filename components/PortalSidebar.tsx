const portalNav = [
  { label: "Submissions", href: "/portal" },
  { label: "Review Queue", href: "/portal?flag=tier1" },
  { label: "Drafting", href: "/portal?status=Drafting" },
];

export function PortalSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-white/10 px-4 py-6 lg:block xl:w-60">
      <a href="/portal" className="flex items-center gap-3" aria-label="EZ TODD portal home">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-sm font-black text-black">
          EZ
        </span>
        <span>
          <span className="block text-sm font-semibold">EZ TODD</span>
          <span className="block text-xs text-white/45">Lawyer Portal</span>
        </span>
      </a>
      <nav className="mt-8 grid gap-2" aria-label="Portal navigation">
        {portalNav.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-white/25 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <p className="mt-8 rounded-md border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-5 text-amber-100/80">
        Prototype only. Direct URL access is not secure and must be replaced before launch.
      </p>
    </aside>
  );
}
