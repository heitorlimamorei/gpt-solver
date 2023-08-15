import { useEffect, useState } from "react";
import FeedbackCard from "../../../components/template/FeedbackCard";
import axios from "axios";
import variaveis from "../../../model/variaveis";

interface IReviewsProps {
  id: string;
  rating: number;
  text: string;
  user_url: string;
  user_name: string;
}

export default function Reviews() {
  const [reviwes, setReviwes] = useState<IReviewsProps[]>([]);

  const { BASE_URL } = variaveis;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/feedback`).then((response) => {
      setReviwes(response.data);
    });
  }, []);

  return (
    <div
      className="max-w-xl  mx-auto  my-10 p-10 bg-[#E0E5EC] dark:bg-[#232323] rounded-xl dark:shadow-[12px_12px_32px_#0f0f0f,-12px_-12px_32px_#373737]
        shadow-[12px_12px_32px_#5e6063,-12px_-12px_32px_#ffffff] dark:text-white"
    >
      <ul className=" p-4 flex flex-col w-full h-[50vh] bg-[#E0E5EC] dark:bg-[#232323] rounded-xl dark:shadow-[inset_8px_8px_25px_#141414,inset_-8px_-8px_25px_#323232] shadow-[inset_7px_7px_21px_#5a5a5a,inset_-7px_-7px_21px_#ffffff]">
        {reviwes.map((review) => (
          <FeedbackCard
            key={review.id}
            userName={review.user_name}
            review={review.text}
            userUrl={review.user_url}
          />
        ))}
      </ul>
    </div>
  );
}
