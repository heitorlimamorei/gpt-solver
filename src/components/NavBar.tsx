/* eslint-disable prettier/prettier */
'use client';

import React, { useState } from 'react';

import { IChatListItem } from '@/types/chat';

import Button from '@/components/generic/Button';

import { IconChat, IconNewChat } from './Icons';
import DarkModal from './Modal';

interface INavBarProps {
  resp: {
    chats: IChatListItem[];
    currentChat: string;
    u: string;
  }
}

export default function NavBar({ resp }: INavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {chats, currentChat, u} = resp;

  const handleChatChange = (chatId: string) => {
    if (chatId != currentChat){ 
      window.location.href = `/chat/${chatId}?u=${u}`;
    }
  };

  return (
    <>
      <DarkModal isOpen={isOpen} toggle={() => setIsOpen(false)} onSave={() => {}} />
      <nav className="bg-zinc-900 lg:hidden p-2 pt-5">{IconChat()}</nav>
      <nav className=" hidden lg:flex flex-col px-4 h-screen w-[15%] bg-zinc-900 items-center">
        <Button
          onClick={() => setIsOpen(true)}
          style="w-[90%] font-bold h-fit px-3 py-2 mt-5 hover:bg-zinc-800 text-sm rounded-xl"
          icon={IconNewChat()}
          text="Novo Chat"
        />

        <label className="self-start ml-3 mt-5 text-sm text-gray-400 px-3">
          Outros Chats
        </label>

        {chats.map((chat) => (
          <Button
            onClick={()=> handleChatChange(chat.id)}
            key={chat.id}
            text={chat.name}
            style="w-[90%] h-fit px-3 py-1 hover:bg-zinc-800 rounded-xl"
          />
        ))}
      </nav>
    </>
  );
}
