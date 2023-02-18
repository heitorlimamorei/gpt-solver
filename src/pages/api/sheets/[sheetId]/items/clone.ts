import type { NextApiRequest, NextApiResponse } from "next";
import ItemService from "../../../../../backEnd/services/Item.service";

export default async function SheetIdRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sheetId:any = req.query.sheetId;
    if (req.method === "POST") {
      res
        .status(200)
        .json(
          await ItemService.cloneItemsFromForeignSheet(req.body.foreignId,sheetId,req.body.email)
        );
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
