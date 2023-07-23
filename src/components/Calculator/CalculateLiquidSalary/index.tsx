import React, { memo, useState, useRef } from "react";
import Input from "../../input";
import useCalcs from "../../../data/hook/useCalcs";
import Table from "../Table";
import TRow from "../Table/TRow";
import CheckingInput from "../CheckingValueInput";
const itemsNames = {
  liquidSalary: {
    name: "Salário líquido",
  },
  inss: {
    name: "INSS",
  },
  discount: {
    name: "Desconto",
  },
  rawSalary: {
    name: "Salário bruto",
  },
  irpfValue: {
    name: "Imposto de renda (IRPF)",
  },
};

const CalculateLiquidSalary = () => {
  const [rawSalary, setRawSalary] = useState(0);
  const [dependents, setDependents] = useState(0);
  const [discount, setDiscount] = useState(0);
  const { calculateLiquidSalary } = useCalcs();
  const liquidSalaryData = calculateLiquidSalary(
    rawSalary,
    dependents,
    discount
  );
  const liquidSalary = liquidSalaryData[4];
  return (
    <div
      className="flex flex-col items-center h-full md:w-[40rem] p-10 dark:shadow-[12px_12px_32px_#0f0f0f,-12px_-12px_32px_#373737]
    shadow-[12px_12px_32px_#5e6063,-12px_-12px_32px_#ffffff] rounded-xl dark:text-white"
    >
      <div className="text-black flex mt-3 items-center w-full md:w-[90%] justify-center">
        {liquidSalary.value > 0 && rawSalary >= 100 ? (
          <Table
            headerData={[
              {
                name: "Item",
              },
              {
                name: "Valor",
              },
            ]}
          >
            {liquidSalaryData.map((item, index) => (
              <TRow key={item.name} index={index}>
                <td className="px-4 py-3 text-gray">
                  {itemsNames[item.name].name}
                </td>
                <td className="px-4 py-3">
                  <p className="font-light text-lg my-1 w-[90%]">
                    R${item.value}
                  </p>
                </td>
              </TRow>
            ))}
          </Table>
        ) : (
          <div className="flex w-full md:w-1/2  m-3 items-center ">
            <h1 className=" font-semibold text-center dark:text-white">
              Calcule facilmente o seu salário líquido
            </h1>
          </div>
        )}
      </div>

      <div className="dark:text-white flex flex-col p-2 mt-2 w-full md:w-1/2">
        <label htmlFor="rawSalary">Salário bruto</label>
        <CheckingInput
          checking={{
            value: rawSalary,
            condition: rawSalary <= 0,
          }}
          name="rawSalaryInput"
          id="rawSalary"
          onChange={(ev) => setRawSalary(ev.target.value)}
          value={rawSalary}
          ClassName="mb-2 w-full"
          type={"number"}
        />
        <label htmlFor="dependents">n° de dependentes</label>
        <Input
          disabled={rawSalary <= 0}
          name="dependentsInput"
          id="dependents"
          onChange={(ev) => setDependents(ev.target.value)}
          value={dependents}
          type={"number"}
        />
        <label htmlFor="discount">Descontos(plano de saúde, etc)</label>
        <Input
          disabled={rawSalary <= 0}
          name="discount"
          id="discount"
          onChange={(ev) => setDiscount(ev.target.value)}
          value={discount}
          type={"number"}
        />
      </div>
    </div>
  );
};

export default memo(CalculateLiquidSalary);
