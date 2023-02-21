import type { NextApiRequest, NextApiResponse } from "next";
import userService from "../../../backEnd/services/user.service";

export default async function SheetRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      res.status(200).json(await userService.getAllUsers());
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
