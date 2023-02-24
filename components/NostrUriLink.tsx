import { ExternalLink } from "@/components/ExternalLink";
import { makeNostrUri } from "@/utils";

export const NostrUriLink = ({
  hexId,
  kind,
}: {
  hexId: string;
  kind: number;
}) => {
  if (kind === 0) {
    const nostrUri = makeNostrUri("npub", hexId);

    return nostrUri ? (
      <p>
        View author profile on mobile or desktop Nostr app{" "}
        <ExternalLink href={nostrUri}>{nostrUri}</ExternalLink>
      </p>
    ) : null;
  }

  if (kind === 1) {
    const nostrUri = makeNostrUri("note", hexId);

    return nostrUri ? (
      <p>
        View note on mobile or desktop Nostr app{" "}
        <ExternalLink href={nostrUri}>{nostrUri}</ExternalLink>
      </p>
    ) : null;
  }

  return null;
};
