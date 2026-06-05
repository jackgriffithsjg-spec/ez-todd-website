type MergeFieldProps = {
  children: string;
};

export function MergeField({ children }: MergeFieldProps) {
  return (
    <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-white">
      {children}
    </span>
  );
}
