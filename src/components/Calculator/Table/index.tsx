import { memo } from "react";
interface IHeaderData {
  name: string;
}
interface TableProps {
  headerData: IHeaderData[];
  children: any[];
}
const Table = (props: TableProps) => {
  return (
    <table className="w-full bg-gray-100 rounded-lg dark:shadow-[30px_30px_50px_#0e0e0e,-30px_-30px_50px_#383838] shadow-[30px_30px_30px_#bec3c9,-30px_-30px_30px_#ffffff] overflow-hidden">
      <thead>
        <tr>
          {props.headerData.map((item, i) => (
            <th
              className="bg-[#232323] px-4 py-3 font-bold text-white"
              key={`CalculatorTable(${i}):${item.name}`}
            >
              {item.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};

export default memo(Table);
