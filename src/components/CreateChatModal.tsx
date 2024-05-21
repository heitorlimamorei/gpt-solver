import React, { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { ISubscription } from '@/types/chat';
import axios from 'axios';

import BaseModal from './BaseModal';

interface IDarkModalProps {
  toggle(): void;
  subscription: ISubscription;
}

const api = 'https://gpt-solver-backend.onrender.com';

const CreateChatModal = ({ toggle, subscription }: IDarkModalProps) => {
  const [chatName, setChatName] = useState<string>('');
  const [chatType, setChatType] = useState<string>('');
  const searchParams = useSearchParams();

  const ownerId = searchParams.get('u');
  const plan = subscription?.subscriptionType;

  const handleSubmit = async () => {
    if (ownerId && chatName) {
      let resp;
      if (chatType == 'normal') {
        resp = await axios.post(`${api}/v1/chat`, {
          name: chatName,
          ownerId,
        });
      }
      if (chatType == 'pdf') {
        resp = await axios.post(`${api}/v1/chat/chatpdf`, {
          name: chatName,
          ownerId,
        });
      } else {
        resp = await axios.post(`${api}/v1/chat/financial-assistant`, {
          name: chatName,
          ownerId,
        });
      }
      const id = resp.data.id;
      window.location.href = `/chat/${id}?u=${ownerId}`;
      toggle();
    }
  };

  if (plan == 'basic') {
    setChatType('normal');
    return (
      <>
        <BaseModal toggle={toggle} handleSubmit={handleSubmit}>
          <div className="flex flex-row w-full items-center justify-center mb-4">
            <h2 className="text-lg font-bold">Nome do chat</h2>
          </div>
          <input
            type="text"
            className="w-full rounded-md bg-gray-700 mb-4 text-white px-4 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Insira aqui o nome do seu novo chat!"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
          />
        </BaseModal>
      </>
    );
  }

  if (plan == 'ultimate') {
    return (
      <>
        {chatType != '' ? (
          <BaseModal buttons={true} className={''} toggle={toggle} handleSubmit={handleSubmit}>
            <div className={'flex-col'}>
              <div className="flex flex-row w-full items-center justify-center mb-4">
                <h2 className="text-lg font-bold">Nome do chat</h2>
              </div>
              <input
                type="text"
                className="w-full rounded-md bg-gray-700 mb-4 text-white px-4 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="Insira aqui o nome do seu novo chat!"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
            </div>
          </BaseModal>
        ) : (
          <BaseModal buttons={false} className={''} toggle={toggle} handleSubmit={() => {}}>
            <div className={`${chatType == '' ? 'flex' : 'hidden'} flex-col w-full h-full`}>
              <h1 className="font-bold text-lg">Escolha seu tipo de chat</h1>
              <div className="p-2 w-full">
                <div
                  className="w-full h-full hover:cursor-pointer rounded-xl p-4 border-2 border-gray-700 hover:border-blue-700 mb-2"
                  onClick={() => setChatType('pdf')}>
                  <h1 className="font-bold text-2lg">Chat PDF</h1>
                  <p className="text-justify">
                    Chat capaz de analisar e estarir dados de PDFs formecidos pelo usuario
                  </p>
                </div>
                <div
                  className="w-full h-full hover:cursor-pointer rounded-xl p-4 border-2 border-gray-700 hover:border-blue-700 mb-2"
                  onClick={() => setChatType('normal')}>
                  <h1 className="font-bold text-2lg">Chat Padrão</h1>
                  <p className="text-justify">
                    Um chat assistente pronto para oferecer auxílio em qualquer tópico.
                  </p>
                </div>
                <div
                  className="w-full h-full hover:cursor-pointer rounded-xl p-4 border-2 border-gray-700 hover:border-blue-700 mb-2"
                  onClick={() => setChatType('finance')}>
                  <h1 className="font-bold text-2lg">Financial Assistant</h1>
                  <p className="text-justify">
                    Assistente financeiro capaz de analisar e gerar gráficos baseado em planilhas do
                    Financial Controller.
                  </p>
                </div>
              </div>
            </div>
          </BaseModal>
        )}
      </>
    );
  }
};

export default CreateChatModal;
