import { bech32 } from "bech32";
import "websocket-polyfill";
import { DEFAULT_RELAYS } from "@/constants";

const { nip05, nip19, SimplePool } = require("nostr-tools");

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

const isHex = (str: string) => str.match(/^[0-9a-fA-F]+$/) !== null;

export const convertToHex = (bech32Value: string) => {
  const decoded = bech32.decode(bech32Value);

  return Buffer.from(bech32.fromWords(decoded.words)).toString("hex");
};

const normalizeId = (id: string) => (isHex(id) ? id : convertToHex(id));

const findOneFromRelays = async (relays: string[], filter: Filter) => {
  let pool;

  try {
    pool = new SimplePool();

    return await pool.get(relays, filter);
  } catch (error) {
    return error instanceof Error ? error.message : "Something went wrong :(";
  } finally {
    if (pool) {
      try {
        pool.close();
      } catch {
        // fail silently for errors that happen when closing the pool
      }
    }
  }
};

export const getUserProfile = (
  userId: string,
  relays: string[] = DEFAULT_RELAYS
) =>
  findOneFromRelays(Array.from(new Set(DEFAULT_RELAYS.concat(relays))), {
    authors: [normalizeId(userId)],
    kinds: [0],
  });

export const findEvent = (relays: string[], eventId: string) =>
  findOneFromRelays(relays, {
    ids: [normalizeId(eventId)],
  });

export const encodeNpub = nip19.npubEncode;

export const encodeNip19 = (prefix: "npub" | "note", hexId: string) => {
  switch (prefix) {
    case "npub":
      return encodeNpub(hexId);
    case "note":
      return nip19.noteEncode(hexId);
    default:
      return null;
  }
};

export const makeNostrUri = (prefix: "npub" | "note", hexId: string) => {
  const addNostrPrefix = (nip19Id: string) => `nostr:${nip19Id}`;

  switch (prefix) {
    case "npub":
      return addNostrPrefix(nip19.npubEncode(hexId));
    case "note":
      return addNostrPrefix(nip19.noteEncode(hexId));
    default:
      return null;
  }
};
