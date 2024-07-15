import { NextApiRequest, NextApiResponse } from "next";
import { decodeNip19, getMultipleUserProfiles } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const normalizeUserIds = (userId?: string | string[]) => {
    if (!userId) {
      return [];
    }

    return Array.isArray(userId) ? userId : [userId];
  };
  const normalizeRelays = (relays?: string | string[]) => {
    if (!relays) {
      return [];
    }

    return (Array.isArray(relays) ? relays : relays.split(",")).map(
      decodeURIComponent
    );
  };
  const normalizeUserIdsAndRelays = (userIds: string[], relays: string[]) => {
    const relaySet = new Set(relays);
    const data = userIds.map((userId) => {
      if (userId.startsWith("nprofile")) {
        const { data } = decodeNip19(userId);

        return {
          userId: data.pubkey,
          relays: data.relays,
        };
      }

      return { userId, relays: null };
    });

    data.forEach(({ relays }) => {
      if (relays) {
        relays.forEach((r: string) => relaySet.add(r));
      }
    });

    return {
      userIds: data.map(({ userId }) => userId),
      relays: Array.from(relaySet),
    };
  };

  switch (req.method) {
    case "GET":
      let result = null;

      try {
        const { userIds, relays } = normalizeUserIdsAndRelays(
          normalizeUserIds(req.query.userId),
          normalizeRelays(req.query.relays)
        );
        result = await getMultipleUserProfiles(userIds, relays);
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
