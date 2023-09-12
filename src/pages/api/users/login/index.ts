import type { NextApiRequest, NextApiResponse } from 'next';
import userService from '../../../../backEnd/services/user.service';

export default async function SheetRouter(req: NextApiRequest, res: NextApiResponse) {
  const user = req.body;
  try {
    if (req.method === 'POST') {
      res.status(200).json(await userService.getUserByEmail(user));
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
