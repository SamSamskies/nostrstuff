import { NextApiRequest, NextApiResponse } from "next";
import { getMultipleUserProfile } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, relays } = req.query;
  const normalizeUserIds = () => {
    if (!userId) {
      return;
    }

    return Array.isArray(userId) ? userId : [userId];
  };
  const normalizeRelays = () => {
    if (!relays) {
      return;
    }

    return (Array.isArray(relays) ? relays : relays.split(",")).map(
      decodeURIComponent
    );
  };

  switch (req.method) {
    case "GET":
      const userIds = normalizeUserIds();

      if (!userIds) {
        return res.status(404).end();
      }

      const result = await getMultipleUserProfile(userIds, normalizeRelays());

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
