import { encodeNpub } from "@/utils/nostr";

export const makeSnortUrl = (prefix: "npub" | "note", hexId: string) => {
  const baseUrl = "https://snort.social";
  const encodedId = encodeNpub(hexId);
  const urlMap = {
    npub: `${baseUrl}/p/${encodedId}`,
    note: `${baseUrl}/e/${encodedId}`,
  };

  return urlMap[prefix] || null;
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
    if (value) {
      urlObj.searchParams.append(key, value);
    }
  });

  return urlObj.toString();
};
