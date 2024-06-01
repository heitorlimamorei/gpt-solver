//This Hook can only be called inside the ChatScreen component tree.

import { StaticImageData } from 'next/image';

import { ChatModeType } from '@/resources/contexts/chatmode';

import useChatMode from './useChatMode';

interface ImageRepo {
  [key: string]: StaticImageData;
}

export interface IChatProperties {
  imageKey: string;
  name: string;
  getImage(repo: ImageRepo): StaticImageData;
}

interface IChatSettings {
  mode: ChatModeType;
  getChatProperties: () => IChatProperties;
  setChatProperties: (systemM: string) => void;
}

export default function useChatSettings(): IChatSettings {
  const { chatMode, handleChange } = useChatMode();

  const getChatMetadata = (systemM: string): ChatModeType => {
    if (systemM.includes('Olá, eu sou o GPT Solver, como posso ajudar?')) {
      return 'chatgpt';
    }
    if (
      systemM.includes(
        'Sou um assistente GPT, capaz de receber textos extraidos de arquivos PDFs e realizar as operações solicitadas pelo usuário.',
      )
    ) {
      return 'chatpdf';
    }
    if (
      systemM.includes(
        'Sou um assistente GPT, capaz de fazer análises de planilhas financeiras, e realizar as operações solicitadas pelo usuário.',
      )
    ) {
      return 'financial-assistant';
    }

    return 'chatgpt';
  };
  const setChatProperties = (systemM: string) => {
    if (!systemM) {
      throw new Error('System message not provided');
    }

    const chatMode = getChatMetadata(systemM);

    handleChange(chatMode);
  };

  const getChatProperties = (): IChatProperties => {
    const createChatPropsModel = (imageKey: string, name: string): IChatProperties => {
      return {
        imageKey: imageKey,
        name: name,
        getImage(repo: ImageRepo) {
          return repo[this.imageKey] ?? Object.values(repo)[0];
        },
      };
    };

    if (chatMode == 'chatgpt') {
      return createChatPropsModel('defaultAssistantImage', 'Chat GPT');
    }
    if (chatMode == 'chatpdf') {
      return createChatPropsModel('defaultAssistantImage', 'Chat PDF');
    }
    if (chatMode == 'financial-assistant') {
      return createChatPropsModel('financialControllerImage', 'Assistente Financeiro');
    }

    return createChatPropsModel('defaultAssistantImage', 'Chat GPT');
  };

  return {
    mode: chatMode,
    setChatProperties,
    getChatProperties,
  };
}
