import React, { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import axios from 'axios';

interface IDarkModalProps {
  isOpen: boolean;
  toggle(): void;
  onSave(): void;
}

const api = 'https://gpt-solver-backend.onrender.com';

const DarkModal = ({ isOpen, toggle }: IDarkModalProps) => {
  const [chatName, setChatName] = useState<string>('');
  const searchParams = useSearchParams();

  if (!isOpen) return null;

  const ownerId = searchParams.get('u');

  const handleSubmit = async () => {
    if (ownerId && chatName) {
      const resp = await axios.post(`${api}/v1/chat`, { name: chatName, ownerId });
      const id = resp.data.id;
      window.location.href = `/chat/${id}?u=${ownerId}`;
      toggle();
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
      onClick={toggle}>
      <div
        className="bg-gray-800 rounded-lg text-white overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full p-4"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">Configurar novo Chat</h2>

        <input
          type="text"
          className="w-full rounded-md bg-gray-700 mb-4 text-white px-4 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
          placeholder="Nome do Chat"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />

        <div className="flex justify-between space-x-2">
          <button
            className="mt-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleSubmit}>
            Salvar
          </button>
          <button
            className="mt-2 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={toggle}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DarkModal;
