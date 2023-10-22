import type { NextApiRequest, NextApiResponse } from 'next';
import okrService from '../../../../backEnd/services/okr.service';

export default async function OkrByIdRouter(req: NextApiRequest, res: NextApiResponse) {
  const id: any = req.query.id;
  const formData: any = req.body;
  try {
    if (req.method === 'GET') {
      res.status(200).json(await okrService.getOkrById(id));
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
