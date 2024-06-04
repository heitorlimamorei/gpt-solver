'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import useFetchUserFinanceData, { ISheetDisplayData } from '@/hooks/useFetchUserFinanceData';

import BaseModal from './BaseModal';

interface ISubmitProps {
  path: string;
  payload: {
    ownerId: string;
    name: string;
    sheetId?: string;
  };
}

interface ICreateNormalChatProps {
  toggle(): void;
  ownerId: string | null;
  handleSubmit(props: ISubmitProps): Promise<void>;
}

export default function CreateFinancialAssistant({
  toggle,
  handleSubmit,
  ownerId,
}: ICreateNormalChatProps) {
  const [name, setName] = useState<string>('');
  const [selectedSheet, setSelectedSheet] = useState<string>('');
  const [options, setOptions] = useState<ISheetDisplayData[]>([]);

  const session = useSession();
  const { getUserSheetsDataByEmail } = useFetchUserFinanceData();

  const email = session.data?.user?.email;

  useEffect(() => {
    if (!email) return;
    getUserSheetsDataByEmail(email).then((data) => {
      if (data) {
        setOptions(data);
      }
    });
  }, [email]);

  const saveChat = async () => {
    if (!ownerId) return;
    if (selectedSheet == 'selecione') return;
    await handleSubmit({
      path: 'chat/fiancial-assistant',
      payload: {
        ownerId: ownerId,
        name: name,
        sheetId: selectedSheet,
      },
    });
  };
  return (
    <BaseModal toggle={toggle} handleSubmit={saveChat}>
      <div className="flex flex-row w-full items-center justify-center mb-4">
        <h2 className="text-lg font-bold">Nome do chat</h2>
      </div>
      <input
        type="text"
        className="w-full rounded-md bg-gray-700 mb-4 text-white px-4 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
        placeholder="Insira aqui o nome do seu novo chat!"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={selectedSheet ?? 'selecione'}
        onChange={(e) => setSelectedSheet(e.target.value)}
        className="form-select block w-full px-4 py-2 text-base font-normal text-gray-300 bg-gray-800 bg-clip-padding bg-no-repeat rounded transition ease-in-out m-0 focus:border-blue-600 
                border-2 border-solid border-gray-700 outline-none">
        <option key={'selecione'} value={'selecione'}>
          Escolha uma planilha
        </option>
        {options?.map((sheet: ISheetDisplayData) => {
          return (
            <option key={sheet.name} value={sheet.id}>
              {sheet.name}
            </option>
          );
        })}
      </select>
    </BaseModal>
  );
}
