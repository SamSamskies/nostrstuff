import { bech32 } from "bech32";

const { nip05, nip19, relayInit } = require("nostr-tools");

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

const normalizeEventId = (eventId: string) =>
  isHex(eventId) ? eventId : convertToHex(eventId);

export const checkRelayForEvent = async (relayUri: string, eventId: string) => {
  try {
    const relay = relayInit(relayUri);

    await relay.connect();

    relay.on("error", () => {
      return `Failed to connect to ${relay.url}`;
    });

    const event = await relay.get({
      ids: [normalizeEventId(eventId)],
    });

    relay.close();

    return event;
  } catch (error) {
    return error instanceof Error ? error.message : "Something went wrong :(";
  }
};

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
