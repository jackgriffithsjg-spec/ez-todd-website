type InternalMatterTagsProps = {
  tags: string[];
};

export function InternalMatterTags({ tags }: InternalMatterTagsProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="rounded-md border border-white/10 bg-black p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
        Mock internal review tags
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/60">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
