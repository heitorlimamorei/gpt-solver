import feedbackRepository from "../repositories/feedback.repository";
import { INewFeedBackProps } from "../../types/feedBackTypes";

async function createFeedBack(newBack: INewFeedBackProps) {
  const {
    text,
    user_name,
    user_url,
    stars,
    did_pan_before,
    financial_management_improved,
  } = newBack;

  if (
    !!text &&
    !!user_name &&
    !!user_url &&
    !!stars &&
    !!financial_management_improved &&
    did_pan_before != undefined &&
    did_pan_before != null
  ) {
    await feedbackRepository.createFeedBack(newBack);
  } else {
    throw new Error(`Feedback could not be created`);
  }
}

async function getFeedBacks() {
    return await feedbackRepository.getFeedBacks();
}

export default {
    createFeedBack,
    getFeedBacks
}