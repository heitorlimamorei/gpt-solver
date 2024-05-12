import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { ISubscription } from '@/types/chat';
import axios from 'axios';

import BaseModal from './BaseModal';

interface IDarkModalProps {
  isOpen: boolean;
  toggle(): void;
  subscription: ISubscription;
}

const api = 'https://gpt-solver-backend.onrender.com';

const CreateChatModal = ({ isOpen, toggle, subscription }: IDarkModalProps) => {
  const [chatName, setChatName] = useState<string>('');
  const [checked, setChecked] = useState(true);
  const searchParams = useSearchParams();

  if (!isOpen) return null;

  const ownerId = searchParams.get('u');
  const plan = subscription?.subscriptionType;

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
    setChecked(!checked);
  };

  return (
    <>
      <BaseModal toggle={toggle} handleSubmit={handleSubmit}>
        <div className="flex flex-row w-full items-center justify-between mb-4">
          <div
            onClick={handleCheckboxChange}
            className={
              plan == 'ultimate'
                ? `flex flex-col self-start justify-self-start ${checked ? 'bg-zinc-400' : 'bg-green-500'} rounded-2xl hover:cursor-pointer py-[0.5rem] px-[1.5rem]`
                : 'hidden'
            }>
            <div className="font-bold">PDF</div>
          </div>
          <div className="w-full flex items-center justify-center">
            <h2 className="text-lg font-bold mr-14">Configurar novo Chat</h2>
          </div>
        </div>
        <input
          type="text"
          className="w-full rounded-md bg-gray-700 mb-4 text-white px-4 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
          placeholder="Nome do Chat"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
      </BaseModal>
    </>
  );
};

export default CreateChatModal;
