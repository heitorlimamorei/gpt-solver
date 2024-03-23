import { IMessage } from '@/types/chat';
import axios from 'axios';

export type GenerationStates = 'standby' | 'writing' | 'done';

const api = 'https://gpt-solver-backend.onrender.com';

interface IUseSenderMessageProps {
  chatId: string;
  message: IMessage;
  handleStatusChange: (n: GenerationStates) => void;
}

export default async function HandleSenderMessage({
  handleStatusChange,
  message,
  chatId,
}: IUseSenderMessageProps) {
  const saveMessage = async (chatId: string, message: IMessage) => {
    if (!message) return;

    if (message.role != 'system') {
      await axios.post(`${api}/v1/chat/${chatId}/messages`, {
        chatId: chatId,
        content: message.content,
        role: message.role,
      });
    }
    handleStatusChange('standby');
  };

  await saveMessage(chatId, message);
}
