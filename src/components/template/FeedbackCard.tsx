import { StarIcon } from "../icons/Icones";

function FeedbackCard(rating, review) {
    console.log(review)
  return (
    <li className="w-full h-1/5 rounded-xl p-5 shadow-[28px_28px_57px_#5a5a5a,-28px_-28px_57px_#ffffff]">
      <div className="flex flex-row items-center w-full h-1/3">
        {StarIcon(6)}
        <p> Nota: {`${rating.rating}`}</p>
      </div>
      <div>
        <p>{`${review.review}`}</p>
      </div>
    </li>
  );
}

export default FeedbackCard;
