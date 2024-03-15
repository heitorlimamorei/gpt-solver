import { useState } from 'react';

import _ from 'lodash';

interface IMessage {
  content: string;
  role: string;
}

interface IUseChatResp {
  messages: IMessage[];
  addMessage(message: string): Promise<void>;
}

const systemMessage = {
  role: 'system',
  content: 'Olá eu sou o GPT-SOLVER!',
};

export default function useChat(): IUseChatResp {
  const [messages, setMessages] = useState<IMessage[]>([systemMessage]);

  const sendToBff = async (message: IMessage) => {
    try {
      await fetch('api/openAi', {
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
      });
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
