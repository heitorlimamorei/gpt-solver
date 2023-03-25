import { memo } from "react";
type selectedType = "createItem" | "import";
interface SwitchProps {
    className: string;
    selected: selectedType
    setSelected: (current: selectedType) => void;
}
const Switch2 = (props:SwitchProps) => {
  const { className: clasNameProp, selected, setSelected } = props;
  const handleSelection = (selection) => {
    setSelected(selection);
  };
  return (
    <div className={`flex justify-center items-center ${clasNameProp}`}>
      <button
        className={`px-4 py-2 rounded-l-lg ${
          selected === "createItem"
            ? `dark:shadow-[inset_7px_7px_7px_#0e0e0e,inset_-7px_-7px_7px_#383838] dark:bg-[#232323]  dark:text-white
            shadow-[inset_7px_7px_7px_#5a5c5e,inset_-7px_-7px_7px_#ffffff]`
            : `dark:shadow-[7px_7px_7px_#0e0e0e,-7px_-7px_7px_#383838] dark:bg-[#232323] dark:text-white text-gray-7004
            shadow-[7px_7px_12px_#5a5c5e,-7px_-7px_12px_#ffffff] bg-[#E0E5EC]`
        }`}
        onClick={() => handleSelection("createItem")}
      >
        Criar novo item
      </button>
      <button
        className={`px-4 py-2 rounded-r-lg ${
          selected === "import"
            ? `dark:shadow-[inset_7px_7px_7px_#0e0e0e,inset_-7px_-7px_7px_#383838] dark:bg-[#232323] dark:text-white
            shadow-[inset_7px_7px_7px_#5a5c5e,inset_-7px_-7px_7px_#ffffff]`
            : `dark:shadow-[7px_7px_7px_#0e0e0e,-7px_-7px_7px_#383838] dark:bg-[#232323] dark:text-white text-gray-700
            shadow-[7px_7px_12px_#5a5c5e,-7px_-7px_12px_#ffffff] bg-[#E0E5EC]`
        }`}
        onClick={() => handleSelection("import")}
      >
       Importar itens
      </button>
    </div>
  );
};

export default memo(Switch2);
