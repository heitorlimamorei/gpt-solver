import type { NextApiRequest, NextApiResponse } from "next";
import userService from "../../../backEnd/services/user.service";

export default async function SheetRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      res.status(200).json(await userService.getAllUsers());
    } else if (req.method === "PUT") {
      let user = req.body;
      res.status(200).json(await userService.updateUser(user));
    } else if (req.method === "PATCH") {
      let data = req.body.data;
      let mode = req.body.mode; 
      if(mode === "add"){
        res.status(200).json(await userService.addSheetIntoTheList(data.email, data.sheetId));
      } else if (mode === "delete"){
        res.status(200).json(await userService.removeSheetFromTheList(data.email, data.sheetId));
      }
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
