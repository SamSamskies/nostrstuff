import Head from "next/head";
import { ReactTerminal } from "react-terminal";

export default function Home() {
  const welcomeMessage = (
    <div>
      <p>Welcome to Nostr Stuff 🤙</p>
      <p>Type &quot;help&quot; for all available commands.</p>
      <p>
        Example command:
        <code
          style={{
            background: "#50a",
            color: "#f5f",
            marginLeft: 8,
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
          nostr relay if the relay supports nip-11.
        </p>
        <p>
          <strong>clear</strong> - clears the console.
        </p>
      </div>
    ),

    ri: async (domain: string) => {
      const response = await fetch(`/api/relay-info?domain=${domain}`);

      return <pre>{await response.text()}</pre>;
    },
  };

  return (
    <>
      <Head>
        <title>Nostr Stuff</title>
        <meta name="description" content="Nostr stuff yo!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <ReactTerminal welcomeMessage={welcomeMessage} commands={commands} />
      </main>
    </>
  );
}
