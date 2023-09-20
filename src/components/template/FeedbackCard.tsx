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
    <li className="w-full h-fit rounded-xl p-5 overflow-x-clip   mb-5 dark:shadow-[5px_5px_15px_#141414,-5px_-5px_15px_#323232] shadow-[5px_5px_15px_#5a5a5a,-5px_-5px_15px_#ffffff]">
      <div className="flex flex-row items-center w-full mb-3  h-1/5">
        <img className="w-[40px] h-[40px] rounded-full " alt="userPicture" src={userUrl} />
        <p className="ml-4">{`${rating}`}</p>
        <div className=" mr-1">{StarIcon(6)}</div> 
        <p className="">{`${userName}`}</p>
      </div>
      <div className="m-1">
        <p className="p-1">{review}</p>
      </div>
    </li>
  );
}

export default memo(FeedbackCard);