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

export function useFetchUserData() {
  async function fetchByEmail(email: string): Promise<IUser> {
    const resp = await axios.get<IUser>(`${api}/v1/user?email=${email}`);

    if (resp.status !== 200) console.error('Error when fetching user data');

    return resp.data;
  }

  async function fetchUser(id: string): Promise<IUser> {
    const resp = await axios.get<IUser>(`${api}/v1/user?id=${id}`);

    if (resp.status !== 200) console.error('Error when fetching user data');

    return resp.data;
  }
  return {
    fetchByEmail,
    fetchUser,
  };
}
