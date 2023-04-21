import type { NextApiRequest, NextApiResponse } from "next";
import sheetAuthController from "../../../../../backEnd/auth/sheetAuthController";
import sheetAuthservice from "../../../../../backEnd/auth/sheet.authservice";
export default async function sheetAuthRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sheetId:any = req.query.sheetId;
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
    if (req.method === "PATCH") {
      const email = req.body.email;
      res.status(200).json(await sheetAuthservice.removeSelf(sheetId, email));
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
