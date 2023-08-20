import { memo } from "react";
import { StarIcon } from "../icons/Icones";

interface IFeedBackCardProps {
  userName: string;
  review: string;
  userUrl: string;
  rating: number;
}

const FeedbackCard = (props:IFeedBackCardProps)  => {
  const { userName, review, userUrl, rating } = props;
  return (
    <li className="w-full max-h-1/5 rounded-xl p-3 mb-5 dark:shadow-[3px_3px_25px_#141414,-3px_-3px_25px_#323232] shadow-[5px_5px_25px_#5a5a5a,-5px_-5px_25px_#ffffff]">
      <div className="flex flex-row items-center w-full mb-4  h-1/3">
        <img className="w-[40px] h-[40px] rounded-full " src={userUrl} />
        <p className="ml-4 mr-3">{`${userName}`}</p>
        <p>{`${rating}`}</p>
        <div className="">{StarIcon(6)}</div> 
      </div>
      <div className="m-2">
        <p className="m-1">{review}</p>
      </div>
    </li>
  );
}

export default memo(FeedbackCard);