import React from 'react';

import { IChatListItem, IMessageResp } from '@/types/chat';
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

  const resps = await Promise.all([
    await axios.get<IMessageResp[]>(`${api}/v1/chat/${params.id}/messages`),
    await axios.get<IChatListItem[]>(`${api}/v1/chat/list/${searchParams.u}`),
  ]);

  const messages = resps[0].data;
  const chats = resps[1].data;

  return (
    <main className="flex flex-row bg-zinc-800 ">
      <NavBar resp={{ chats, currentChat: props.params.id }} />
      <ChatScreen resp={{ messages, chatId: props.params.id }} />
    </main>
  );
}