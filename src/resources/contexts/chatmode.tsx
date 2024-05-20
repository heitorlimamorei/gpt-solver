import { createContext, useState } from 'react';

export type ChatModeType = 'chatgpt' | 'chatpdf' | 'financial-assistant';

export interface IChatModeCtx {
  chatMode: ChatModeType;
  handleChange: (mode: ChatModeType) => void;
}

export const ChatModeCtx = createContext<IChatModeCtx>({
  chatMode: 'chatgpt',
  handleChange: () => {},
});

const ChatModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatMode, setChatMode] = useState<ChatModeType>('chatgpt');

  const handleChange = (mode: ChatModeType) => {
    setChatMode(mode);
  };

  return <ChatModeCtx.Provider value={{ chatMode, handleChange }}>{children}</ChatModeCtx.Provider>;
};

export default ChatModeProvider;
