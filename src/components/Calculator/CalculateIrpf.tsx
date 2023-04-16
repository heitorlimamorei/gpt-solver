import React, { memo, useState } from "react";
import Input from "../input";
import useCalcs from "../../data/hook/useCalcs";

const CalculateInss = () => {
  const [rawSalary, setRawSalary] = useState(0);
  const [dependents, setDependents] = useState(0);
  const { solveIr } = useCalcs();
  return (
    <div className="flex flex-col items-center h-full w-full p-2">
      <div>
        <h1>Calcular IRPF</h1>
        {rawSalary > 0 && <h2>resultado: {solveIr(rawSalary, dependents)}</h2>}
      </div>
      <div className="flex flex-col p-2 mt-2">
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
         <label htmlFor="dependents">
          n° de dependentes
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