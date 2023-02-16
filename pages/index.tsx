import Head from "next/head";
import { ReactTerminal } from "react-terminal";
import { useState, useEffect } from "react";

export default function Home() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const welcomeMessage = (
    <div>
      <p>Welcome to Nostr Stuff 🤙</p>
      <p>Type &quot;help&quot; for all available commands.</p>
      <p>
        Example command:
        <br />
        <code
          style={{
            background: "#50a",
            color: "#f5f",
          }}
        >
          ri eden.nostr.land
        </code>
      </p>
    </div>
  );
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
          <strong>wtf</strong> - Type this if you are confused af.
        </p>
        <p>
          <strong>clear</strong> - Clears the console.
        </p>
      </div>
    ),

    ri: async (domain: string) => {
      const response = await fetch(`/api/relay-info?domain=${domain}`);

      return <pre>{await response.text()}</pre>;
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
            welcomeMessage={welcomeMessage}
            commands={commands}
            enableInput
          />
        )}
      </main>
    </>
  );
}
