import feedbackRepository from "../repositories/feedback.repository";
import { INewFeedBackProps } from "../../types/feedBackTypes";

async function createFeedBack(newBack: INewFeedBackProps) {
    const { text, user_name, user_url, stars} = newBack;

    if(!!text && !!user_name && !!user_url && !!stars) {
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