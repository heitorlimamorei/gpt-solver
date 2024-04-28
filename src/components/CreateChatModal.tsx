import React, { useState } from 'react';

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import axios from 'axios';

import BaseModal from './BaseModal';
import { IconChecked } from './Icons';
interface IDarkModalProps {
  isOpen: boolean;
  toggle(): void;
}

const api = 'https://gpt-solver-backend.onrender.com';

const CreateChatModal = ({ isOpen, toggle }: IDarkModalProps) => {
  const [chatName, setChatName] = useState<string>('');
  const searchParams = useSearchParams();
  const [checked, setChecked] = useState(false);
  const { data: session } = useSession();

  if (!isOpen) return null;

  const ownerId = searchParams.get('u');

  const handleCheckboxChange = () => {
    setChecked((c) => !c);
  };

  const handleSubmit = async () => {
    if (ownerId && chatName) {
      if (checked) {
        const resp = await axios.post(`${api}/v1/chat/chatpdf`, {
          name: chatName,
          ownerId,
        });

        const id = resp.data.id;
        window.location.href = `/chat/${id}?u=${ownerId}`;
        toggle();
      } else {
        const resp = await axios.post(`${api}/v1/chat`, {
          name: chatName,
          ownerId,
        });

        const id = resp.data.id;
        window.location.href = `/chat/${id}?u=${ownerId}`;
        toggle();
      }
    }
  };

  return (
    <BaseModal toggle={toggle} handleSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Configurar novo Chat</h2>

      <input
        type="text"
        className="w-full rounded-md bg-gray-700 mb-4 text-white px-4 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
        placeholder="Nome do Chat"
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
      />
      <div
        className={
          session?.user?.email?.toString() == 'feliperese2018@gmail.com'
            ? 'flex flex-col items-start'
            : 'hidden'
        }>
        <label>Deseja criar um chat pdf?</label>

        <input type="checkbox" checked={checked} className="hidden" />
        <div
          className={`w-5 h-5 flex justify-center items-center mr-2 border ${
            checked ? 'border-transparent bg-blue-600' : 'bg-white border-gray-400'
          } rounded`}
          onClick={handleCheckboxChange}>
          <div className={`${checked ? 'flex' : 'hidden'}`}>{IconChecked()}</div>
        </div>
      </div>
    </BaseModal>
  );
};

export default CreateChatModal;
