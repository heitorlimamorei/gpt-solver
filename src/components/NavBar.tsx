/* eslint-disable prettier/prettier */
'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { IChatListItem } from '@/types/chat';
import axios from 'axios';
import { error } from 'console';

import Button from '@/components/generic/Button';

import { IconChat, IconNewChat, IconTrash } from './Icons';
import DarkModal from './Modal';

interface INavBarProps {
  resp: {
    chats: IChatListItem[];
    currentChat: string;
    u: string;
  };
}

export default function NavBar({ resp }: INavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const router = useRouter();
  const { chats, currentChat, u } = resp;

  const handleChatChange = (chatId: string) => {
    if (chatId != currentChat) {
      window.location.href = `/chat/${chatId}?u=${u}`;
    }
  };

  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  };

  const handleChatDelete = async (id: string) => {
    let api = 'https://gpt-solver-backend.onrender.com';
    if (chats.length > 1) {
      try {
        const response = await axios.delete(`${api}/v1/chat/${id}`);
        router.push(`/chat/${chats[0].id}?u=${u}`);

        console.log('Dados deletados com sucesso. Status:', response.status);
      } catch (error) {
        console.error('Erro ao deletar:', error);
      }
    } else {
      throw new Error('Não é possível deletar o ultimo chat');
    }
  };

  return (
    <>
      <DarkModal
        isOpen={isOpen}
        toggle={() => setIsOpen(false)}
        onSave={() => {}}
      />
      <nav className="bg-zinc-900 lg:hidden p-2 pt-5">{IconChat()}</nav>
      <nav
        className=" hidden lg:flex flex-col px-4 h-screen w-[15%] 
      bg-zinc-900 items-start">
        <Button
          onClick={() => setIsOpen(true)}
          style="w-[90%] font-bold h-fit px-3 py-2 mt-5 hover:bg-zinc-800 
          text-sm rounded-xl"
          icon={IconNewChat()}
          text="Novo Chat"
        />

        <label className="self-start ml-3 mt-5 text-sm text-gray-400 px-">
          Outros Chats
        </label>

        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex flex-row hover:bg-zinc-800 rounded-xl mt-3 px-3 py-2 w-[90%] h-fit items-center justify-between border-opacity-15 border-zinc-700 border">
            <Button
              onClick={() => handleChatChange(chat.id)}
              text={chat.name}
              style=""
            />
            <Button
              onClick={() => handleChatDelete(chat.id)}
              style={'hover:text-red-600 ml-3'}
              icon={IconTrash()}
            />
          </div>
        ))}
      </nav>
    </>
  );
}
