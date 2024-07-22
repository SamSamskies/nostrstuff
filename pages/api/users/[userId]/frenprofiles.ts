import { NextApiRequest, NextApiResponse } from "next";
import {
  decodeNip19,
  getFollowList,
  Event,
  getMultipleUserProfiles,
} from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const normalizeRelays = (relays?: string | string[]) => {
    if (!relays) {
      return [];
    }

    return (Array.isArray(relays) ? relays : relays.split(",")).map(
      decodeURIComponent
    );
  };
  const normalizeUserIdAndRelays = (
    userId?: string | string[],
    relays?: string | string[]
  ) => {
    if (!userId || Array.isArray(userId)) {
      throw new Error("There must be one and only one userId.");
    }

    const normalizedRelays = normalizeRelays(relays);

    if (userId.startsWith("nprofile")) {
      const { data } = decodeNip19(userId);

      return {
        userId: data.pubkey,
        relays: [...data.relays, ...normalizedRelays],
      };
    }

    return { userId, relays: normalizedRelays };
  };
  const extractFollowPubkeys = (event: Event) =>
    event.tags.filter((t) => t[0] === "p").map((t) => t[1]);

  switch (req.method) {
    case "GET":
      let result = null;

      try {
        const { userId, relays } = normalizeUserIdAndRelays(
          req.query.userId,
          req.query.relays
        );
        const followListEvent = await getFollowList(userId, relays);

        result = await getMultipleUserProfiles(
          extractFollowPubkeys(followListEvent),
          relays
        );
      } catch (err) {
        result = err instanceof Error ? err.message : "Something went wrong :(";
      }

      if (typeof result === "string") {
        console.error(result);
        res.status(500).end(result);
      } else if (result === null) {
        res.status(404).end();
      } else {
        res.status(200).json(result);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
