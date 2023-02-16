import Head from "next/head";
import { ReactTerminal } from "react-terminal";
import { useState, useEffect, type ReactNode } from "react";

async function queryProfile(fullname: string): Promise<{
  pubkey: string; // hex
  relays?: string[];
} | null> {
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
}

const ExampleCommand = ({ children }: { children: ReactNode }) => {
  return (
    <p style={{ margin: "4px 0" }}>
      <code
        style={{
          background: "#50a",
          color: "#f5f",
          padding: "0 8px",
        }}
      >
        {children}
      </code>
    </p>
  );
};

export default function Home() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const welcomeMessage = (
    <div style={{ marginBottom: 16 }}>
      <p>Welcome to Nostr Stuff 🤙</p>
      <p>Type &quot;help&quot; for all available commands.</p>
      <div>
        Example commands:
        <ExampleCommand>ri eden.nostr.land</ExampleCommand>
        <ExampleCommand>whois samsamskies@nostrplebs.com</ExampleCommand>
      </div>
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
          <strong>whois &lt;NIP-05&gt;</strong> - Retrieves link to user&apos;s
          profile on Snort.
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

    whois: async (nip05: string) => {
      try {
        const result = await queryProfile(nip05);
        const pubkey = result?.pubkey;

        if (!pubkey) {
          throw new Error("User not found");
        }

        const snortProfileUrl = `https://snort.social/p/${pubkey}`;

        return (
          <p>
            View profile on Snort{" "}
            <a href={snortProfileUrl} target="_blank" rel="noreferrer">
              {snortProfileUrl}
            </a>
          </p>
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
            welcomeMessage={welcomeMessage}
            commands={commands}
            enableInput
          />
        )}
      </main>
    </>
  );
}
