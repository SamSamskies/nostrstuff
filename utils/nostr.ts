/**
 * Copy pasta from nostr-tools
 * https://github.com/nbd-wtf/nostr-tools
 */

export const queryNip05 = async (
  fullname: string
): Promise<{
  pubkey: string; // hex
  relays?: string[];
} | null> => {
  let [name, domain] = fullname.split("@");

  if (!domain) {
    // if there is no @, it is because it is just a domain, so assume the name is "_"
    domain = name;
    name = "_";
  }

  if (!name.match(/^[A-Za-z0-9-_]+$/)) return null;

  let res = await (
    await fetch(`https://${domain}/.well-known/nostr.json?name=${name}`)
  ).json();

  if (!res?.names?.[name]) return null;

  let pubkey = res.names[name] as string;
  let relays = (res.relays?.[pubkey] || []) as string[]; // nip35

  return {
    pubkey,
    relays,
  };
};
