import "websocket-polyfill";

import { SimplePool, nip05, nip19 } from "nostr-tools";

import { bech32 } from "bech32";

const pool = new SimplePool();
type Filter = {
  ids?: string[];
  kinds?: number[];
  authors?: string[];
  since?: number;
  until?: number;
  limit?: number;
  [key: `#${string}`]: string[];
};

export interface Nip05QueryResult {
  pubkey: string;
  relays?: string[];
}

export const queryNip05 = nip05.queryProfile;

const isHex = (str: string) => /^[0-9a-fA-F]+$/.test(str);

export const convertToHex = (bech32Value: string) => {
  const decoded = bech32.decode(bech32Value);

  return Buffer.from(bech32.fromWords(decoded.words)).toString("hex");
};

const normalizeId = (id: string) => (isHex(id) ? id : convertToHex(id));

export const getUserProfile = (
  userId: string,
  relays: string[] = ["wss://relay.damus.io", "wss://relay.snort.social"]
) =>
  pool.get(relays ?? ["wss://relay.damus.io", "wss://relay.snort.social"], {
    authors: [normalizeId(userId)],
    kinds: [0],
  });

export const findEvent = (relays: string[], eventId: string) =>
  pool.get(relays, {
    ids: [normalizeId(eventId)],
  });

export const encodeNpub = nip19.npubEncode;

export const encodeNip19 = (prefix: "npub" | "note", hexId: string) =>
  prefix === "npub"
    ? nip19.npubEncode(hexId)
    : prefix === "note"
    ? nip19.noteEncode(hexId)
    : null;

export const makeNostrUri = (prefix: "npub" | "note", hexId: string) =>
  `nostr:${
    prefix === "npub"
      ? nip19.npubEncode(hexId)
      : prefix === "note"
      ? nip19.noteEncode(hexId)
      : null
  }`;
