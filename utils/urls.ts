export const getSnortUrl = (pubkey: string) =>
  `https://snort.social/p/${pubkey}`;

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
