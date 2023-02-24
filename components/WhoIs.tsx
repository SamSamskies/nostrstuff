import { Nip05QueryResult } from "@/utils";
import { SnortLink } from "@/components/SnortLink";
import { Fragment } from "react";

export const WhoIs = ({ pubkey, relays }: Nip05QueryResult) => {
  return (
    <>
      <SnortLink kind={0} hexId={pubkey} />
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
              <Fragment key={nostrWatchUrl}>
                <a href={nostrWatchUrl} target="_blank" rel="noreferrer">
                  {r}
                </a>
                {!isLast && <span>, </span>}
              </Fragment>
            );
          })}
        </p>
      )}
    </>
  );
};
