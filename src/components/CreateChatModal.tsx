import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { useFetchUserData } from '@/hooks/useFetchUserData';
import useFetchUserFinanceData from '@/hooks/useFetchUserFinanceData';
import { ISubscription } from '@/types/chat';
import axios from 'axios';

import BaseModal from './BaseModal';

interface IDarkModalProps {
  isOpen: boolean;
  toggle(): void;
  subscription: ISubscription;
}

interface UserFinanceData {
  id: string;
  sheetIds: string[];
  email: string;
  name: string;
}

interface SheetData {
  id: string;
  name: string;
  owner: string;
}

const api = 'https://gpt-solver-backend.onrender.com';

export default function CreateChatModal({ isOpen, toggle, subscription }: IDarkModalProps) {
  const { getUserFinanceData, getUserSheetsData } = useFetchUserFinanceData();

  const [chatName, setChatName] = useState<string>('');
  const [chatType, setChatType] = useState<string>('');

  const [userFinanceData, setUserFinanceData] = useState<UserFinanceData>();

  const [userSheets, setUserSheets] = useState<SheetData[]>();
  const [selectedSheetId, setSelectedSheetId] = useState<string>();

  const searchParams = useSearchParams();

  const ownerId = searchParams.get('u');
  const userData = useFetchUserData(null, ownerId);

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.email) {
        const data = await getUserFinanceData(userData?.email);
        setUserFinanceData(data);
      }
    };
    fetchData();
  }, [userData?.email]);

  useEffect(() => {
    const fetchSheets = async () => {
      if (userFinanceData?.id) {
        const data = await getUserSheetsData(userFinanceData?.id);
        setUserSheets(data);
        console.log(data);
      }
    };
    fetchSheets();
  }, [userFinanceData?.id]);

  if (!isOpen) return null;

  const plan = subscription?.subscriptionType;

  const handleSelectSheet = async (event: any) => {
    setSelectedSheetId(event.target.value);
  };

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
          selectedSheetId,
        });
      }
      const id = resp.data.id;
      window.location.href = `/chat/${id}?u=${ownerId}`;
      toggle();
    }
  };
  if (plan == 'ultimate') {
    return (
      <>
        <BaseModal
          buttons={false}
          className={`${chatType == '' ? 'flex' : 'hidden'}`}
          toggle={toggle}
          handleSubmit={handleSubmit}>
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
        <BaseModal
          buttons={true}
          className={`${chatType != '' ? 'flex' : 'hidden'}`}
          toggle={toggle}
          handleSubmit={handleSubmit}>
          <div className={'flex-col'}>
            <div className="flex flex-row w-full items-center justify-center mb-4">
              <h2 className="text-lg font-bold">Nome do chat</h2>
            </div>
            <div className={`${chatType == 'finance' ? 'flex flex-col my-2' : 'hidden'}`}>
              <label>Escolha a planilha:</label>
              <select
                className="form-select block w-full px-4 py-2 text-base font-normal text-gray-300 bg-gray-800 bg-clip-padding bg-no-repeat rounded transition ease-in-out m-0 focus:border-blue-600 
                border-2 border-solid border-gray-700 outline-none">
                {userSheets?.map((sheet: SheetData) => {
                  return (
                    <option key={sheet.name} value={sheet.id} onChange={handleSelectSheet}>
                      {sheet.name}
                    </option>
                  );
                })}
              </select>
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
      </>
    );
  }
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
}
