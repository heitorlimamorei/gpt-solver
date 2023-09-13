import { memo } from 'react';
import { sheetItemProps } from '../../types/sheetTypes';
import Button from '../Button';
import useSheets from '../../data/hook/useSheets';
import { trashIcon, editIcon, ArrowUpIcon, ArrouDownIcon } from '../icons/Icones';

const Item = ({ item }: { item: sheetItemProps }) => {
  return (
    <li className="h-14 my-3 w-full dark:text-white bg-[#e0e5ec] dark:bg-[#232323] shadow-[10px_10px_16px_#7c797f,-10px_-10px_16px_#ffffff] dark:shadow-[10px_10px_16px_#131313,-10px_-10px_16px_#333333] rounded-md">
      <div className="flex items-center w-full h-full ml-2 ">
        <div className="w-[75%] flex flex-row items-center">
          {item.value < 0 ? (
            <div className="shadow-[3px_3px_7px_#7c797f,-3px_-3px_7px_#ffffff] dark:shadow-[3px_3px_7px_#131313,-3px_-3px_7px_#333333] w-fit h-fit text-red-600 rounded-full p-1">
              {ArrouDownIcon(6)}
            </div>
          ) : (
            <div className="shadow-[3px_3px_7px_#7c797f,-3px_-3px_7px_#ffffff] dark:shadow-[3px_3px_7px_#131313,-3px_-3px_7px_#333333] w-fit h-fit text-green-600 rounded-full p-1">
              {ArrowUpIcon(6)}
            </div>
          )}

          <div className="ml-2">
            <h1 className="font-bold">{item.name}</h1>
            <h2 className="text-sm font-light">Autor: {item.author.split('@')[0]}</h2>
          </div>
        </div>
        <div className="h-full w-[20%] flex items-center justify-end">
          <p className={`font-bold ${item.value < 0 ? `text-red-600` : `text-green-600`}`}>
            R$
            {item.value < 0 ? item.value * -1 : item.value}
          </p>
        </div>
      </div>
    </li>
  );
};

export default memo(Item);
