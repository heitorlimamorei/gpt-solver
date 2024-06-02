'use client';

import { useState } from "react";
import BaseModal from "./BaseModal";

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

export default function   CreatePdfChat({ toggle, handleSubmit, ownerId }: ICreateNormalChatProps) {
  const [name, setName] = useState<string>('');

  const saveChat = async () => {
    if (!ownerId) return;
    await handleSubmit({
      path: 'chat/chatpdf',
      payload: {
        ownerId: ownerId,
        name: name,
      },
    });
  };

  return (
    <BaseModal toggle={toggle} handleSubmit={saveChat}>
      <div className="flex flex-row w-full items-center justify-center mb-4">
        <h2 className="text-lg font-bold">Nome do chat PDF</h2>
      </div>
      <input
        type="text"
        className="w-full rounded-md bg-gray-700 mb-4 text-white px-4 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
        placeholder="Insira aqui o nome do seu novo chat!"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </BaseModal>
  );
}
