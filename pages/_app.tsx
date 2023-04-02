import type { AppProps } from "next/app";
import { TerminalContextProvider } from "react-terminal";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/global.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
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
      <TerminalContextProvider>
        <Component {...pageProps} />
      </TerminalContextProvider>
      <Analytics />
    </>
  );
}
