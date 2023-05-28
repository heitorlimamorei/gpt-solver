import React, { useState, memo } from "react";
import Input from "../input";
import useCalcs from "../../data/hook/useCalcs";
const CalculateInss = () => {
  const [rawSalary, setRawSalary] = useState(0);
  const { solveInss } = useCalcs();
  return (
    <div
      className="flex flex-col dark:text-white h-[20%] items-center w-fit p-10 dark:shadow-[12px_12px_32px_#0f0f0f,-12px_-12px_32px_#373737]
    shadow-[12px_12px_32px_#5e6063,-12px_-12px_32px_#ffffff] rounded-xl"
    >
      <h1 className="text-xl font-bold">Calcular INSS</h1>
      {rawSalary > 0 && (
        <div className="shadow-[5px_5px_10px_#0e0e0e,-5px_-5px_10px_#383838] rounded-xl p-2 mt-3">
          {<h2 className="font-bold text-xl">R${solveInss(rawSalary)}</h2>}
        </div>
      )}
      <div className="flex flex-col p-2 mt-4">
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
