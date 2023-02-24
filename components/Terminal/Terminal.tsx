import { HelpMenu, RelayInfo, WelcomeMessage, WhoIs } from "@/components";
import { checkRelayForEvent, convertToHex, queryNip05 } from "@/utils";
import { ReactTerminal } from "react-terminal";
import { ExternalLink } from "@/components/ExternalLink";
import { makeUrlWithParams } from "@/utils";
import useLocalStorage from "use-local-storage";
import { THEMES } from "@/constants";
import { GitHubRepoLink } from "@/components/Terminal/GitHubRepoLink";
import { SnortLink } from "@/components/SnortLink";
import { NostrUriLink } from "@/components/NostrUriLink";

export const Terminal = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");
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

    fe: async (input: string) => {
      const [relayUri, eventId] = input.trim().split(" ");

      if (!eventId) {
        return "Missing event id.";
      }

      if (!relayUri) {
        return "Missing relay domain.";
      }

      const result = await checkRelayForEvent(relayUri, eventId);

      if (result === null) {
        return <p>Not found!</p>;
      }

      return typeof result === "string" ? (
        result
      ) : (
        <>
          <p>{`Found it!`}</p>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          {result.kind === 1 && <SnortLink kind={1} hexId={result.id} />}
          {result.kind === 1 && <NostrUriLink kind={1} hexId={result.id} />}
          <SnortLink kind={0} hexId={result.pubkey} />
          <NostrUriLink kind={0} hexId={result.pubkey} />
        </>
      );
    },

    convert: (bech32Value: string) => {
      let result;

      try {
        result = convertToHex(bech32Value);
      } catch (error) {
        result =
          error instanceof Error ? error.message : "Something went wrong :(";
      }

      return <p>{result}</p>;
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

    theme: (theme: string) => {
      if (!THEMES.includes(theme)) {
        return <p>{`${theme} is not a valid theme.`}</p>;
      }

      setTheme(theme);
    },
  };

  return (
    <>
      <GitHubRepoLink
        color={["light", "dracula"].includes(theme) ? "black" : "white"}
      />
      <ReactTerminal
        welcomeMessage={<WelcomeMessage />}
        commands={commands}
        enableInput
        defaultHandler={() => `Invalid command.`}
        theme={theme}
      />
    </>
  );
};
