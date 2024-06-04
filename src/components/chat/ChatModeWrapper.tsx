'use client';
import ChatModeProvider from '@/resources/contexts/chatmode';

export default function ChatModeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChatModeProvider>{children}</ChatModeProvider>
    </>
  );
}
