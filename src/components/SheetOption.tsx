import { useRouter } from 'next/router';
import React from 'react'
import { sheetProps } from '../types/sheetTypes'

interface SheetOptionProps{
    currentSheet: sheetProps;
    loadSheetByUserSeletion: (selectedSheet: sheetProps) => Promise<void>;
}

export default function SheetOption(props:SheetOptionProps) {
  const { currentSheet, loadSheetByUserSeletion } = props;
  const router = useRouter();

  return (
    <li
    className="flex justify-center items-center my-2 p-5 w-full h-[10rem] md:max-w-[15rem]  shrink-0 dark:bg-[#232323] bg-[#E0E5EC] 
    dark:shadow-[10px_10px_24px_#0e0e0e,-10px_-10px_24px_#383838]
    shadow-[10px_10px_24px_#727578,-10px_-10px_24px_#ffffff] rounded-md mx-3  cursor-pointer"
    key={currentSheet.data.id}
    onClick={async () =>{
      router.push(`/sheet/${currentSheet.data.id}`)
      await loadSheetByUserSeletion(currentSheet)
    }
    }
  >
    <h2 className="font-bold dark:text-white">
      {currentSheet.data.name}
    </h2>
  </li>
  )
}
