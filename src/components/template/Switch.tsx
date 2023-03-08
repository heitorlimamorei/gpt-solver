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
            ? "bg-gray-900 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => handleSelection("users")}
      >
        Editar Usuários
      </button>
      <button
        className={`px-4 py-2 rounded-r-lg ${
          selected === "properties"
            ? "bg-gray-900 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => handleSelection("properties")}
      >
        Editar Propriedades
      </button>
    </div>
  );
};

export default memo(Switch);
