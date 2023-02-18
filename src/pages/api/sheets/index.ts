import type { NextApiRequest, NextApiResponse } from "next";
import sheetService from "../../../backEnd/services/sheet.service";
import sheetController from "../../../backEnd/controller/sheet.controller";

export default async function SheetRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      res.status(200).json(await sheetService.getAllSheets());
    }
    if (req.method === "POST") {
      res.status(200).json(await sheetController.createSheet(req.body));
    }
    if(req.method === "PUT") {
      let sheet = req.body
      res.status(200).json(await sheetController.updateSheet(sheet, sheet.email));
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
