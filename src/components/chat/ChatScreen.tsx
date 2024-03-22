'use client';
import useChat from '@/hooks/useChat';

import Chat, { IMessage } from './Chat';
import InputMessage from './InputMessage';

interface IChatScreenProps {
  resp?: {
    messages: IMessage[];
  }
}

export default function ChatScreen({ resp }: IChatScreenProps) {
  const { addMessage, messages} = useChat();

  let cm = messages;

  if (resp) {
    if (resp.messages != null) {
      resp.messages.forEach((m) => {
        if (m.role != "system") {
         cm = [...cm, m];
        }
      });
    }
  }

  const handleSubmit = async (message: string) => {
    await addMessage(message);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Chat messages={cm}></Chat>
      <InputMessage onSubmit={handleSubmit}></InputMessage>
    </div>
  );
}
