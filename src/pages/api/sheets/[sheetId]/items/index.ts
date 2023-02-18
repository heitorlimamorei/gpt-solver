import type { NextApiRequest, NextApiResponse } from "next";
import ItemService from "../../../../../backEnd/services/Item.service";

export default async function SheetIdRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sheetId: any = req.query.sheetId;
    const mode: "GET" | "POST" = req.body.mode;

    if (req.method === "POST") {
      if (mode === "GET") {
        res
          .status(200)
          .json(await ItemService.getItems(sheetId, req.body.email));
      } else if (mode === "POST") {
        res
          .status(200)
          .json(await ItemService.createItem(req.body.newItem, req.body.email));
      }
    }
    if (req.method === "PUT") {
      res
        .status(200)
        .json(await ItemService.updateItem(req.body.item, req.body.email));
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
