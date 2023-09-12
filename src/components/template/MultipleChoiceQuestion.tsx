import { useState, memo } from 'react';

interface IMultipleChoiceQuestionProps {
  question: string;
  options: string[] | number[];
  handleOptionChange: (opt: any) => void;
}

const MultipleChoiceQuestion = ({ question, options, handleOptionChange }: IMultipleChoiceQuestionProps ) => {
  return (
    <div className="py-4">
      <label htmlFor={question} className="dark:text-white">{question}</label>
        {options.map((option, index) => (
          <label key={index} className="block mb-2 mx-1 dark:text-white mt-2">
            <input
              type="radio"
              name="options"
              value={option}
              onChange={() => handleOptionChange(option)}
              className="mr-2 "
            />
            {option}
          </label>
        ))}
    </div>
  );
};

export default memo(MultipleChoiceQuestion);
