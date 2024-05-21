import React from 'react';

import { IChatListItem, IMessageResp, ISubscription } from '@/types/chat';
import axios from 'axios';

import ChatScreen from '@/components/chat/ChatScreen';
import NavBar from '@/components/NavBar';

interface IServerChatProps {
  params: {
    id: string;
  };
  searchParams: {
    u: string;
  };
}

const api = 'https://gpt-solver-backend.onrender.com';

export default async function ServerChat(props: IServerChatProps) {
  if (!props.params.id) {
    return <div>ERROR: INVALID CHAT ID</div>;
  }

  if (!props.searchParams.u) {
    return <div>ERROR: INVALID USER ID</div>;
  }

  const { searchParams, params } = props;

  const resp = await Promise.all([
    await axios.get<IMessageResp[]>(`${api}/v1/chat/${params.id}/messages`),
    await axios.get<IChatListItem[]>(`${api}/v1/chat/list/${searchParams.u}`),
    await axios.get<ISubscription[]>(`${api}/v1/subscription?owid=${searchParams.u}`),
  ]);

  const messages = resp[0].data;
  const chats = resp[1].data;
  const subscription = resp[2].data;

  const isActive = subscription.length > 0;

  if (isActive) {
    return (
      <main className="flex flex-row bg-zinc-800 ">
        <NavBar
          resp={{
            chats,
            currentChat: props.params.id,
            u: props.searchParams.u,
            subscription: subscription[0],
          }}
        />
        <ChatScreen resp={{ messages, chatId: props.params.id }} />
      </main>
    );
  } else {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-zinc-900">
        <div className="flex flex-col items-center justify-center w-[55%] h-[50%] rounded-2xl bg-zinc-800">
          <h1 className="text-2xl font-bold mb-5">
            Você não tem um plano ativo favor entrar em contato pelo número:
          </h1>
          <p className="text-4xl font-bold"> (31) 998581608</p>
        </div>
      </div>
    );
  }
}
