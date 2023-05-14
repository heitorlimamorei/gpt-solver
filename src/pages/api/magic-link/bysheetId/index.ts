import type { NextApiRequest, NextApiResponse } from "next";
import magicLinkController from "../../../../backEnd/controller/magicLink.controller";

export default async function SheetRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formData = req.body;
  try {
    if (req.method === "POST") {
      res
        .status(200)
        .json(
          await magicLinkController.getMagicLinksByTargetSheet(
            formData.email,
            formData.targetSheet
          )
        );
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
