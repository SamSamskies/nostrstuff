import { encodeNip19, encodeNpub } from "@/utils/nostr";

export const makeNjumpUrl = (prefix: "npub" | "note", hexId: string) => {
  const baseUrl = "https://njump.me";

  try {
    return ["npub", "note"].includes(prefix)
      ? `${baseUrl}/${encodeNip19(prefix, hexId)}`
      : null;
  } catch {
    return null;
  }
};

export const isValidUrl = (url: string = "") => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const makeUrlWithParams = (
  url: string,
  params: Record<string, string>
) => {
  const urlObj = new URL(url);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      urlObj.searchParams.append(key, value);
    }
  });

  return urlObj.toString();
};
