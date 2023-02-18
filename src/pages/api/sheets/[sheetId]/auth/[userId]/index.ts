import type { NextApiRequest, NextApiResponse } from "next";
import sheetAuthController from "../../../../../../backEnd/auth/sheetAuthController";
export default async function sheetAuthRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sheetId = req.query.sheetId;
    const userId = req.query.userId;
    if (req.method === "GET") {
      res.status(200).json(await sheetAuthController.getUser(userId, sheetId));
    }
    if (req.method === "DELETE") {
      res
        .status(200)
        .json(await sheetAuthController.deleteUser(sheetId, userId));
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
