import { getSnortUrl, Nip05QueryResult } from "@/utils";
import { ExternalLink } from "@/components/ExternalLink";

export const WhoIs = ({ pubkey, relays }: Nip05QueryResult) => {
  const snortProfileUrl = getSnortUrl(pubkey);

  return (
    <>
      <p>
        View profile on Snort{" "}
        <ExternalLink href={snortProfileUrl}>{snortProfileUrl}</ExternalLink>
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
    </>
  );
};
