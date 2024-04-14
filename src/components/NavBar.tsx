/* eslint-disable prettier/prettier */
'use client';

import React, { use, useState } from 'react';

import { IChatListItem } from '@/types/chat';
import axios from 'axios';

import Button from '@/components/generic/Button';

import { IconArrowLeft, IconChat, IconNewChat, IconTrash } from './Icons';
import DarkModal from './Modal';
import ChatList from './chat/ChatList';

interface INavBarProps {
  resp: {
    chats: IChatListItem[];
    currentChat: string;
    u: string;
  };
}

const api = 'https://gpt-solver-backend.onrender.com';

export default function NavBar({ resp }: INavBarProps) {
  const { chats, currentChat, u } = resp;

  const [isOpen, setIsOpen] = useState(false);
  const [displyedChats, setDisplayedChats] = useState<IChatListItem[]>(chats);
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);

  const handleChatChange = (chatId: string) => {
    if (chatId != currentChat) {
      window.location.href = `/chat/${chatId}?u=${u}`;
    }
  };

  const handleOpenNavBar = () => {
    setNavIsOpen(!navIsOpen);
  };

  const handleChatDelete = async (id: string) => {
    if (displyedChats.length > 1) {
      try {
        const response = await axios.delete(`${api}/v1/chat/${id}`);

        setDisplayedChats((prev) => prev.filter((chat) => chat.id != id));

        if (id == currentChat) {
          handleChatChange(displyedChats[0].id);
        }

        console.log('Dados deletados com sucesso. Status:', response.status);
      } catch (error) {
        console.error('Erro ao deletar:', error);
      }
    } else {
      console.error('Não é possível deletar o ultimo chat');
    }
  };

  return (
    <>
      <DarkModal
        isOpen={isOpen}
        toggle={() => setIsOpen(false)}
        onSave={() => {}}
      />
      <nav
        className={`${!navIsOpen ? 'flex' : 'hidden'} bg-zinc-900 p-2 pt-5 h-screen`}>
        <Button style="" icon={IconChat()} onClick={handleOpenNavBar}></Button>
      </nav>
      <nav
        className={`${navIsOpen ? 'lg:flex absolute' : 'hidden'} h-screen w-[200px]
      bg-zinc-900`}>
        <div className='flex flex-row items-start'>
          <div className="flex flex-col lg:px-5 w-[90%]">
            <Button
              onClick={() => setIsOpen(true)}
              style="w-[90%] font-bold h-fit py-2 mt-5 hover:bg-zinc-800 
          text-sm rounded-xl"
              icon={IconNewChat()}
              text="Novo Chat"
            />

            <label className="self-start ml-3 mt-5 text-sm text-gray-400 px-">
              Outros Chats
            </label>
            <ChatList
              displayedChats={displyedChats}
              handleChatChange={handleChatChange}
              handleChatDelete={handleChatDelete}
            />
          </div>
          <Button
            style="h-screen bg-transparent flex flex-col items-center justify-center pr-1 w-[10%]"
            onClick={handleOpenNavBar}
            icon={IconArrowLeft()}></Button>
        </div>
      </nav>
    </>
  );
}
