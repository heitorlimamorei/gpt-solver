import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { IFeedBackItemProps, INewFeedBackProps } from '../../types/feedBackTypes';

async function createFeedBack(newFeedBack: INewFeedBackProps) {
  const feedbackColletionRef = collection(db, 'feedback');
  const feedback = await addDoc(feedbackColletionRef, { ...newFeedBack });
}

async function updateFeedback(feedback: IFeedBackItemProps) {
  const feedbackRef = doc(db, `feedback/${feedback.id}`);
  const docRef = await setDoc(
    feedbackRef,
    {
      user_name: feedback.user_name,
      user_url: feedback.user_url,
      stars: feedback.stars,
      text: feedback.text,
      featuresImprovement: feedback.featuresImprovement,
      appHasBeenShared: feedback.appHasBeenShared,
      continued_using: feedback.continued_using,
      financial_management_improved: feedback.financial_management_improved,
      did_pan_before: feedback.did_pan_before,
    },
    { merge: true },
  );
}

async function getFeedBacks(): Promise<IFeedBackItemProps[]> {
  const feedbackColletionRef = collection(db, 'feedback');
  const feedBacks = await getDocs(feedbackColletionRef);
  let normalizado = [];

  feedBacks.forEach((item) => {
    normalizado.push({ id: item.id, ...item.data() });
  });

  return normalizado;
}

export default {
  createFeedBack,
  getFeedBacks,
  updateFeedback,
};
