import type { NextApiRequest, NextApiResponse } from "next";
import magicLinkController from "../../../../backEnd/controller/magicLink.controller";

export default async function SheetRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: any = req.query.id;
  const formData:any = req.body;
    try {
    if (req.method === "GET") {
      res.status(200).json(await magicLinkController.getMagicLinkById(id));
    } else if (req.method === "POST") {
      res.status(200).json(await magicLinkController.deleteLinkAndReturnList(id, formData.sheetId));
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
