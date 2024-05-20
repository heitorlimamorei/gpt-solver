import { useState } from 'react';

import { GenerationStates } from '@/hooks/HandleSenderMessage';
import ChatStream from '@/resources/stream';
import { IMessage, IMessageResp } from '@/types/chat';
import { firestoreTimestampToDate } from '@/utils/dateMethods';
import _ from 'lodash';

type sF = (m: IMessage) => Promise<void>;

interface IUseChatResp {
  messages: IMessage[];
  addMessage(message: string, h: sF): Promise<void>;
  addMessages(messages: IMessageResp[]): void;
  sortMessages(messages: IMessage[]): IMessage[];
}

type writterFunction = (message: string) => string;

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
};

const prepareToOpenAi = (m: IMessage[]) => m.map((c) => ({ role: c.role, content: c.content }));

const systemMessage = getNewMessage('system', 'Olá eu sou o GPT-SOLVER, como posso ajudar ?');

export default function useChat(handler: (n: GenerationStates) => void): IUseChatResp {
  const [messages, setMessages] = useState<IMessage[]>([systemMessage]);

  function handleChunkChange(w: writterFunction) {
    let i = _.findLastIndex(messages) + 2;
    setMessages((prev) => {
      let messages = [...prev];
      let message = messages[i];

      const result = w(message.content);

      message.content = result;
      messages[i] = message;

      return messages;
    });
  }

  const sendToBff = async (message: IMessage) => {
    try {
      const conversation = prepareToOpenAi(sortMessages([...messages, message]));

      handler('writing');

      setMessages((prev) => {
        return [...prev, getNewMessage('assistant', '')];
      });

      await ChatStream({
        conversation,
        handleChange: handleChunkChange,
        url: 'http://localhost:3000/api/openAi',
      });

      handler('done');
    } catch (err) {
      setMessages((prev) => {
        return prev.filter((c, i) => {
          return i !== _.findLastIndex(prev);
        });
      });
      handler('standby');
      console.log(err);
    }
  };

  const addMessage = async (message: string, h: sF): Promise<void> => {
    handler('writing');

    const messageF = getNewMessage('user', message);

    const msgs = [...messages, messageF];

    setMessages(msgs);

    handler('done');

    await Promise.all([h(messageF), sendToBff(messageF)]);
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
    mReady = mReady.sort((a, b) => a.date.getTime() - b.date.getTime());
    return mReady.map(({ message }) => message);
  };

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
