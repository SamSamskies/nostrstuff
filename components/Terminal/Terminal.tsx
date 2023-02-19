import { HelpMenu, RelayInfo, WelcomeMessage, WhoIs } from "@/components";
import { queryNip05 } from "@/utils";
import { ReactTerminal } from "react-terminal";
import { ExternalLink } from "@/components/ExternalLink";
import { makeUrlWithParams } from "@/utils";

export const Terminal = () => {
  const commands = {
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

    donate: async (input: string) => {
      const [_, amount, comment] = input.match(/^(\d+)\s*(.*)$/) ?? [];
      const normalizedAmount = Number(amount);

      if (isNaN(normalizedAmount) || normalizedAmount < 100) {
        return "Invalid amount. Minimum donation is 100 sats.";
      }

      try {
        const url = makeUrlWithParams("https://lnurlpay.com/api/invoice", {
          amount: normalizedAmount.toString(),
          lnUrlOrAddress: "samsamskies@strike.army",
          comment: comment
            ? comment.trim().replace(/^["']|["']$/g, "")
            : "nostrstuff donation",
        });
        const response = await fetch(url);

        return <p>{await response.text()}</p>;
      } catch (error) {
        return "Error generating invoice";
      }
    },

    wtf: () => {
      return (
        <p>
          <ExternalLink href="https://nostr.how/">
            Click here to go to nostr.how to learn more about nostr.
          </ExternalLink>
        </p>
      );
    },
  };

  return (
    <ReactTerminal
      welcomeMessage={<WelcomeMessage />}
      commands={commands}
      enableInput
      defaultHandler={() => `Invalid command.`}
    />
  );
};
