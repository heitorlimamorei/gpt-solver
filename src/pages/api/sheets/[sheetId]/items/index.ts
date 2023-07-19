import type { NextApiRequest, NextApiResponse } from "next";
import ItemService from "../../../../../backEnd/services/Item.service";
import ItemController from "../../../../../backEnd/controller/itemController"
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
        await ItemController.createNewItem(req.body.newItem, req.body.email)
        res
          .status(200)
          .json({ status: "OK" })
      }
    }
    if (req.method === "PUT") {
      await ItemController.updateItem(req.body.item, req.body.email)
      res
        .status(200)
        .json({ status: "OK" })
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
