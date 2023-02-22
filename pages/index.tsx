import Head from "next/head";
import { Terminal } from "@/components";
import { useIsHydrated } from "@/hooks";
import Image from "next/image";
import { ExternalLink } from "@/components/ExternalLink";

export default function Home() {
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
        <ExternalLink
          href="https://github.com/SamSamskies/nostrstuff"
          style={{ position: "fixed", right: 16, top: 12, zIndex: 1 }}
        >
          <Image
            src="/github-mark.png"
            width={16}
            height={16}
            alt="GitHub logo"
          />
        </ExternalLink>
        {hasHydrated && <Terminal />}
      </main>
    </>
  );
}
