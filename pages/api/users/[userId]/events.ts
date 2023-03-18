import { NextApiRequest, NextApiResponse } from "next";
import { getUserNoosts } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, relays, limit } = req.query;
  const normalizeRelays = () => {
    if (!relays) {
      return;
    }

    return (Array.isArray(relays) ? relays : relays.split(",")).map(
      decodeURIComponent
    );
  };
  const normalizeLimit = () => (limit ? Number(limit) : undefined);

  switch (req.method) {
    case "GET":
      const result = await getUserNoosts(
        userId as string,
        normalizeRelays(),
        normalizeLimit()
      );

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
