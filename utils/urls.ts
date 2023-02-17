export const getSnortUrl = (pubkey: string) =>
  `https://snort.social/p/${pubkey}`;

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
