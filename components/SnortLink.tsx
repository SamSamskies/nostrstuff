import { ExternalLink } from "@/components/ExternalLink";
import { makeSnortUrl } from "@/utils";

export const SnortLink = ({ hexId, kind }: { hexId: string; kind: number }) => {
  if (kind === 0) {
    const snortProfileUrl = makeSnortUrl("npub", hexId);

    return snortProfileUrl ? (
      <p>
        View author profile on Snort{" "}
        <ExternalLink href={snortProfileUrl}>{snortProfileUrl}</ExternalLink>
      </p>
    ) : null;
  }

  if (kind === 1) {
    const snortProfileUrl = makeSnortUrl("note", hexId);

    return snortProfileUrl ? (
      <p>
        View note on Snort{" "}
        <ExternalLink href={snortProfileUrl}>{snortProfileUrl}</ExternalLink>
      </p>
    ) : null;
  }

  return null;
};
