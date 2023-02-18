import Head from "next/head";
import { ReactTerminal } from "react-terminal";
import { WelcomeMessage } from "@/components";
import { useCommands, useIsHydrated } from "@/hooks";

export default function Home() {
  const commands = useCommands();
  const hasHydrated = useIsHydrated();

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
