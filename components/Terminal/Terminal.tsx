import { HelpMenu, RelayInfo, WelcomeMessage, WhoIs } from "@/components";
import { convertToHex, encodeNip19, findEvent, queryNip05 } from "@/utils";

import { ExternalLink } from "@/components/ExternalLink";
import { GitHubRepoLink } from "@/components/Terminal/GitHubRepoLink";
import { NostrUriLink } from "@/components/NostrUriLink";
import { ReactTerminal } from "react-terminal";
import { SnortLink } from "@/components/SnortLink";
import { THEMES } from "@/constants";
import { makeUrlWithParams } from "@/utils";
import useLocalStorage from "use-local-storage";

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

      const result = await findEvent([relayUri], eventId);

      if (result === null) {
        return <p>Not found!</p>;
      }

      return typeof result === "string" ? (
        result
      ) : (
        <>
          <p>{`Found it!`}</p>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          {result.kind === 1 && (
            <>
              <SnortLink kind={1} hexId={result.id} />
              <NostrUriLink kind={1} hexId={result.id} />
            </>
          )}
          <SnortLink kind={0} hexId={result.pubkey} />
          <NostrUriLink kind={0} hexId={result.pubkey} />
        </>
      );
    },

    fu: async (input: string) => {
      const [userId, relays] = input.trim().split(" ");

      if (!userId) {
        return "Missing user id.";
      }

      const response = await fetch(
        makeUrlWithParams(`${window.location.href}/api/users/${userId}`, {
          relays,
        })
      );

      if (response.status === 200) {
        const event = await response.json();
        let content;

        try {
          content = JSON.parse(event.content);
        } catch {}

        return (
          <>
            <div>
              Raw event:
              <pre>{JSON.stringify(event, null, 2)}</pre>
            </div>
            {content && (
              <>
                <div>Parsed content:</div>
                <pre>{JSON.stringify(content, null, 2)}</pre>
              </>
            )}
          </>
        );
      }

      if (response.status === 404) {
        return "Not found!";
      }

      if (response.status === 500) {
        return await response.text();
      }

      return "Something went wrong. Try again later. :(";
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

    encode: (input: string) => {
      const [prefix, hexId] = input.trim().split(" ");

      if (prefix !== "npub" && prefix !== "note") {
        return `${prefix} prefix is not supported. Currently only npub and note prefixes are supported.`;
      }

      if (!hexId) {
        return "Please provide hex value.";
      }

      try {
        return <p>{encodeNip19(prefix, hexId)}</p>;
      } catch (error) {
        return error instanceof Error
          ? error.message
          : "Something went wrong :(";
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

    theme: (theme: string) => {
      if (!THEMES.includes(theme)) {
        return <p>{`${theme} is not a valid theme.`}</p>;
      }

      setTheme(theme);
    },
  };

  return (
    <>
      <GitHubRepoLink color={theme === "light" ? "black" : "white"} />
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
