import React, { useEffect, useState } from "react";
import Input from "../input";
import Button from "../Button";
import Select from "./Select";
import useSheets from "../../data/hook/useSheets";
import { trashIcon } from "../icons/Icones";
interface ManageSheetProps {
  toggleIsOpen: () => void;
}
function ManageSheetProps(props: ManageSheetProps) {
  const { toggleIsOpen } = props;
  const [name, setName] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [tiposDeGastos, setTiposDeGastos] = useState(["X"]);
  const [newSpent, setNewSpent] = useState("");
  const { sheet, updateSheet } = useSheets();
  useEffect(() => {
    const {
      name: nameCurrent,
      totalValue: totalCurrent,
      tiposDeGastos: tiposCurrent,
    } = sheet.data;
    if (
      name !== undefined &&
      totalValue !== undefined &&
      tiposDeGastos !== undefined
    ) {
      setTotalValue(totalCurrent);
      setName(nameCurrent);
      setTiposDeGastos(tiposCurrent);
    }
  }, [sheet.data]);
  async function handleSubmit() {
    await updateSheet({
      name,
      totalValue,
      tiposDeGastos,
    });
    console.log(sheet);
    toggleIsOpen();
  }
  function filterByIndex(index: number) {
    const arrayClone = [...tiposDeGastos].filter((spent, i) => i !== index);
    setTiposDeGastos(arrayClone);
  }
  function addSpentIntoTheList() {
    const arrayClone = [...tiposDeGastos];
    arrayClone.push(newSpent);
    setTiposDeGastos(arrayClone);
    setNewSpent("");
  }
  return (
    <div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="name">
          Nome da planilha
        </label>
        <Input
          ClassName=""
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="value">
          Valor total estimado
        </label>
        <Input
          ClassName=""
          type="number"
          id="value"
          name="value"
          value={totalValue}
          onChange={(ev) =>
            setTotalValue(ev.target.value >= 0 ? ev.target.value : 0)
          }
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="value">
          Modifique os tipos de gastos
        </label>
        <ul>
          {tiposDeGastos.map((tipo, i) => {
            return (
              <li key={tipo}>
                <h1>{tipo}</h1>
                <span onClick={() => filterByIndex(i)}>{trashIcon(6)}</span>
              </li>
            );
          })}
        </ul>
        <div className="flex mt-1">
          <Input
            ClassName=""
            type="string"
            id="newSpent"
            name="newSpent"
            value={newSpent}
            onChange={(ev) => setNewSpent(ev.target.value)}
          />
          <button
            className="px-2 ml-1 py-5 rounded-xl bg-green-600 text-white h-[2.4rem] flex items-center"
            onClick={addSpentIntoTheList}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={handleSubmit}
          text={"Salvar alterações"}
          textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
        ></Button>
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={toggleIsOpen}
          text="Cancelar"
          textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
        ></Button>
      </div>
    </div>
  );
}
export default React.memo(ManageSheetProps);
