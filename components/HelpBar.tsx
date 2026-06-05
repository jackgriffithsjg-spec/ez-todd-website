type HelpBarProps = {
  showStartOver?: boolean;
};

export function HelpBar({ showStartOver = false }: HelpBarProps) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Need help? Call or text{" "}
          <a href="tel:" className="font-semibold text-white underline underline-offset-4">
            [firm phone]
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="font-semibold text-white/45">Save and resume coming soon</span>
          {showStartOver ? (
            <a href="/intake" className="font-semibold text-white/70 hover:text-white">
              Start Over
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
