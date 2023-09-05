import { memo } from "react";

interface IIncomeOutcomeSwitchProps {
  isChecked: boolean;
  toggleChecked: () => void;
};

const IncomeOutcomeSwitch = ({ isChecked, toggleChecked }: IIncomeOutcomeSwitchProps) => {
  const handleChange = () => {
    toggleChecked()
  };

  return (
    <div className="md:hidden flex  items-center justify-center mr-2 md:w-[15%] w-[25%] h-full dark:shadow-[5px_5px_10px_#0e0e0e,-5px_-5px_10px_#383838] rounded-full text-white">
      <label
        htmlFor="toggle"
        className={`w-full h-9 hover:cursor-pointer flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${isChecked ? "bg-red-500" : "bg-green-500"
          } nm-flat-gray-300`}
      >
        <input
          id="toggle"
          type="checkbox"
          className="hidden"
          checked={isChecked}
          onChange={handleChange}
        />
        <span
          className={`flex items-center justify-center w-[53%] h-[100%] bg-[#232323] rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isChecked ? "sm:translate-x-7 translate-x-5" : "translate-x-0"
            } nm-concave-gray-300`}
        >{isChecked ? '-' : '+'}</span>
      </label>
    </div>
  );
}

export default memo(IncomeOutcomeSwitch);
