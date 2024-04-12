import React from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { useFormat } from '@/hooks/useFormat';

import Logo from '../../../public/ai.png';
import { IMessage } from './Chat';

export default function ChatMessage(message: IMessage) {
  const session = useSession();

  const image = session.data?.user?.image;
  const name = session.data?.user?.name;

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
              : image || '../../../../public/Profile.png'
          }
          className="mr-5 rounded-full"
        />
        <div className="font-bold self-center bg-transparent">
          {message.role === 'system' || message.role === 'assistant' ? 'AI' : name}
        </div>
      </div>
      <ul className="mt-2 ml-[3rem] text-sm mx-2">
        {formattedContent.map((element, index) => (
          <li key={index} className="mt-3 text-[1rem]">
            <React.Fragment key={index}>{element}</React.Fragment>
          </li>
        ))}
      </ul>
    </li>
  );
}
