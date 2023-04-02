import { ChangeEvent, useState } from "react";
import { encodeNip19 } from "@/utils";

export default function ExtractBech32() {
  const [error, setError] = useState<string | null>(null);
  const [npub, setNpub] = useState<string | null>(null);
  const [noteId, setNoteId] = useState<string | null>(null);
  const handleChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    if (!value) {
      setError(null);
      setNpub(null);
      setNoteId(null);
      return;
    }

    try {
      const event = JSON.parse(value);
      setNpub(encodeNip19("npub", event.pubkey));
      setNoteId(encodeNip19("note", event.id));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "40px auto",
        width: 600,
      }}
    >
      <textarea
        rows={20}
        placeholder="Paste Nostr event JSON here"
        onChange={handleChange}
      ></textarea>
      <div>
        {npub && (
          <p>
            <strong>Author npub:</strong> {npub}
          </p>
        )}
        {noteId && (
          <p>
            <strong>Note ID:</strong> {noteId}
          </p>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </main>
  );
}
