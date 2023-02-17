import type { AppProps } from "next/app";
import { TerminalContextProvider } from "react-terminal";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TerminalContextProvider>
        <Component {...pageProps} />
      </TerminalContextProvider>
      <Analytics />
    </>
  );
}
