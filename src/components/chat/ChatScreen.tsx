'use client';
import { useEffect, useState } from 'react';

import HandleSenderMessage, { GenerationStates } from '@/hooks/HandleSenderMessage';
import useChat from '@/hooks/useChat';
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

  const handleIsGenerationChange = (n: GenerationStates) => setGenerationStatus(n);

  const { addMessage, messages, addMessages } = useChat(handleIsGenerationChange);

  useEffect(() => {
    if (resp?.messages) {
      addMessages(resp.messages);
    }
  }, [resp?.messages, addMessages]);

  const handleSubmit = async (message: string) => {
    await addMessage(message, async (m) => {
      await HandleSenderMessage({
        handleStatusChange: handleIsGenerationChange,
        message: m,
        chatId: resp.chatId,
      });
    });
  };

  useEffect(() => {
    if (generationStatus == 'done') {
      const message = messages[messages.length - 1];
      HandleSenderMessage({
        handleStatusChange: handleIsGenerationChange,
        message,
        chatId: resp.chatId,
      });
    }
  }, [generationStatus, messages, resp.chatId]);

  return (
    <div className="flex flex-col w-full h-screen">
      <Chat messages={messages}></Chat>
      <InputMessage sysMessage={messages[0].content} onSubmit={handleSubmit}></InputMessage>
    </div>
  );
}
