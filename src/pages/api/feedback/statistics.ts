import type { NextApiRequest, NextApiResponse } from 'next';
import getSurveyStatistics from '../../../backEnd/services/feedbackSurveyStatistics.service';

export default async function feedBackRouter(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      res.status(200).json(await getSurveyStatistics());
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
