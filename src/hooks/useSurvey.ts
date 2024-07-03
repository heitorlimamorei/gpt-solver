import { surveyType } from '@/types/survey';
import axios from 'axios';

const api = 'https://fianancial-assistant-backend.onrender.com/api';

export default function useSurvey() {
  async function SendSurvey(data: surveyType) {
    const resp = await axios.post(`${api}/v1/feedback`, data);

    if (resp.status !== 201) throw new Error('Error when sending survey');

    return resp.data;
  }

  return {
    SendSurvey,
  };
}
