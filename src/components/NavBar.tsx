'use client';

import React, { useState } from 'react';

import { IChatListItem, ISubscription } from '@/types/chat';
import axios from 'axios';

import Button from '@/components/generic/Button';

import CreateChatModal from '../components/CreateChatModal';
import ChatList from './chat/ChatList';
import { IconArrowLeft, IconChat, IconNewChat } from './Icons';

interface INavBarProps {
  resp: {
    chats: IChatListItem[];
    subscription: ISubscription;
    currentChat: string;
    u: string;
  };
}

const api = 'https://gpt-solver-backend.onrender.com';

export default function NavBar({ resp }: INavBarProps) {
  const { chats, currentChat, u, subscription } = resp;

  const [isOpen, setIsOpen] = useState(false);
  const [displyedChats, setDisplayedChats] = useState<IChatListItem[]>(chats);
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);

  const handleChatChange = (chatId: string) => {
    if (chatId != currentChat) {
      window.location.href = `/chat/${chatId}?u=${u}`;
    }
  };

  const handleOpenNavBar = () => {
    setNavIsOpen((c) => !c);
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
      <CreateChatModal
        isOpen={isOpen}
        subscription={subscription}
        toggle={() => setIsOpen(false)}
      />
      <nav
        className={`${!navIsOpen ? 'flex' : 'hidden'} bg-zinc-900 p-2 pt-5 h-screen`}>
        <Button style="" icon={IconChat()} onClick={handleOpenNavBar}></Button>
      </nav>
      <nav
        className={`${navIsOpen ? 'lg:flex absolute' : 'hidden'} h-screen w-fit
      bg-zinc-900`}>
        <div className="flex flex-row items-start w-[96%]">
          <div className="flex flex-col lg:px-5 h-screen w-full">
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
            style="h-screen bg-transparent flex flex-col items-center justify-center pr-1 w-[4%] self-end"
            onClick={handleOpenNavBar}
            icon={IconArrowLeft()}></Button>
        </div>
      </nav>
    </>
  );
}
