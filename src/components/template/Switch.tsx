import { memo } from "react";
type selectedType = "users" | "properties";
interface SwitchProps {
    className: string;
    selected: selectedType
    setSelected: (current: selectedType) => void;
}
const Switch = (props:SwitchProps) => {
  const { className: clasNameProp, selected, setSelected } = props;
  const handleSelection = (selection) => {
    setSelected(selection);
  };
  return (
    <div className={`flex justify-center items-center ${clasNameProp}`}>
      <button
        className={`px-4 py-2 rounded-l-lg ${
          selected === "users"
            ? "dark:bg-[#232323] dark:shadow-[inset_7px_7px_14px_#0e0e0e,inset_-7px_-7px_14px_#383838] bg-[#E0ECE5] shadow-[inset_-7px_7px_14px_#5a5c5e,inset_7px_-7px_14px_#ffffff] dark:text-white"
            : "dark:bg-[#232323] dark:shadow-[7px_7px_14px_#0e0e0e,-7px_-7px_14px_#383838] dark:text-white bg-[#E0ECE5] shadow-[-7px_7px_14px_#5a5c5e,7px_-7px_14px_#ffffff]"
        }`}
        onClick={() => handleSelection("users")}
      >
        Editar Usuários
      </button>
      <button
        className={`px-4 py-2 rounded-r-lg ${
          selected === "properties"
            ? "dark:bg-[#232323] dark:shadow-[inset_7px_7px_14px_#0e0e0e,inset_-7px_-7px_14px_#383838] bg-[#E0ECE5] shadow-[inset_-7px_7px_14px_#5a5c5e,inset_7px_-7px_14px_#ffffff] dark:text-white"
            : "dark:bg-[#232323] dark:shadow-[-7px_7px_14px_#0e0e0e,7px_-7px_14px_#383838] dark:text-white bg-[#E0ECE5] shadow-[-7px_7px_14px_#5a5c5e,7px_-7px_14px_#ffffff]"
        }`}
        onClick={() => handleSelection("properties")}
      >
        Editar Propriedades
      </button>
    </div>
  );
};

export default memo(Switch);
