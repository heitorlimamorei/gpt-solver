import React, { useState, useEffect } from 'react';

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
  const [checked, setChecked] = useState(false);
  const [plan, setPlan] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPlan = async () => {
      const ownerId = searchParams.get('u');
      if (ownerId) {
        const resp = await axios.get(`${api}/v1/subscription/?owid=${ownerId}`);
        setPlan(resp.data[0].subscriptionType);
      }
    };

    fetchPlan();
  }, []);
  if (!isOpen) return null;

  const ownerId = searchParams.get('u');

  const handleSubmit = async () => {
    if (ownerId && chatName) {
      let resp;
      if (checked) {
        resp = await axios.post(`${api}/v1/chat`, {
          name: chatName,
          ownerId,
        });
      } else {
        resp = await axios.post(`${api}/v1/chat/chatpdf`, {
          name: chatName,
          ownerId,
        });
      }
      const id = resp.data.id;
      window.location.href = `/chat/${id}?u=${ownerId}`;
      toggle();
    }
  };

  const handleCheckboxChange = () => {
    setChecked((c) => !c);
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

      <div className={plan == 'ultimate' ? 'flex flex-col' : 'hidden'}>
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label>Criar chat pdf?</label>
        <div
          className={`w-6 h-6 p-1 flex justify-center items-center mr-2 border ${
            checked ? 'border-transparent bg-blue-600' : 'bg-white border-gray-400'
          } rounded`}></div>
      </div>
    </BaseModal>
  );
};

export default CreateChatModal;
