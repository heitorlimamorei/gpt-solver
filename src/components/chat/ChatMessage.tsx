import React from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

import useChatSettings from '@/hooks/useChatSettings';
import { useFormat } from '@/hooks/useFormat';

import defaultAssistantImage from '../../../public/ai.png';
import financialControllerImage from '../../../public/fclogo.png';
import profileImage from '../../../public/Profile.png';
import { IMessage } from './Chat';

export default function ChatMessage(message: IMessage) {
  const session = useSession();

  const chatProperties = useChatSettings();

  const assistantProps = chatProperties.getChatProperties();

  const image = session.data?.user?.image;
  const name = session.data?.user?.name;

  const assistantImageRepository = {
    defaultAssistantImage: defaultAssistantImage,
    financialControllerImage: financialControllerImage,
  };

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
              ? assistantProps.getImage(assistantImageRepository)
              : image || profileImage
          }
          className="mr-5 rounded-full"
        />
        <div className="font-bold self-center bg-transparent">
          {message.role === 'system' || message.role === 'assistant' ? assistantProps.name : name}
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
