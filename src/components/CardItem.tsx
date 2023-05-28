import React from "react";
import useSheets from "../data/hook/useSheets";
import { sheetItemProps } from "../types/sheetTypes";
import Button from "./Button";
import { trashIcon, editIcon } from "./icons/Icones";
interface CardItem {
  item: sheetItemProps;
  setEditMode: (currentItem: sheetItemProps) => void;
}
export default function CardItem(props: CardItem) {
  const { item, setEditMode } = props;
  const { sheet, deleteItem } = useSheets();
  return (
    <li
      className="my-2 shrink-0 transition-all duration-500 ease-linear bg-gradient-to-br from-[#FFFFFF] to-[#B8BCC2] dark:from-[#2A2A2A] dark:to-[#1C1C1C] p-3 flex-1 m-1 rounded-lg justify-center flex flex-col  lg:mb-5 min-w-fit
    shadow-[4.5px_4.5px_40px_#A5A8AD,_-4.5px_-4.5px_40px_#FFFFFF]
    dark:shadow-[8px_8px_3px_#1C1C1C,_-3px_-3px_16px_#2A2A2A]"
      key={item.id}
    >
      <h1 className="text-3xl dark:text-white font-extrabold md:min-w-[25rem] min-w-[50vw] w-full break-normal">
        {item.name}
      </h1>
      <p className="text-base text-gray-600 dark:text-gray-400 my-1/2 w-[90%] break-normal">
        {item.description.length > 0 ? (
          <>
            <strong>Descrição: </strong>
            <p className="break-all">
              {item.description.length <= 45
                ? item.description
                : item.description.slice(0, 45) + "..."}
            </p>
          </>
        ) : (
          <></>
        )}
      </p>

      <p
        className={
          item.value < 0
            ? `font-bold text-red-600 text-xl my-1 w-[90%]`
            : `font-bold text-green-600 text-xl my-1 w-[90%]`
        }
      >
        {item.value < 0 ? "-" : "+"}
        {item.value < 0 ? `R$${item.value * -1}` : `R$${item.value}`}
      </p>

      <p className="dark:text-white mb-2 w-[90%]">
        <strong>Tipo:</strong> {item.type}
      </p>
      {sheet.session.canEditItems && (
        <div className="flex w-full">
          <Button
            ClassName={`transition-all duration-500 ease-linear flex justify-center bg-[#E0E6EC] dark:bg-[#232323] rounded-full p-3 
        shadow-[5px_5px_10px_#A7ABB0,_-5px_-5px_10px_#FFFFFF]
        dark:shadow-[5px_5px_10px_#1A1A1A,_-5px_-5px_10px_#2C2C2C]
         dark:text-white hover:text-red-600 ${
           !sheet.session.canEditItems ? "cursor-not-allowed" : ""
         }`}
            icon={trashIcon(8)}
            onClick={async (ev) => {
              ev.stopPropagation();
              await deleteItem(item.id);
            }}
            disabled={!sheet.session.canEditItems}
          ></Button>
          <button
            className={`ml-5 transition-all duration-500 ease-linear flex justify-center bg-[#E0E6EC] dark:bg-[#232323] rounded-full p-3 
      shadow-[5px_5px_10px_#A7ABB0,_-5px_-5px_10px_#FFFFFF]
      dark:shadow-[5px_5px_10px_#1A1A1A,_-5px_-5px_10px_#2C2C2C]
      hover:text-blue-900 dark:text-white  ${
        !sheet.session.canEditItems ? "cursor-not-allowed" : ""
      }`}
            onClick={() =>
              sheet.session.canEditItems ? setEditMode(item) : false
            }
          >
            {editIcon(8)}
          </button>
        </div>
      )}
    </li>
  );
}
