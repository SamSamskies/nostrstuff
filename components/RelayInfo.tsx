import { getSnortUrl, isValidUrl } from "@/utils";

interface RelayInfoProps {
  domain: string;
  relayInfo: {
    pubkey: string;
    software: string;
    payments_url?: string;
    [key: string]: any;
  };
}

export const RelayInfo = ({ domain, relayInfo }: RelayInfoProps) => {
  const snortProfileUrl = getSnortUrl(relayInfo.pubkey);
  const softwareUrl = relayInfo.software
    ? relayInfo.software.replace(/^.*?(http)/, "$1")
    : "";
  const paymentsUrl = relayInfo.payments_url;
  const nostrWatchUrl = `https://nostr.watch/relay/${domain}`;

  return (
    <>
      <pre>{JSON.stringify(relayInfo, null, 2)}</pre>
      <p>
        View relay stats on nostr.watch{" "}
        <a href={nostrWatchUrl} target="_blank" rel="noreferrer">
          {nostrWatchUrl}
        </a>
      </p>
      <p>
        View relay maintainer&apos;s profile on Snort{" "}
        <a href={snortProfileUrl} target="_blank" rel="noreferrer">
          {snortProfileUrl}
        </a>
      </p>
      {isValidUrl(softwareUrl) && (
        <p>
          Check out the code{" "}
          <a href={softwareUrl} target="_blank" rel="noreferrer">
            {softwareUrl}
          </a>
        </p>
      )}
      {isValidUrl(paymentsUrl) && (
        <p>
          Make a payment for the relay{" "}
          <a href={paymentsUrl} target="_blank" rel="noreferrer">
            {paymentsUrl}
          </a>
        </p>
      )}
    </>
  );
};
