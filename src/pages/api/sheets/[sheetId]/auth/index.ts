import type { NextApiRequest, NextApiResponse } from "next";
import sheetAuthController from "../../../../../backEnd/auth/sheetAuthController";
export default async function sheetAuthRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sheetId = req.query.sheetId;
    let user = req.body;
    if (req.method === "GET") {
      res.status(200).json(await sheetAuthController.getUsers(sheetId));
    }
    if (req.method === "POST") {
      res
        .status(200)
        .json(await sheetAuthController.createUser({ sheetId, ...user }));
    }
    if (req.method === "PUT") {
      res.status(200).json(await sheetAuthController.updateUser(user, sheetId));
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
