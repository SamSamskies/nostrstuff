import type { AppProps } from "next/app";
import { TerminalContextProvider } from "react-terminal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TerminalContextProvider>
      <Component {...pageProps} />
    </TerminalContextProvider>
  );
}
