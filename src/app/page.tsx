'use client';
import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import axios from 'axios';

import LeftPanel from '@/components/home/LeftPanel';
import { Loading } from '@/components/home/Loading';
import RightPanel from '@/components/home/RightPanel';

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

  const loadingPhrases = [
    'Aguarde um momento...',
    'Carregando experiências...',
    'Preparando tudo para você...',
    'Isso vai valer a pena, prometemos!',
    'Um momento de paciência vale por uma de alegria...',
    'Reunindo os melhores conteúdos para você...',
    'A mágica está acontecendo...',
    'Quase lá...',
    'Obrigado por sua paciência!',
    'Tornando tudo perfeito para você...',
    'Aproximando você do saber...',
    'Pegue um café e relaxe enquanto cuidamos de tudo...',
    'Fazendo a mágica acontecer...',
    'Transformando bytes em maravilhas...',
    'Cultivando ideias...',
    'Conectando com o universo de possibilidades...',
    'Nos bastidores, a magia está sendo tecida...',
    'Enquanto você espera, sonhe acordado...',
  ];
  if (loading) {
    return <Loading phrases={loadingPhrases} />;
  }

  return (
    <div className="flex flex-row h-screen w-screen bg-zinc-800">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
