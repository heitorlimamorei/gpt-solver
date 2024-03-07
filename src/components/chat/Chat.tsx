import React from 'react';

import Image from 'next/image';

import Logo from '../../../public/ai.png';
import Profile from '../../../public/profile.jpg';

export interface ChatType {
  role: string;
  content: string;
}

interface ChatProps {
  messages: Array<ChatType>;
}

export default function Chat(props: ChatProps) {
  let color = false;
  return (
    <div className="flex flex-col md:items-center w-full h-full sm:px-20 md:px-72">
      {props.messages.map((m, index) => {
        return (
          <div key={index} className="flex flex-col w-full px-3 mt-7">
            <div className="flex flex-row">
              <Image
                width={30}
                height={30}
                alt="Ai logo"
                src={m.role == 'system' ? Logo : Profile}
                className="mr-5 rounded-full"></Image>
              <p className="font-bold self-center bg-transparent">
                {m.role == 'system' ? 'AI' : 'Você'}
              </p>
            </div>
            <p className="mt-2 ml-[3rem] text-sm">{m.content}</p>
          </div>
        );
      })}
    </div>
  );
}
