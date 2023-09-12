import React, { useState, memo } from "react";

const Star = ({ selected = false, onSelect } : { selected?: boolean; onSelect: () => void }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    onClick={onSelect}
    fill={`${selected ? "yellow" : "gray"}`}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={`w-8 h- cursor-pointer ${
      selected ? "text-yellow-500" : "text-gray-300"
    }`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const StarRating = ({ totalStars = 5, onRating, clasNames }: { totalStars: number; onRating: (rating: number) => void; clasNames?: string }) => {
  const [selectedStars, setSelectedStars] = useState<number>(0);

  const handleSelect = (rating) => {
    setSelectedStars(rating);
    onRating(rating);
  };

  return (
    <div className={clasNames}>
      <label htmlFor="rating">Como você avalia a sua experiência com o app?</label>
      <div className="flex flex-row mt-2">
        {[...Array(totalStars)].map((n, i) => (
          <Star
            key={i}
            selected={selectedStars > i}
            onSelect={() => handleSelect(i + 1)}
          />
        ))}
      </div>
    </div>
  );
};



export default memo(StarRating);
