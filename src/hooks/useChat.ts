import { useState } from 'react';

import { GenerationStates } from '@/hooks/HandleSenderMessage';
import { IMessage, IMessageResp } from '@/types/chat';
import { firestoreTimestampToDate } from '@/utils/dateMethods';
import _ from 'lodash';

interface IUseChatResp {
  messages: IMessage[];
  addMessage(message: string): Promise<void>;
  addVisionMessage(message: string, imageUrl: string): Promise<void>;
  addMessages(messages: IMessageResp[]): void;
  sortMessages(messages: IMessage[]): IMessage[];
}

const getNewMessage = (role: string, content: string): IMessage => {
  return {
    id: _.uniqueId(),
    createdAt: new Date(),
    role: role,
    content: content,
  };
};

const getNewVMessage = (role: string, content: string, imageUrl: string): IMessage => {
  return {
    id: _.uniqueId(),
    createdAt: new Date(),
    role: role,
    content: content,
    image_url: imageUrl,
  };
};

const prepareMessages = (messages: IMessageResp[]): IMessage[] => {
  return messages.map((message) => {
    if (message.image_url) {
      return {
        id: message.id,
        createdAt: firestoreTimestampToDate(message.createdAt),
        role: message.role,
        content: message.content,
        image_url: message.image_url,
      };
    }
    return {
      id: message.id,
      createdAt: firestoreTimestampToDate(message.createdAt),
      role: message.role,
      content: message.content,
    };
  });
};

const prepareToOpenAi = (m: IMessage[]) =>
  m.map((c) => {
    if (c.image_url) {
      return {
        role: c.role,
        content: [
          {
            type: 'text',
            text: c.content,
          },
          {
            type: 'image_url',
            image_url: {
              url: c.image_url,
            },
          },
        ],
      };
    }
    return {
      role: c.role,
      content: c.content,
    };
  });

const systemMessage = getNewMessage('system', 'Olá eu sou o GPT-SOLVER, como posso ajudar ?');

export default function useChat(handler: (n: GenerationStates) => void): IUseChatResp {
  const [messages, setMessages] = useState<IMessage[]>([systemMessage]);

  const reponseDecoder = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
    handler('writing');
    setMessages((prev) => {
      return [...prev, getNewMessage('assistant', '')];
    });

    let i = _.findLastIndex(messages) + 2;
    let lastChuck = '';

    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      let currentChunck = decoder.decode(value);

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
  }

  const sendToBff = async (message: IMessage) => {
    const base_url = 'http://localhost:3000';
    try {
      const conversation = prepareToOpenAi(sortMessages([...messages, message]));
      if (message.image_url) {
        await fetch(`${base_url}/api/openAi/vision`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            conversation: conversation,
          }),
        }).then(async (reponse) => {
          const reader = reponse.body?.getReader();
         
          if (reader) await reponseDecoder(reader);
        });
      }
      await fetch(`${base_url}/api/openAi`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          conversation: conversation,
          model: 'gpt-4',
        }),
      }).then(async (reponse) => {
        const reader = reponse.body?.getReader();
       
        if (reader) await reponseDecoder(reader);
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

  const addVisionMessage = async (message: string, imageUrl: string) => {
    handler('writing');

    const messageF = getNewVMessage('user', '', imageUrl);

    handler('done');

    await sendToBff(messageF);
  }

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
    addVisionMessage,
    sortMessages,
  };
}
