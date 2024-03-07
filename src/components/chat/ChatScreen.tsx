'use client';
import { useState } from 'react';

import Chat, { ChatType } from './Chat';
import InputMessage from './InputMessage';

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatType[]>([
    {
      role: 'user',
      content: 'Olá, qual seu nome?',
    },
    {
      role: 'system',
      content: 'Olá, sou o chatterson',
    },
  ]);

  const handleSubmit = (message: string) => {
    let format = {
      role: 'user',
      content: message,
    };
    setMessages((prevMessages) => [...prevMessages, format]);
    console.log(messages);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Chat messages={messages}></Chat>
      <InputMessage onSubmit={handleSubmit}></InputMessage>
    </div>
  );
}
