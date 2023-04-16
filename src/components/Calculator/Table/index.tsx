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
    <table className="w-full bg-gray-100 rounded-lg shadow-xl overflow-hidden">
      <thead>
        <tr>
          {props.headerData.map((item, i) => (
            <th
              className="bg-gray-300 px-4 py-3 font-bold text-gray-700"
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
