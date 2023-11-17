import React, { memo } from 'react';
import Image from 'next/image';
import Mostra from '../../public/images/mostra.png';
import { CloseIcon } from './icons/Icones';
import { useRouter } from 'next/router';

const MessagePopup = ({ show, tooggleShow }: { show: boolean; tooggleShow: () => void }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/magic-link/VEQCDzL2AWsVgs48ZJeB')
  };

  return (
    <div
      className={`${
        show ? `flex` : `hidden`
      } flex-row absolute y-6 x-5   dark:bg-[#232323] bg-[#E0E5EC] dark:shadow-[10px_10px_24px_#0e0e0e,-10px_-10px_24px_#383838] shadow-[10px_10px_24px_#727578,-10px_-10px_24px_#ffffff] p-1 rounded-xl hover:cursor-pointer`}
    >
      <Image src={Mostra} height={100} width={100} alt="logo da mostra"></Image>
      <h1 onClick={handleRedirect} className="font-bold dark:text-white h-fit w-fit self-center">
        Está na mostra? <br />
        Clique e teste nossa demo!!
      </h1>
      <button className="self-start justify-self-end hover:cursor-pointer" onClick={tooggleShow}>
        {CloseIcon()}
      </button>
    </div>
  );
};

export default memo(MessagePopup);