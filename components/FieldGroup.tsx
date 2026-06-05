type Option = {
  label: string;
  value?: string;
};

type FieldGroupProps = {
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "radio" | "file";
  placeholder?: string;
  options?: Option[];
  required?: boolean;
};

export function FieldGroup({
  label,
  type = "text",
  placeholder,
  options = [],
  required = false,
}: FieldGroupProps) {
  const baseClass =
    "mt-2 w-full rounded-md border border-white/10 bg-black px-3 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/45";

  return (
    <label className="block">
      <span className="text-sm font-semibold text-white">
        {label}
        {required ? <span className="text-white/45"> *</span> : null}
      </span>
      {type === "textarea" ? (
        <textarea className={`${baseClass} min-h-28`} placeholder={placeholder} />
      ) : type === "select" ? (
        <select className={baseClass} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {options.map((option) => (
            <option key={option.label} value={option.value ?? option.label}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "radio" ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {options.map((option) => (
            <span key={option.label} className="rounded-md border border-white/10 bg-black p-3 text-sm text-white/70">
              <input type="radio" name={label} className="mr-2 accent-white" />
              {option.label}
            </span>
          ))}
        </div>
      ) : type === "file" ? (
        <div className="mt-2 rounded-md border border-dashed border-white/15 bg-black p-4 text-sm text-white/45">
          Upload current deed placeholder. No file will be submitted in this mockup.
        </div>
      ) : (
        <input className={baseClass} type={type} placeholder={placeholder} />
      )}
    </label>
  );
}
