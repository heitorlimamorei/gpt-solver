import { memo } from "react";
interface TrowProps {
  index: number;
  children: React.ReactNode;
}
const TRow = (props: TrowProps) => {
  return (
    <tr
      className={props.index % 2 !== 0 ? "bg-gray-200" : "bg-white"}
    >
      {props.children}
    </tr>
  );
};
export default memo(TRow);
