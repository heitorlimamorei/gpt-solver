'use client';
import { useEffect, useState } from 'react';

import useChat from '@/hooks/useChat';
import HandleSenderMessage, { GenerationStates } from '@/hooks/HandleSenderMessage';
import { IMessageResp } from '@/types/chat';

import Chat from './Chat';
import InputMessage from './InputMessage';

interface IChatScreenProps {
  resp: {
    messages: IMessageResp[];
    chatId: string;
  };
}

export default function ChatScreen({ resp }: IChatScreenProps) {
  const [generationStatus, setGenerationStatus] = useState<GenerationStates>('standby');

  const handleIsGeneratioChange = (n: GenerationStates) => setGenerationStatus(n);

  const { addMessage, messages, addMessages, sortMessages } = useChat(handleIsGeneratioChange);

  useEffect(() => {
    if (resp?.messages) {
      addMessages(resp.messages);
    }
  }, [resp?.messages]);

  const handleSubmit = async (message: string) => {
    await addMessage(message);
  };

  useEffect(() => {
    if (generationStatus == 'done') {
      const message = messages[messages.length - 1];
      HandleSenderMessage({
        handleStatusChange: handleIsGeneratioChange,
        message,
        chatId: resp.chatId,
      });
    }
  }, [generationStatus, messages]);

  return (
    <div className="flex flex-col w-full h-screen">
      <Chat messages={sortMessages(messages)}></Chat>
      <InputMessage onSubmit={handleSubmit}></InputMessage>
    </div>
  );
}
