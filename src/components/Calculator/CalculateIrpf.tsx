import React, { memo, useState } from "react";
import Input from "../input";
import useCalcs from "../../data/hook/useCalcs";

const CalculateInss = () => {
  const [rawSalary, setRawSalary] = useState(0);
  const [dependents, setDependents] = useState(0);
  const { solveIr } = useCalcs();
  return (
    <div className="flex flex-col items-center h-full w-full p-10 dark:shadow-[12px_12px_32px_#0f0f0f,-12px_-12px_32px_#373737]
    shadow-[12px_12px_32px_#5e6063,-12px_-12px_32px_#ffffff] rounded-xl dark:text-white">
      <h1>Calcular IRPF</h1>
      <div className="shadow-[5px_5px_10px_#0e0e0e,-5px_-5px_10px_#383838] rounded-xl p-2 mt-3">
        {rawSalary > 0 && <h2>Resultado: {solveIr(rawSalary, dependents)}</h2>}
      </div>
      <div className="flex flex-col p-2 mt-2 ">
        <label htmlFor="rawSalary">
          Salário bruto
        </label>
        <Input
          name="rawSalaryInput"
          id="rawSalary"
          onChange={(ev) => setRawSalary(ev.target.value)}
          value={rawSalary}
          ClassName="mb-2"
          type={"number"}
        />
         <label className="mt-5" htmlFor="dependents">
          N° de dependentes
        </label>
        <Input
          name="dependentsInput"
          id="dependents"
          onChange={(ev) => setDependents(ev.target.value)}
          value={dependents}
          type={"number"}
        />
      </div>
    </div>
  );
}
export default memo(CalculateInss);