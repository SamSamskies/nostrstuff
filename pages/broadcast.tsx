import { type FormEvent, useState, useRef } from "react";
import { publishEvent } from "@/utils";

export default function Broadcast() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const relayRef = useRef<HTMLInputElement>(null);
  const eventRef = useRef<HTMLTextAreaElement>(null);
  const handleSumbit = async (e: FormEvent) => {
    e.preventDefault();
    setIsBroadcasting(true);

    try {
      const relay = relayRef.current?.value.trim()!;
      const event = JSON.parse(eventRef.current?.value.trim()!);
      const pub = await publishEvent([relay], event);

      pub.on("ok", () => {
        setSuccess(`${relay} has accepted our event`);
      });
      pub.on("failed", (reason: string) => {
        setError(`failed to publish to ${relay}: ${reason}`);
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsBroadcasting(false);
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
      <form onSubmit={handleSumbit}>
        <input
          ref={relayRef}
          placeholder="relay e.g. wss://relay.nostr.band"
          style={{ padding: 8, margin: "8px 0" }}
          required
        />
        <textarea
          ref={eventRef}
          rows={20}
          placeholder="Paste Nostr event JSON here"
          required
        ></textarea>
        <button
          type="submit"
          style={{ marginTop: 8 }}
          disabled={isBroadcasting}
        >
          Broadcast
        </button>
      </form>
      {success && <p>{success}</p>}
      {error && <p className="error">{error}</p>}
    </main>
  );
}
