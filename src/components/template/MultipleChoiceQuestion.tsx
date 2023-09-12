import React, { useState } from 'react';

const MultipleChoiceQuestion = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold dark:text-white mb-4">{question}</h2>
      <form>
        {options.map((option, index) => (
          <label key={index} className="block mb-2 dark:text-white">
            <input
              type="radio"
              name="options"
              value={option}
              onChange={() => setSelectedOption(option)}
              className="mr-2 "
            />
            {option}
          </label>
        ))}
      </form>
    </div>
  );
};

export default MultipleChoiceQuestion;
