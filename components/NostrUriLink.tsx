import { ExternalLink } from "@/components/ExternalLink";
import { makeNostrUri } from "@/utils";

export const NostrUriLink = ({
  hexId,
  kind,
}: {
  hexId: string;
  kind: number;
}) => {
  const nostrUri = makeNostrUri(kind === 0 ? "npub" : "note", hexId);

  return nostrUri ? (
    <p>
      View {kind === 0 ? "author profile" : "note"} on mobile or desktop Nostr
      app <ExternalLink href={nostrUri}>{nostrUri}</ExternalLink>
    </p>
  ) : null;
};
