import type { NextApiRequest, NextApiResponse } from 'next';
import okrService from '../../../../../backEnd/services/okr.service';

export default async function OkrBySheetIdRouter(req: NextApiRequest, res: NextApiResponse) {
  const sheetId: any = req.query.sheetId;
  try {
    if (req.method === 'GET') {
      res.status(200).json(await okrService.getOkrBySheetId(sheetId));
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
