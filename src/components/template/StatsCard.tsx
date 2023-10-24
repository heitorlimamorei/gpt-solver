import React from 'react'
import PieChart from '../../components/template/PieChart';

export default function StatsCard({StatLabel, data}) {
  return (
    <div className="my-2 mx-4 shrink-0 transition-all duration-500 ease-linear bg-gradient-to-br from-[#FFFFFF] to-[#B8BCC2] dark:from-[#2A2A2A] dark:to-[#1C1C1C] p-3 flex-1 m-1 rounded-lg justify-center flex flex-col  lg:mb-5 w-full md:w-fit dark:text-white
    shadow-[4.5px_4.5px_40px_#A5A8AD,_-4.5px_-4.5px_40px_#FFFFFF]
    dark:shadow-[8px_8px_3px_#1C1C1C,_-3px_-3px_16px_#2A2A2A]">
        <p className="font-bold">{StatLabel}</p>
        <PieChart data={data}></PieChart>
      </div>
  )
}
