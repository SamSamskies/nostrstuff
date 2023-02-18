import { getSnortUrl, isValidUrl } from "@/utils";
import { ExternalLink } from "@/components/ExternalLink";

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
        <ExternalLink href={nostrWatchUrl}>{nostrWatchUrl}</ExternalLink>
      </p>
      <p>
        View relay maintainer&apos;s profile on Snort{" "}
        <ExternalLink href={snortProfileUrl}>{snortProfileUrl}</ExternalLink>
      </p>
      {isValidUrl(softwareUrl) && (
        <p>
          Check out the code{" "}
          <ExternalLink href={softwareUrl}>{softwareUrl}</ExternalLink>
        </p>
      )}
      {isValidUrl(paymentsUrl) && (
        <p>
          Make a payment for the relay{" "}
          <ExternalLink href={paymentsUrl}>{paymentsUrl}</ExternalLink>
        </p>
      )}
    </>
  );
};
