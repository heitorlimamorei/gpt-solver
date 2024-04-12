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
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    async function fetchData() {
      try {
        if (email) {
          setLoading(true);
          const result = await axios.get<IUser>(
            `https://gpt-solver-backend.onrender.com/v1/user?email=${email}`,
          );
          setUserData(result.data);

          // Redireciona imediatamente se chats estão disponíveis
          if (result.data?.chats?.length > 0) {
            // Define o timeout antes de redirecionar para evitar o redirecionamento imediato.
            timeout = setTimeout(() => {
              console.log('Tentativa de redirecionamento demorou muito. Tentando novamente...');
              router.push(`/chat/${result.data.chats[0]}?u=${result.data.id}`);
            }, 10000); // Aguarda 10s antes de tentar redirecionar novamente.

            router.push(`/chat/${result.data.chats[0]}?u=${result.data.id}`);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [email, router]);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-zinc-800 flex items-center justify-center">
        <div className="w-[40%] h-[40%] bg-zinc-700 rounded-xl flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">Redirecionando...</h1>
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
