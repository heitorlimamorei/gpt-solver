import React, { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { ISubscription } from '@/types/chat';
import axios from 'axios';

import BaseModal from './BaseModal';
import CreateFinancialAssistant from './CreateFinancialAssistantModal';
import CreateNormalChat from './CreateNormalChat';
import CreatePdfChat from './CreatePdfChatModal';

type ChatType = 'normal' | 'financial-assistant' | 'pdf' | '';

interface IDarkModalProps {
  toggle(): void;
  subscription: ISubscription;
}

interface ISubmitProps {
  path: string;
  payload: {
    ownerId: string;
    name: string;
    sheetId?: string;
  };
}

const api = 'https://gpt-solver-backend.onrender.com';

export default function CreateChatModal({ toggle, subscription }: IDarkModalProps) {
  const [chatType, setChatType] = useState<ChatType>('');
  const searchParams = useSearchParams();

  const ownerId = searchParams.get('u');
  const plan = subscription?.subscriptionType;

  const handleSubmit = async ({ path, payload }: ISubmitProps) => {
    try {
      if (!path) {
        throw new Error('Path is required');
      }
      console.log(payload);
      if (!payload.name || !payload.ownerId) {
        throw new Error('Name and ownerId are required');
      }

      if (path == 'financial-assistant') {
        if (!payload.sheetId) {
          throw new Error('SheetId is required');
        }
      }

      const resp = await axios.post(`${api}/v1/${path}`, payload);

      if (!(resp.status == 200 || resp.status == 201)) {
        throw new Error(`ERROR: Sheet select req failed with status ${resp.status}`);
      }

      const id = resp.data.id;
      window.location.href = `/chat/${id}?u=${payload.ownerId}`;
      toggle();
    } catch (e) {
      console.log(`ERROR: Sheet select error: ${e}`);
    }
  };

  const chatOpts = [
    {
      title: 'Chat PDF',
      description: 'Chat capaz de analisar e extrair dados de PDFs fornecidos pelo usuário.',
      ultimate: true,
      handler() {
        setChatType('pdf');
      },
    },
    {
      title: 'Chat GPT',
      description: `Um assistente pronto para oferecer auxílio em qualquer
      tópico.`,
      ultimate: false,
      handler() {
        setChatType('normal');
      },
    },
    {
      title: 'Financial Assistant',
      description: `Assistente financeiro capaz de analisar e gerar gráficos baseados
      em suas planilhas do Financial Controller.`,
      ultimate: true,
      handler() {
        setChatType('financial-assistant');
      },
    },
  ];

  if (!chatType) {
    return (
      <BaseModal buttons={false} className={''} toggle={toggle} handleSubmit={() => {}}>
        <div className={`${chatType == '' ? 'flex' : 'hidden'} flex-col w-full h-full`}>
          <h1 className="font-bold text-lg">Escolha seu tipo de chat</h1>
          <div className="p-2 w-full">
            {chatOpts
              .filter((opt) => {
                if (plan == 'fcai-demo') {
                  if (opt.title == 'Financial Assistant') {
                    return true;
                  } else {
                    return false;
                  }
                }
                if (!opt.ultimate) return true;

                if (plan == 'ultimate') return true;

                return false;
              })
              .map((opt) => (
                <div
                  key={opt.title}
                  className="w-full h-full hover:cursor-pointer rounded-xl p-4 border-2 border-gray-700 hover:border-blue-700 mb-2"
                  onClick={opt.handler}>
                  <h1 className="font-bold text-2lg">{opt.title}</h1>
                  <p className="text-justify">{opt.description}</p>
                </div>
              ))}
          </div>
        </div>
      </BaseModal>
    );
  }

  if (chatType == 'normal') {
    return (
      <>
        <CreateNormalChat ownerId={ownerId} toggle={toggle} handleSubmit={handleSubmit} />
      </>
    );
  }

  if (chatType == 'pdf') {
    return (
      <>
        <CreatePdfChat ownerId={ownerId} toggle={toggle} handleSubmit={handleSubmit} />
      </>
    );
  }

  if (chatType == 'financial-assistant') {
    return (
      <>
        <CreateFinancialAssistant ownerId={ownerId} toggle={toggle} handleSubmit={handleSubmit} />
      </>
    );
  }
}
