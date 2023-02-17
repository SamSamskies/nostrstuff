import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const uri = `https://${req.query.domain}`;

      try {
        const response = await fetch(uri, {
          headers: {
            Accept: "application/nostr+json",
          },
        });
        const contentType = response.headers.get("Content-Type");

        if (
          contentType &&
          (contentType.includes("application/json") ||
            contentType.includes("application/nostr+json"))
        ) {
          if (response.ok) {
            res.status(response.status).json(await response.json());
          } else {
            res.status(response.status).end(`Error: ${response.statusText}`);
          }
        } else {
          res.status(response.status).end(`nip-11 not supported for ${uri}`);
        }
      } catch (error) {
        res.status(500).end("Something went wrong :(");
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
