import React from 'react';
import { useState, useEffect } from 'react';

import Image from 'next/image';

import loadingGif from '../../../public/loading.gif';

interface ILoadingProps {
  phrases: string[];
}

export const Loading = ({ phrases }: ILoadingProps) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex(Math.floor(Math.random() * (17 - 0 + 1)) + 0);
    }, 6000);
    return () => clearInterval(interval);
  }, [phrases.length]);
  return (
    <div className="w-screen h-screen bg-zinc-800 flex items-center justify-center">
      <div className="w-full md:w-[60%] h-[40%] bg-zinc-700 rounded-xl flex flex-col items-center justify-center">
        <h1 className="font-bold text-center mb-12 text-2xl">{phrases[currentPhraseIndex]}</h1>
        <Image width={100} height={100} src={loadingGif} alt="Gif de loading" />
      </div>
    </div>
  );
};
