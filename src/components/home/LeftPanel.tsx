import React from 'react';
import Logo from '../../../public/ai.png';
import Image from 'next/image';

export default function LeftPanel() {
  return (
    <div className="hidden lg:flex lg:flex-col items-center justify-center w-[60%] bg-zinc-900">
      <Image alt="logo gpt-solver" src={Logo} width={150} height={0}></Image>
      <h1 className="text-xl mt-3 font-bold">GPT-SOLVER</h1>
    </div>
  );
}
