'use client';
import { useState } from 'react';

import useChat from '@/hooks/useChat';

import Chat, { IMessage } from './Chat';
import InputMessage from './InputMessage';

export default function ChatScreen() {
  const { addMessage, messages } = useChat();
  const handleSubmit = async (message: string) => {
    await addMessage(message);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Chat messages={messages}></Chat>
      <InputMessage onSubmit={handleSubmit}></InputMessage>
    </div>
  );
}
