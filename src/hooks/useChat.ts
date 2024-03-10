import { useState } from 'react';

import axios from 'axios';
interface IMessage {
  content: string;
  role: string;
}

interface IUseChatResp {
  messages: IMessage[];
  addMessage(message: string): Promise<void>;
}

interface IBffResp {
  conversation: IMessage[];
  total_tokens: number;
}

const systemMessage = {
  role: 'system',
  content: 'Olá eu sou o GPT-SOLVER!',
};

export default function useChat(): IUseChatResp {
  const [messages, setMessages] = useState<IMessage[]>([systemMessage]);

  const sendToBff = async (message: IMessage) => {
    try {
      const resp = await axios.post<IBffResp>(
        'api/openAi',
        {
          conversation: [...messages, message],
          model: 'gpt-4',
        },
        {
          baseURL: process.env.BASE_URL,
        },
      );
      const { conversation, total_tokens } = resp.data;
      setMessages(conversation);
    } catch (err) {
      console.log(err);
    }
  };

  const addMessage = async (message: string) => {
    const messageF = {
      role: 'user',
      content: message,
    };

    setMessages((c) => [...c, messageF]);
    await sendToBff(messageF);
  };

  return {
    messages,
    addMessage,
  };
}
