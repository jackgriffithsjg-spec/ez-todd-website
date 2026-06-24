"use client";

import { useState } from "react";

export function InternalNotesCard({ initialNote }: { initialNote: string }) {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState(initialNote);

  return (
    <section className="rounded-md border border-white/10 bg-white/[0.03] p-5">
      <h2 className="text-xl font-semibold tracking-normal text-white">Internal Attorney Notes</h2>
      <p className="mt-4 rounded-md border border-white/10 bg-black p-4 text-sm leading-6 text-white/60">
        Existing mock note: {savedNote || "None"}
      </p>
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Add internal note..."
        className="mt-5 min-h-36 w-full rounded-md border border-white/10 bg-black p-3 text-sm leading-6 text-white outline-none focus:border-white/40"
      />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => {
            if (note.trim()) setSavedNote(note);
          }}
          className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black"
        >
          Save Note
        </button>
        <p className="text-sm text-white/45">Prototype save only. Notes are not stored in a database.</p>
      </div>
    </section>
  );
}
