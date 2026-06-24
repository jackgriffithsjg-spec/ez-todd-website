export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-md border border-white/20 bg-white text-2xl font-black text-black">
            EZ
          </div>
          <p className="text-5xl font-semibold tracking-normal sm:text-6xl">EZ TODD</p>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.24em] text-white/55">
            by EZ Law
          </p>
        </div>

        <p className="mb-4 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/75">
          Reviewed by a licensed Texas attorney
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-normal text-white sm:text-6xl">
          Attorney-prepared Texas deeds. Statewide. Flat fee.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
          The easy way to order a Texas Transfer on Death Deed or Lady Bird deed
          prepared and reviewed by a licensed Texas attorney.
        </p>

        <div className="mx-auto mt-9 grid w-full max-w-3xl justify-center gap-3 sm:grid-cols-3">
          <a
            href="/which-deed-do-i-need"
            className="flex min-h-12 items-center justify-center rounded-md border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            Transfer on Death Deed
          </a>
          <a
            href="/which-deed-do-i-need"
            className="flex min-h-12 items-center justify-center rounded-md border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            Lady Bird Deed
          </a>
          <a
            href="/which-deed-do-i-need"
            className="flex min-h-12 items-center justify-center rounded-md border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            Not Sure? Help Me Choose
          </a>
        </div>

        <a
          id="start"
          href="/start"
          className="mt-5 inline-flex rounded-md bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-black shadow-sm transition hover:bg-white/85"
        >
          Start Now
        </a>
        <p className="mt-5 text-sm text-white/45">
          Call or text for help:{" "}
          <a href="tel:+18067776249" className="text-white underline underline-offset-4">
            (806) 777-6249
          </a>
          <span className="mx-2 text-white/25">|</span>
          Email:{" "}
          <a href="mailto:Edzafrani@gmail.com" className="text-white underline underline-offset-4">
            Edzafrani@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
