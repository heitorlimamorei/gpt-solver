import { memo } from "react";
interface SelectProps {
  options: string[];
  selected: string;
  handleselected: (current: any) => any;
  id: string;
  name: string;
  ClassName: string;
}
function Select(props: SelectProps) {
  const { options, handleselected, selected, id, name } = props;
  return (
    <div
      className={`dark:bg-[#232323] bg-[#E0E5EC]  rounded-xl w-full h-[3.5rem]
    shadow-[inset_9px_9px_18px_#5a5c5e,inset_-9px_-9px_18px_#ffffff]
    dark:shadow-[inset_9px_9px_18px_#0e0e0e,inset_-9px_-9px_18px_#383838] p-3`}
    >
      <select
        onChange={handleselected}
        value={selected}
        id={id}
        name={name}
        className={`rounded-xl w-full h-full  bg-transparent `}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className={`dark:bg-[#232323] bg-[#E0E5EC]`}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
export default memo(Select);
