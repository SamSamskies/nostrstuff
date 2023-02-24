import { bech32 } from "bech32";

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
  try {
    const pool = new SimplePool();

    return await pool.get(relays, filter);
  } catch (error) {
    return error instanceof Error ? error.message : "Something went wrong :(";
  }
};

export const findEvent = async (relays: string[], eventId: string) =>
  findOneFromRelays(relays, {
    ids: [normalizeId(eventId)],
  });

export const encodeNpub = nip19.npubEncode;

export const makeNostrUri = (prefix: "npub" | "note", hexId: string) => {
  const addNostrPrefix = (nip19Id: string) => `nostr:${nip19Id}
  `;
  switch (prefix) {
    case "npub":
      return addNostrPrefix(nip19.npubEncode(hexId));
    case "note":
      return addNostrPrefix(nip19.noteEncode(hexId));
    default:
      return null;
  }
};
