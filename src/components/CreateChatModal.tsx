import React, { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import axios from 'axios';

import BaseModal from './BaseModal';

interface IDarkModalProps {
  isOpen: boolean;
  toggle(): void;
}

const api = 'https://gpt-solver-backend.onrender.com';

const CreateChatModal = ({ isOpen, toggle }: IDarkModalProps) => {
  const [chatName, setChatName] = useState<string>('');
  const searchParams = useSearchParams();

  if (!isOpen) return null;

  const ownerId = searchParams.get('u');

  const handleSubmit = async () => {
    if (ownerId && chatName) {
      const resp = await axios.post(`${api}/v1/chat`, {
        name: chatName,
        ownerId,
      });
      const id = resp.data.id;
      window.location.href = `/chat/${id}?u=${ownerId}`;
      toggle();
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
    </BaseModal>
  );
};

export default CreateChatModal;
