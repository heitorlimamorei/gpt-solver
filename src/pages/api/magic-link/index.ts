import type { NextApiRequest, NextApiResponse } from "next";
import magicLinkController from "../../../backEnd/controller/magicLink.controller";

export default async function SheetRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formData: any = req.body;
    try {
    if (req.method === "POST") {
      res.status(200).json(await magicLinkController.createMagicLink(formData));
    } else if (req.method === "PUT"){
      res.status(200).json(await magicLinkController.updateMagicLink(formData));
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
