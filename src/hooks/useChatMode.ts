//This Hook can only be called inside the ChatScreen component tree.

import { useContext } from 'react';

import { ChatModeCtx, IChatModeCtx } from '@/resources/contexts/chatmode';

export default function useChatMode(): IChatModeCtx {
  const chatModeCtx = useContext(ChatModeCtx);

  if (!chatModeCtx) {
    throw new Error('This Hook can only be called inside the ChatScreen component tree.');
  }

  return chatModeCtx;
}
