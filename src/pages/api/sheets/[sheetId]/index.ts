import type { NextApiRequest, NextApiResponse } from "next";
import sheetController from "../../../../backEnd/controller/sheet.controller";

export default async function SheetIdRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sheetId: any = req.query.sheetId;
    const mode: "GET" | "DELETE" = req.body.mode;
    if (req.method === "POST") {
      if (mode === "GET") {
        res
          .status(200)
          .json(await sheetController.getById(sheetId, req.body.email));
      } else if (mode === "DELETE") {
        res
          .status(200)
          .json(await sheetController.deleteSheet(sheetId, req.body.email));
      } else {
        res.status(405).send("MODE NOT ALLOWED");
      }
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
