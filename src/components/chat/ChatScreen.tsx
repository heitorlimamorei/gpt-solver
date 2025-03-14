'use client';
import { useEffect, useState } from 'react';

import HandleSenderMessage, { GenerationStates } from '@/hooks/HandleSenderMessage';
import useChat from '@/hooks/useChat';
import useChatSettings from '@/hooks/useChatSettings';
import { AImodels } from '@/types/aimodels';
import { IMessageResp } from '@/types/chat';

import Chat from './Chat';
import InputMessage from './InputMessage';

interface IChatScreenProps {
  resp: {
    messages: IMessageResp[];
    subscription: string;
    chatId: string;
  };
}

export default function ChatScreen({ resp }: IChatScreenProps) {
  const [generationStatus, setGenerationStatus] = useState<GenerationStates>('standby');
  const [model, setModel] = useState<AImodels>('gpt-4o');

  const handleIsGenerationChange = (n: GenerationStates) => setGenerationStatus(n);

  const { addMessage, messages, addMessages } = useChat(handleIsGenerationChange);
  const { setChatProperties, mode } = useChatSettings();

  const systemM = messages.find((m) => m.role === 'system');

  useEffect(() => {
    if (resp?.messages) {
      addMessages(resp.messages);
    }
  }, [resp?.messages]);

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

  useEffect(() => {
    if (systemM) {
      setChatProperties(systemM.content);
    }
  }, [systemM]);

  const shouldBlockDemo = resp.subscription === 'fcai-demo' && mode != 'financial-assistant';

  const handleSubmit = async (message: string) => {
    if (shouldBlockDemo) return;

    await addMessage(message, model, async (m) => {
      await HandleSenderMessage({
        handleStatusChange: handleIsGenerationChange,
        message: m,
        chatId: resp.chatId,
      });
    });
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Chat messages={messages} />
      <InputMessage
        model={model}
        onModelChange={(c) => setModel(c)}
        sysMessage={messages[0].content}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
