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

const api = 'https://gpt-solver-backend.onrender.com';

export function useFetchUserData(
  email?: string | null | undefined,
  id?: string | null | undefined,
) {
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (email) {
          const result = await axios.get(`${api}/v1/user?email=${email}`);
          setUserData(result.data);
        }
        if (id) {
          const result = await axios.get(`${api}/v1/user?id=${id}`);
          setUserData(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return userData;
}
