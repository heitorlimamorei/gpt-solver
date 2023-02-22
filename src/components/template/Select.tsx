import { memo } from "react";
interface SelectProps {
  options: string[];
  selected: string;
  handleselected: (current: any) => any;
  id: string;
  name: string;
}
function Select(props: SelectProps) {
  const { options, handleselected, selected, id, name } = props;
  return (
    <select
      onChange={handleselected}
      value={selected}
      id={id}
      name={name}
      className={`dark:bg-[#232323] bg-[#E0E5EC] rounded-xl w-full h-[3.0rem] py-4 p-3 
        shadow-[inset_9px_9px_18px_#5a5c5e,inset_-9px_-9px_18px_#ffffff]
        dark:shadow-[inset_9px_9px_18px_#0e0e0e,inset_-9px_-9px_18px_#383838]`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
export default memo(Select);
