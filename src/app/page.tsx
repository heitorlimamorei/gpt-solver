'use client';
import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { IUser } from '@/hooks/useFetchUserData';
import axios from 'axios';
import LeftPanel from '@/components/home/LeftPanel';
import RightPanel from '@/components/home/RightPanel';
import Button from '@/components/generic/Button';

export default function Home() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (email) {
          const result = await axios.get(
            `https://gpt-solver-backend.onrender.com/v1/user?email=${email}`,
          );
          setUserData(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [email]);

  if (session && userData && userData.chats && userData.chats.length > 0) {
    return redirect(`/chat/${userData.chats[0]}?u=${userData.id}`);
  }

  return (
    <div
      className="flex flex-row h-screen w-screen
     bg-zinc-800">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
