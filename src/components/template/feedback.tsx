import FeedbackCard from "./FeedbackCard";
function Feedback() {
  const rating = 2
  const review = 'Ótimo app'
  console.log(review)
    return ( 
        <div className="max-w-xl  mx-auto  my-10 p-10 bg-[#E0E5EC] dark:bg-[#5b4848] rounded-xl dark:shadow-[12px_12px_32px_#0f0f0f,-12px_-12px_32px_#373737]
        shadow-[12px_12px_32px_#5e6063,-12px_-12px_32px_#ffffff] dark:text-white">
          <ul className=" p-4 flex flex-col w-full h-[50vh] bg-[#E0E5EC] dark:bg-[#232323] rounded-xl shadow-[inset_7px_7px_21px_#5a5a5a,inset_-7px_-7px_21px_#ffffff]">
            <FeedbackCard rating={rating} review={review}></FeedbackCard>
          </ul>
        </div>
     );
}

export default Feedback;