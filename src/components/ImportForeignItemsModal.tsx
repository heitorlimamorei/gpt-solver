import { useState, memo, useEffect } from "react";
import Button from "./Button";
import { sheetProps } from "../types/sheetTypes";
import useSheets from "../data/hook/useSheets";
import SelectEsp from "./template/SelectEsp";
interface ImportForeignItemsModalProps {
  toggleIsOpen: () => void;
  sheetOptions: sheetProps[];
}
function ImportForeignItemsModal(props: ImportForeignItemsModalProps) {
  const { sheet, cloneForeignItems } = useSheets();
  const { toggleIsOpen, sheetOptions } = props;
  const [selectedSheet, setSelectedSheet] = useState("");
  const [currentOptions, setCurrentOptions] = useState<sheetProps[]>([]);
  useEffect(() => {
    if (sheetOptions !== undefined && sheetOptions !== null) {
      setCurrentOptions(() =>
        sheetOptions.filter((current) => current.data.id !== sheet.data.id)
      );
      if(currentOptions.length > 0){
        setSelectedSheet(currentOptions[0].data.id);
      }
    }
  }, [sheetOptions]);
  async function handleSubmit(ev) {
    ev.preventDefault();
    console.log(selectedSheet)
    await cloneForeignItems(selectedSheet);
    toggleIsOpen();
  }
  return (
    <form onSubmit={(ev) => {}} className={`w-full h-full`}>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="sorting">
          Importe itens de uma outra planilha
        </label>
        <SelectEsp
          id="sorting"
          selected={selectedSheet}
          handleselected={(ev) => setSelectedSheet(ev.target.value)}
          name="role"
          ClassName="p-3"
        >
          {currentOptions.map((opt) => (
            <option value={opt.data.id} key={opt.data.id} className={`dark:bg-[#232323] bg-[#E0E5EC]`}>
              {opt.data.name}
            </option>
          ))}
        </SelectEsp>
      </div>
      <div className="flex justify-between">
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={handleSubmit}
          text="Importar"
          textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
          iconClassName={""}
          icon={undefined}
        ></Button>
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={() => {
            toggleIsOpen();
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

export default memo(ImportForeignItemsModal);
