import React from 'react';

import ChatMessage from './ChatMessage';

export interface IMessage {
  role: string;
  content: string;
}

interface IChatProps {
  messages: IMessage[];
}

export default function Chat(props: IChatProps) {
  return (
    <ul className="flex flex-col md:items-center w-full h-full px-3 sm:px-20 md:px-72 overflow-y-scroll">
      {props.messages.map((m, index) => (
        <ChatMessage key={index} content={m.content} role={m.role} />
      ))}
    </ul>
  );
}
