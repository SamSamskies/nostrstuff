import Head from "next/head";
import { ReactTerminal } from "react-terminal";
import { useState, useEffect } from "react";
import { queryNip05, getSnortUrl, isValidUrl } from "@/utils";
import { WelcomeMessage } from "@/components";

export default function Home() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const commands = {
    help: (
      <div>
        <p>
          <strong>ri &lt;RELAY_DOMAIN&gt;</strong> - Retrieves info about a
          nostr relay if the relay supports{" "}
          <a
            href="https://github.com/nostr-protocol/nips/blob/master/11.md"
            target="_blank"
            rel="noreferrer"
          >
            nip-11
          </a>
          .
        </p>
        <p>
          <strong>whois &lt;NIP05_ADDRESS&gt;</strong> - Retrieves link to
          user&apos;s profile on Snort and their preferred relays.
        </p>
        <p>
          <strong>wtf</strong> - Type this if you are confused af.
        </p>
        <p>
          <strong>clear</strong> - Clears the console.
        </p>
      </div>
    ),

    ri: async (domain: string) => {
      const response = await fetch(`/api/relay-info?domain=${domain}`);
      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        const relayInfo = await response.json();
        const snortProfileUrl = getSnortUrl(relayInfo.pubkey);
        const softwareUrl = relayInfo.software
          ? relayInfo.software.replace(/^.*?(http)/, "$1")
          : null;
        const paymentsUrl = relayInfo.payments_url;
        const nostrWatchUrl = `https://nostr.watch/relay/${domain}`;

        return (
          <div>
            <pre>{JSON.stringify(relayInfo, null, 2)}</pre>
            <p>
              View relay stats on nostr.watch{" "}
              <a href={nostrWatchUrl} target="_blank" rel="noreferrer">
                {nostrWatchUrl}
              </a>
            </p>
            <p>
              View relay maintainer&apos;s profile on Snort{" "}
              <a href={snortProfileUrl} target="_blank" rel="noreferrer">
                {snortProfileUrl}
              </a>
            </p>
            {isValidUrl(softwareUrl) && (
              <p>
                Check out the code{" "}
                <a href={softwareUrl} target="_blank" rel="noreferrer">
                  {softwareUrl}
                </a>
              </p>
            )}
            {isValidUrl(paymentsUrl) && (
              <p>
                Make a payment for the relay{" "}
                <a href={paymentsUrl} target="_blank" rel="noreferrer">
                  {paymentsUrl}
                </a>
              </p>
            )}
          </div>
        );
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

        const snortProfileUrl = getSnortUrl(pubkey);

        return (
          <div>
            <p>
              View profile on Snort{" "}
              <a href={snortProfileUrl} target="_blank" rel="noreferrer">
                {snortProfileUrl}
              </a>
            </p>
            {Number(relays?.length) > 0 && (
              <p>
                Preferred relays:{" "}
                {relays?.map((r, index) => {
                  const nostrWatchUrl = `https://nostr.watch/relay/${r.replace(
                    "wss://",
                    ""
                  )}`;
                  const isLast = index === relays.length - 1;

                  return (
                    <>
                      <a
                        key={nostrWatchUrl}
                        href={nostrWatchUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {r}
                      </a>
                      {!isLast && <span>, </span>}
                    </>
                  );
                })}
              </p>
            )}
          </div>
        );
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
  };

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return (
    <>
      <Head>
        <title>Nostr Stuff</title>
        <meta name="description" content="Nostr stuff yo!" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ height: "calc(100vh - 16px)" }}>
        {hasHydrated && (
          <ReactTerminal
            welcomeMessage={<WelcomeMessage />}
            commands={commands}
            enableInput
            defaultHandler={() => `Invalid command.`}
          />
        )}
      </main>
    </>
  );
}
