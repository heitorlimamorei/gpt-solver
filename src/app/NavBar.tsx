import React from 'react';

import Button from '@/components/generic/Button';

import { IconeCriarChat } from '../components/Icons';

export default function NavBar() {
  return (
    <nav className="flex flex-col px-4 h-screen w-[16rem] bg-zinc-900 items-center">
      <Button
        style="w-[90%] font-bold h-fit p-3 mt-5 hover:bg-zinc-800 rounded-xl"
        icon={IconeCriarChat()}
        text="Novo Chat"
      />

      <label htmlFor="Other Chats" className="self-start mt-5">
        Other chats
      </label>
    </nav>
  );
}
