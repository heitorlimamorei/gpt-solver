import { memo } from "react";
import { StarIcon } from "../icons/Icones";

interface IFeedBackCardProps {
  userName: string;
  review: string;
  userUrl: string;
}

const FeedbackCard = (props:IFeedBackCardProps)  => {
  const { userName, review, userUrl } = props;
  return (
    <li className="w-full h-1/6 rounded-xl p-3 dark:shadow-[8px_8px_25px_#141414,-8px_-8px_25px_#323232] shadow-[28px_28px_57px_#5a5a5a,-28px_-28px_57px_#ffffff]">
      <div className="flex flex-row items-center w-full h-1/3">
        <img className="w-[40px] h-[40px] rounded-full " src={userUrl} />
        <p className="ml-2">{`${userName}`}</p>
        <div className="mb-1">{StarIcon(6)}</div>
      </div>
      <div className="mt-2">
        <p className="m-1">{review}</p>
      </div>
    </li>
  );
}

export default memo(FeedbackCard);