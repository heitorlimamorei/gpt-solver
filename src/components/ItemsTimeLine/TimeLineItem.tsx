import { memo } from 'react';
import { sheetItemProps } from "../../types/sheetTypes";
import Item from './Item';

interface ITimeLineProps {
  date: string;
  items: sheetItemProps[];
  setEditMode: (c: sheetItemProps) => void;
}

const TimeLineItem = ({date, items, setEditMode}: ITimeLineProps) => {
  return (
    <li className=''>
        <div className='flex flex-row items-center justify-center'>
      <h1 className='font-bold text-xl my-2 dark:text-white'>
        {date} 
      </h1>
      <div className='w-full h-2 mx-2 dark:bg-white bg-black'></div>
      </div>
      <ul>
        {items.map(item => <Item key={item.id} item={item} setEditMode={setEditMode} />)}
      </ul>
    </li>
  )
}

export default memo(TimeLineItem);