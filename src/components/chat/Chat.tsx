import React from 'react';

import Image from 'next/image';

import Logo from '../../../public/ai.png';
import Profile from '../../../public/profile.jpg';

export interface IMessage {
  role: string;
  content: string;
}

interface IChatProps {
  messages: IMessage[];
}

export default function Chat(props: IChatProps) {
  return (
    <ul className="flex flex-col md:items-center w-full h-full px-3 sm:px-20 md:px-72 overflow-y-scroll">
      {props.messages.map((m, index) => {
        return (
          <li key={index} className="flex flex-col w-full px-3 mt-7">
            <div className="flex flex-row">
              <Image
                width={30}
                height={30}
                alt="Ai logo"
                src={m.role == 'system' || m.role == 'assistant' ? Logo : Profile}
                className="mr-5 rounded-full"></Image>
              <p className="font-bold self-center bg-transparent">
                {m.role == 'system' || m.role == 'assistant' ? 'AI' : 'Você'}
              </p>
            </div>
            <p className="mt-2 ml-[3rem] text-sm">{m.content}</p>
          </li>
        );
      })}
    </ul>
  );
}
