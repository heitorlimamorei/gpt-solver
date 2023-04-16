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
    <div className="flex flex-col items-center h-full w-full p-2">
      <div className="flex w-full md:w-1/2  mt-3 items-center justify-center">
        {liquidSalary.value > 0 && rawSalary >= 100 ? (
          <Table
            headerData={[
              {
                name: "item",
              },
              {
                name: "valor",
              },
            ]}
          >
            {liquidSalaryData.map((item, index) => (
              <TRow key={item.name} index={index}>
                <td className="px-4 py-3 text-gray-700">
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
          <div className="flex w-full md:w-1/2  m-3 items-center text-left justify-center">
            <h1 className=" font-semibold">
              Calcule facilmente o seu salário líquido
            </h1>
          </div>
        )}
      </div>

      <div className="flex flex-col p-2 mt-2 w-full md:w-1/2">
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
        <label htmlFor="discount">Discontos(plano de saúde, etc)</label>
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