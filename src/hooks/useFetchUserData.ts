import { useEffect, useState } from 'react';
import axios from 'axios';

export interface IUser {
  id: string;
  chats: string[];
  totalTokens: number;
  email: string;
  createdAt: object;
  name: string;
  plan: string;
}

export function useFetchUserData(email: string | null | undefined) {
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `https://gpt-solver-backend.onrender.com/v1/user?email=${email}`,
        );
        setUserData(result.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return userData;
}
