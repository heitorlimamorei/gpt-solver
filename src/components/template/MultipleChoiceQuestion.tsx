import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';

interface IMultipleChoiceQuestionProps {
  question: string;
  options: string[] | number[];
  selectedOption: any;
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
  
  const getReadableOptions = useCallback((opts: string[] | number[]) => {
    const readableOpt: IReadableOptionProps[] = opts.map((opt) => {
      return {
        optionId: uuidv4(),
        option: opt,
        checked: false,
      };
    });
    setReadableOptions(readableOpt);
  }, []);

  const handleCheck = useCallback(
    (option: IReadableOptionProps) => {
      setReadableOptions((current) => {
        let readableList = [...current];
        const i = _.findIndex(readableList, (opt) => opt.optionId == option.optionId);
        readableList[i] = { ...option, checked: true };
        return readableList;
      });
      handleOptionChange(option.option);
    },
    [handleOptionChange],
  );

  useEffect(() => {
    if (!!options) {
      getReadableOptions(options);
    }
  }, [getReadableOptions, options]);
  
  useEffect(() => {
    if (readableOptions.length > 0 && selectedOption != null) {
      const option = _.find(readableOptions, (option) => option.option == selectedOption);
      const i = _.findIndex(readableOptions, (opt) => opt.optionId == option.optionId);
      if(!readableOptions[i].checked)  {
        setReadableOptions((current) => {
          let readableList = [...current];
          readableList[i] = { ...option, checked: true };
          return readableList;
        });
      }
    }
  }, [selectedOption, readableOptions]);

  return (
    <form className="py-4">
      <label htmlFor={question} className="dark:text-white">
        {question}
      </label>
      {readableOptions.map((option) => (
        <div className="flex mb-2 mx-1 dark:text-white mt-2" key={option.optionId}>
          <input
            id={`${question}-${option}-${option.optionId}`}
            type="radio"
            name="options"
            checked={option.checked}
            onChange={() => handleCheck(option)}
            className="mr-2 "
          />
          <label id={`${question}-${option}-${option.optionId}`}>{option.option}</label>
        </div>
      ))}
    </form>
  );
};

export default memo(MultipleChoiceQuestion);
