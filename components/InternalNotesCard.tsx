"use client";

import { useState } from "react";

export function InternalNotesCard({
  submissionId,
  initialNote,
}: {
  submissionId: string;
  initialNote: string;
}) {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState(initialNote);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function saveNote() {
    if (!note.trim()) return;
    setIsSaving(true);
    setMessage("");

    const response = await fetch(`/api/portal/submissions/${submissionId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    });

    setIsSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setMessage(data?.error || "Note save failed.");
      return;
    }

    setSavedNote(note);
    setNote("");
    setMessage("Note saved to Supabase.");
  }

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
          onClick={saveNote}
          disabled={isSaving || !note.trim()}
          className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:bg-white/50"
        >
          {isSaving ? "Saving..." : "Save Note"}
        </button>
        <p className="text-sm text-white/45">Notes are stored in Supabase for authenticated portal users.</p>
      </div>
      {message ? <p className="mt-3 text-sm text-white/60">{message}</p> : null}
    </section>
  );
}
