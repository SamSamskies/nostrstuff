import { HelpMenu, RelayInfo, WhoIs } from "@/components";
import { queryNip05 } from "@/utils";

export const useCommands = () => ({
  help: <HelpMenu />,

  ri: async (domain: string) => {
    const response = await fetch(`/api/relay-info?domain=${domain}`);
    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      const relayInfo = await response.json();

      return <RelayInfo domain={domain} relayInfo={relayInfo} />;
    } else {
      return await response.text();
    }
  },

  whois: async (nip05: string) => {
    try {
      const result = await queryNip05(nip05);
      const pubkey = result?.pubkey;
      const relays = result?.relays;

      if (!pubkey) {
        throw new Error("User not found");
      }

      return <WhoIs pubkey={pubkey} relays={relays} />;
    } catch (error) {
      return "User not found";
    }
  },

  wtf: () => {
    return (
      <p>
        <a href="https://nostr.how/" target="_blank" rel="noreferrer">
          Click here to go to nostr.how to learn more about nostr.
        </a>
      </p>
    );
  },
});
