import React, { memo, useCallback, useEffect, useState } from 'react';

import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

interface IMultipleChoiceQuestionProps {
  question: string;
  options: Array<string | number>;
  selectedOption: string | number | null;
  handleOptionChange: (opt: any) => void;
}

interface IReadableOptionProps {
  optionId: string;
  option: string | number;
  checked: boolean;
}

const MultipleChoiceQuestion = ({
  question,
  options,
  selectedOption,
  handleOptionChange,
}: IMultipleChoiceQuestionProps) => {
  const [readableOptions, setReadableOptions] = useState<IReadableOptionProps[]>([]);

  const getReadableOptions = useCallback((opts: Array<string | number>) => {
    const readableOpt: IReadableOptionProps[] = opts.map((opt) => ({
      optionId: uuidv4(),
      option: opt,
      checked: false,
    }));
    setReadableOptions(readableOpt);
  }, []);

  const handleCheck = useCallback(
    (option: IReadableOptionProps) => {
      setReadableOptions((current) => {
        const readableList = current.map((opt) =>
          opt.optionId === option.optionId ? { ...opt, checked: true } : { ...opt, checked: false },
        );
        return readableList;
      });
      handleOptionChange(option.option);
    },
    [handleOptionChange],
  );

  useEffect(() => {
    if (options.length > 0) {
      getReadableOptions(options);
    }
  }, [getReadableOptions, options]);

  useEffect(() => {
    if (readableOptions.length > 0 && selectedOption != null) {
      const selectedOpt = readableOptions.find((opt) => opt.option === selectedOption);
      if (selectedOpt && !selectedOpt.checked) {
        handleCheck(selectedOpt);
      }
    }
  }, [selectedOption, readableOptions, handleCheck]);

  return (
    <form className="py-1">
      <label htmlFor={question} className="dark:text-white text-lg">
        {question}
      </label>
      {readableOptions.map((option) => (
        <div className="flex mb-2 mx-1 dark:text-white mt-2" key={option.optionId}>
          <input
            id={`${question}-${option.option}-${option.optionId}`}
            type="radio"
            name="options"
            checked={option.checked}
            onChange={() => handleCheck(option)}
            className="mr-2"
          />
          <label htmlFor={`${question}-${option.option}-${option.optionId}`}>{option.option}</label>
        </div>
      ))}
    </form>
  );
};

export default memo(MultipleChoiceQuestion);
