type AcknowledgmentBoxProps = {
  label: string;
};

export function AcknowledgmentBox({ label }: AcknowledgmentBoxProps) {
  return (
    <label className="flex gap-3 rounded-md border border-white/10 bg-black p-4 text-sm leading-6 text-white/65">
      <input type="checkbox" className="mt-1 h-4 w-4 accent-white" />
      <span>{label}</span>
    </label>
  );
}
