import { NextApiRequest, NextApiResponse } from "next";
import { decodeNip19, findEvent } from "@/utils";
import { DEFAULT_RELAYS } from "@/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { noteId } = req.query;
  let decodedNoteId;
  const badNoteIdMessage =
    "note id must be a valid nip-19 note string or valid nip-19 nevent string";

  try {
    decodedNoteId = decodeNip19(noteId);
  } catch (error) {
    res.status(400).end(badNoteIdMessage);
  }

  const { type, data } = decodedNoteId;

  if (type !== "note" && type !== "nevent") {
    res.status(400).end(badNoteIdMessage);
  }

  const relays =
    data.relays && data.relays.length > 0
      ? [...DEFAULT_RELAYS, ...data.relays]
      : DEFAULT_RELAYS;
  const eventId = type === "note" ? data : data.id;

  switch (req.method) {
    case "GET":
      const result = await findEvent(relays, eventId);

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
