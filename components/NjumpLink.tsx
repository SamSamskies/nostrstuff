import { ExternalLink } from "@/components/ExternalLink";
import { makeNjumpUrl } from "@/utils";

export const NjumpLink = ({ hexId, kind }: { hexId: string; kind: number }) => {
  if (kind === 0) {
    const url = makeNjumpUrl("npub", hexId);

    return url ? (
      <p>
        View author profile on Njump{" "}
        <ExternalLink href={url}>{url}</ExternalLink>
      </p>
    ) : null;
  }

  if (kind === 1) {
    const url = makeNjumpUrl("note", hexId);

    return url ? (
      <p>
        View note on Njump <ExternalLink href={url}>{url}</ExternalLink>
      </p>
    ) : null;
  }

  return null;
};
