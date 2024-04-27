'use client';
import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import axios from 'axios';

import LeftPanel from '@/components/home/LeftPanel';
import RightPanel from '@/components/home/RightPanel';

import loadingGif from '../../public/loading.gif';

interface IUser {
  id: string;
  chats: string[];
}

export default function Home() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (email: string, attempts: number = 0) => {
      setLoading(true);
      try {
        const result = await axios.get<IUser>(
          `https://gpt-solver-backend.onrender.com/v1/user?email=${email}`,
        );
        if (result.data?.chats?.length > 0) {
          router.push(`/chat/${result.data.chats[0]}?u=${result.data.id}`);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        if (attempts < 1) {
          setTimeout(() => fetchData(email, attempts + 1), 10000);
        } else {
          setLoading(false);
        }
      }
    };

    if (email) {
      fetchData(email).catch(console.error);
    }

    return () => {
      setLoading(false);
    };
  }, [email, router]);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-zinc-800 flex items-center justify-center">
        <div className="w-[40%] h-[40%] bg-zinc-700 rounded-xl flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">Por favor, aguarde. <br/> Redirecionando...</h1>
          <Image width={50} height={50} src={loadingGif} alt="Gif de loading" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row h-screen w-screen bg-zinc-800">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
