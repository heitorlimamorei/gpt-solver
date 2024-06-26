import React from 'react';

import { IChatListItem } from '@/types/chat';

import Button from '../generic/Button';
import { IconTrash } from '../Icons';

interface IChatListProps {
  displayedChats: IChatListItem[];
  handleChatDelete: Function;
  handleChatChange: Function;
}

export default function ChatList(props: IChatListProps) {
  return (
    <div className="px-2 w-full">
      {props.displayedChats.map((chat) => (
        <div
          key={chat.id}
          className="flex flex-row hover:bg-zinc-800 p-2 rounded-xl h-fit items-center justify-between border-opacity-15 border-zinc-700 border max-w-52 break-all">
          <Button onClick={() => props.handleChatChange(chat.id)} text={chat.name} style="" />
          <Button
            onClick={() => props.handleChatDelete(chat.id)}
            style={'hover:text-red-600 ml-[10px]'}
            icon={IconTrash()}
          />
        </div>
      ))}
    </div>
  );
}
