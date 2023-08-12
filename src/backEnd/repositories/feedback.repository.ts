import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { IFeedBackItemProps, INewFeedBackProps } from "../../types/feedBackTypes"

async function createFeedBack(newFeedBack:INewFeedBackProps){
    const feedbackColletionRef = collection(db, 'feedback');
    const feedback = await addDoc(feedbackColletionRef, {...newFeedBack});
}

async function getFeedBacks(): Promise<IFeedBackItemProps[]>{
    const feedbackColletionRef = collection(db, 'feedback');
    const feedBacks =  await getDocs(feedbackColletionRef);
    let normalizado = [];
    
    feedBacks.forEach((item) => {
        normalizado.push({id: item.id, ...item.data()});
    })

    return normalizado;
}

export default {
    createFeedBack,
    getFeedBacks
}