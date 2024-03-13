import React from 'react';

import Image from 'next/image';

import { useFormat } from '@/hooks/useFormat';

import Logo from '../../../public/ai.png';
import Profile from '../../../public/profile.jpg';
import { IMessage } from './Chat';

export default function ChatMessage(message: IMessage) {
  const formattedContent = useFormat(message);
  return (
    <li className="flex flex-col w-full px-3 mt-7">
      <div className="flex flex-row">
        <Image
          width={30}
          height={30}
          alt="Ai logo"
          src={
            message.role === 'system' || message.role === 'assistant'
              ? Logo
              : Profile
          }
          className="mr-5 rounded-full"
        />
        <div className="font-bold self-center bg-transparent">
          {message.role === 'system' || message.role === 'assistant'
            ? 'AI'
            : 'Você'}
        </div>
      </div>
      <p className="mt-2 ml-[3rem] text-sm">{formattedContent}</p>
    </li>
  );
}
