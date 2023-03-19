import { NextApiRequest, NextApiResponse } from "next";
import { getUserRelays } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, relays } = req.query;
  const normalizeRelays = () => {
    if (!relays) {
      return;
    }

    return (Array.isArray(relays) ? relays : relays.split(",")).map(
      decodeURIComponent
    );
  };
  const formatResult = (result: any) => {
    let relayData: { [key: string]: { read: boolean; write: boolean } };

    try {
      relayData = JSON.parse(result.content);
    } catch {
      return null;
    }

    return Object.keys(relayData).map((key) => ({
      relay: key,
      read: relayData[key].read,
      write: relayData[key].write,
    }));
  };

  switch (req.method) {
    case "GET":
      const result = await getUserRelays(userId as string, normalizeRelays());

      if (typeof result === "string") {
        console.error(result);
        res.status(500).end(result);
      } else if (result === null) {
        res.status(404).end();
      } else {
        res.status(200).json(formatResult(result));
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
