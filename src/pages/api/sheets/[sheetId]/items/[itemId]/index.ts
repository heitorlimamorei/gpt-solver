import type { NextApiRequest, NextApiResponse } from "next";
import ItemService from "../../../../../../backEnd/services/Item.service";
export default async function SheetIdRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sheetId: any = req.query.sheetId;
    const itemId: any = req.query.itemId;
    const mode: "GET" | "DELETE" = req.body.mode;
    if (req.method === "POST") {
      if (mode === "GET") {
        res.status(200).json(await ItemService.getItemById(sheetId, itemId));
      } else if (mode === "DELETE") {
        res
          .status(200)
          .json(await ItemService.deleteItem(itemId, sheetId, req.body.email));
      }
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
