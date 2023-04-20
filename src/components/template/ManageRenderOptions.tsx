import { useState, memo, useEffect } from "react";
import Input from "../input";
import Button from "../Button";
import { itemRenderOptions, shortingTypes } from "../../types/sheetTypes";
import useSheets from "../../data/hook/useSheets";
import SelectEsp from "./SelectEsp";
interface ManageRenderOptionsProps {
  setItemsRenderOptions: (newOptions: itemRenderOptions) => void;
  itemsRenderOptions: itemRenderOptions;
  toggleIsOpen: () => void;
}
function ManageRenderOptions(props: ManageRenderOptionsProps) {
  const { sheet } = useSheets();
  const { itemsRenderOptions, setItemsRenderOptions, toggleIsOpen } = props;
  let spentTypes = [
    { name: "nenhum filtro", value: "" },
    ...sheet.data.tiposDeGastos.map((spentType) => ({
      name: spentType,
      value: spentType,
    })),
  ];
  const sortOptions = [
    { name: "menor valor para maior", value: "ascending" },
    { name: "maior valor para menor", value: "descending" },
    { name: "Data mais recente", value: "date descending" },
    { name: "Data mais antiga", value: "date ascending" },
  ];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [sortMode, setSortMode] = useState<shortingTypes>("date descending");
  useEffect(() => {
    setName(itemsRenderOptions.name);
    setDescription(itemsRenderOptions.description);
    setType(itemsRenderOptions.type);
    setSortMode(itemsRenderOptions.sortMode);
  }, [itemsRenderOptions]);
  function handleSubmit(ev) {
    ev.preventDefault();
    setItemsRenderOptions({
      name,
      description,
      sortMode,
      type,
    });
    toggleIsOpen();
  }
  return (
    <form onSubmit={(ev) => {}} className={`w-full h-full`}>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="name">
          nome do item
        </label>
        <Input
          ClassName=""
          type="text"
          id="email"
          name="email"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="description">
          descrição do item
        </label>
        <Input
          ClassName=""
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="sorting">
          Ordenar por
        </label>
        <SelectEsp
          id="sorting"
          selected={sortMode}
          handleselected={(ev) => setSortMode(ev.target.value)}
          name="role"
          ClassName="p-3"
        >
          {sortOptions.map((opt) => (
            <option
              value={opt.value}
              key={opt.value}
              className={`dark:bg-[#232323] bg-[#E0E5EC]`}
            >
              {opt.name}
            </option>
          ))}
        </SelectEsp>
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="type">
          Tipo
        </label>
        <SelectEsp
          id="type"
          selected={type}
          handleselected={(ev) => setType(ev.target.value)}
          name="role"
          ClassName="p-3"
        >
          {spentTypes.map((spentType) => (
            <option
              value={spentType.value}
              key={spentType.value}
              className={`dark:bg-[#232323] bg-[#E0E5EC]`}
            >
              {spentType.name}
            </option>
          ))}
        </SelectEsp>
      </div>
      <div className="flex justify-between">
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={handleSubmit}
          text="Salvar"
          textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
          iconClassName={""}
          icon={undefined}
        ></Button>
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={() => {
            toggleIsOpen();
            setItemsRenderOptions({
              name,
              description,
              sortMode,
              type,
            });
          }}
          text="Fechar"
          textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
          iconClassName={""}
          icon={undefined}
        ></Button>
      </div>
    </form>
  );
}

export default memo(ManageRenderOptions);
