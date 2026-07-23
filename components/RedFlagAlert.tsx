type RedFlagAlertProps = {
  flags: string[];
};

export function RedFlagAlert({ flags }: RedFlagAlertProps) {
  if (flags.length === 0) {
    return null;
  }

  return (
    <div className="rounded-md border border-white/15 bg-white/[0.05] p-4">
      <p className="text-sm font-semibold text-white">Review-required answers detected</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-white/60">
        {flags.map((flag) => (
          <li key={flag}>- {flag}</li>
        ))}
      </ul>
    </div>
  );
}
