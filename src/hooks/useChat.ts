import { useState } from 'react';

import { GenerationStates } from '@/hooks/HandleSenderMessage';
import { IMessage, IMessageResp } from '@/types/chat';
import _ from 'lodash';

interface IUseChatResp {
  messages: IMessage[];
  addMessage(message: string): Promise<void>;
  addMessages(messages: IMessage[]): void;
}

const systemMessage = {
  role: 'system',
  content: 'Olá eu sou o GPT-SOLVER!',
};

export default function useChat(handler: (n: GenerationStates) => void): IUseChatResp {
  const [messages, setMessages] = useState<IMessage[]>([systemMessage]);

  const sendToBff = async (message: IMessage) => {
    try {
      //resolver quesdtão de base_url
      await fetch('http://localhost:3000/api/openAi', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          conversation: [...messages, message],
          model: 'gpt-4',
        }),
      }).then(async (reponse: any) => {
        const reader = reponse.body?.getReader();
        handler('writing');
        setMessages((prev) => {
          return [
            ...prev,
            {
              role: 'assistant',
              content: '',
            },
          ];
        });

        let i = _.findLastIndex(messages) + 2;
        let lastChuck = '';

        while (true) {
          const { value, done } = await reader?.read();

          if (done) {
            break;
          }

          let currentChunck = new TextDecoder().decode(value);
          if (currentChunck != null) {
            setMessages((prev) => {
              let messages = [...prev];
              let message = messages[i];
              if (currentChunck != lastChuck) {
                message.content = message.content.concat(currentChunck);
                messages[i] = message;
              }
              lastChuck = currentChunck;
              return messages;
            });
          }
        }
        handler('done');
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addMessage = async (message: string) => {
    handler('writing');

    const messageF = {
      role: 'user',
      content: message,
    };

    setMessages((c) => [...c, messageF]);

    handler('done');

    await sendToBff(messageF);
  };

  const addMessages = async (messages: IMessageResp[]) => {
    const mr = messages.map(({ role, content }) => {
      return {
        role,
        content,
      };
    });
    setMessages(mr);
  };

  return {
    messages,
    addMessage,
    addMessages,
  };
}
