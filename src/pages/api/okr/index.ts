import type { NextApiRequest, NextApiResponse } from "next";
import okrService from "../../../backEnd/services/okr.service";

export default async function OkrRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formData: any = req.body;
    try {
    if (req.method === "POST") {
      res.status(200).json(await okrService.createNewOkr(formData));
    } else if (req.method === "PUT"){
      res.status(200).json(await okrService.updateOkr(formData));
    } else if(req.method === "GET") {
      res.status(200).json(await okrService.getAllOkrs());
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
