import { useState } from 'react';

import { GenerationStates } from '@/hooks/HandleSenderMessage';
import { IMessage, IMessageResp } from '@/types/chat';
import _ from 'lodash';
import { firestoreTimestampToDate } from '@/utils/dateMethods';

interface IUseChatResp {
  messages: IMessage[];
  addMessage(message: string): Promise<void>;
  addMessages(messages: IMessageResp[]): void;
  sortMessages(messages: IMessage[]): IMessage[]
}

const getNewMessage = (role: string, content: string): IMessage => {
  return {
    id: _.uniqueId(),
    createdAt: new Date(),
    role: role,
    content: content,
  };
};

const prepareMessages = (messages: IMessageResp[]): IMessage[] => {
  return messages.map((message) => {
    return {
      id: message.id,
      createdAt: firestoreTimestampToDate(message.createdAt),
      role: message.role,
      content: message.content,
    };
  });
}

const prepareToOpenAi = (m: IMessage[]) => m.map((c) => ({role: c.role, content: c.content}));

const systemMessage = getNewMessage('system', 'Olá eu sou o GPT-SOLVER, como posso ajudar ?');

export default function useChat(handler: (n: GenerationStates) => void): IUseChatResp {
  const [messages, setMessages] = useState<IMessage[]>([systemMessage]);

  const sendToBff = async (message: IMessage) => {
    try {
      const conversation = prepareToOpenAi(sortMessages([...messages, message]));
      //resolver questão de base_url
      await fetch('http://localhost:3000/api/openAi', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          conversation: conversation,
          model: 'gpt-4',
        }),
      }).then(async (reponse: any) => {
        const reader = reponse.body?.getReader();
        handler('writing');
        setMessages((prev) => {
          return [
            ...prev,
            getNewMessage('assistant', '')
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

    const messageF = getNewMessage('user', message);

    setMessages((c) => [...c, messageF]);

    handler('done');

    await sendToBff(messageF);
  };

  const sortMessages = (messages: IMessage[]) => {
    let mReady = messages.map((m) => {
      return {
        date: m.createdAt,
        message: {
          ...m,
        },
      };
    });
    mReady = mReady.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return mReady.map(({ message }) => message);
  }

  const addMessages = async (messages: IMessageResp[]) => {
    const mr = sortMessages(prepareMessages(messages));
    setMessages(mr);
  };

  return {
    messages,
    addMessage,
    addMessages,
    sortMessages,
  };
}
