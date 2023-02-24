import { encodeNpub } from "@/utils/nostr";

export const makeSnortUrl = (prefix: "npub" | "note", hexId: string) => {
  const baseUrl = "https://snort.social";

  switch (prefix) {
    case "npub":
      return `${baseUrl}/p/${encodeNpub(hexId)}`;
    case "note":
      return `${baseUrl}/e/${encodeNpub(hexId)}`;
    default:
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

  Object.entries(params).forEach(([key, value]) =>
    urlObj.searchParams.append(key, value)
  );

  return urlObj.toString();
};
