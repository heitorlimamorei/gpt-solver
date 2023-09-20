import { transformArrayByField } from '../../utils/StatisticsMethods';
import feedbackService from './feedBack.service';

async function getSurveyData() {
  const feedback = await feedbackService.getFeedBacks();

  const appHasBeenShared = transformArrayByField(feedback, "appHasBeenShared");
  const did_pan_before = transformArrayByField(feedback, "did_pan_before");
  const stars =  transformArrayByField(feedback, "stars");
  const financial_management_improved = transformArrayByField(feedback, "financial_management_improved");

  return {
    appHasBeenSharedData: appHasBeenShared,
    didPanBeforeData: did_pan_before,
    starsData: stars,
    financialManagementImprovedData: financial_management_improved,
  };
}
