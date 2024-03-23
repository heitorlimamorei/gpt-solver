'use client';
import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { IUser } from '@/hooks/useFetchUserData';
import axios from 'axios';

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
    <>
      Not signed in <br /> <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
