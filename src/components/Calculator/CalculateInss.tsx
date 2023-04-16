import React, { useState, memo } from "react";
import Input from "../input";
import useCalcs from "../../data/hook/useCalcs";
const CalculateInss = () => {
  const [rawSalary, setRawSalary] = useState(0);
  const { solveInss } = useCalcs();
  return (
    <div className="flex flex-col items-center h-full w-full p-2">
      <div>
        <h1>Calcular INSS</h1>
        {rawSalary > 0 && <h2>resultado: {solveInss(rawSalary)}</h2>}
      </div>
      <div className="flex flex-col p-2 mt-2">
        <Input
          name="rawSalary"
          id="rawSalary"
          onChange={(ev) => setRawSalary(ev.target.value)}
          value={rawSalary}
          type={"number"}
        />
      </div>
    </div>
  );
};

export default memo(CalculateInss);
