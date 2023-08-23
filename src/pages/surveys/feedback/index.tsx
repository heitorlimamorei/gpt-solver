import React from 'react'
import axios from 'axios';
import Layout from '../../../components/template/Layout'
import SurveyForm from '../../../components/template/SurveyForm'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import variaveis  from '../../../model/variaveis';

interface IuserProps {
    user_name: string;
    email: string;
    user_url: string;
}

export default function Feedback () {
  const [user, setUser] = useState<IuserProps>(null);
  const router = useRouter();
  const { data } = useSession();
  const { BASE_URL } = variaveis;


  useEffect(() => {
    const userData = data?.user;
    if (!userData?.email && !userData?.name && !userData?.image) return;

    setUser({
      email: userData.email,
      user_name: userData.name,
      user_url: userData.image,
    });
  }, [data]);


  const handleSubmit = async (payload: {stars: number; text: string}) => {
    const { data } = await axios.post(`${BASE_URL}/api/feedback`, {
        stars: payload.stars,
        text: payload.text,
        user_url: user.user_url,
        user_name: user.user_name,
    });
  }

  const handleClose = () => {
    router.push('/')
  }

  return (
    <div className='h-screen'>
        <Layout titulo='' subtitulo=''>
            <SurveyForm title='Queremos saber sua opinião!' onSubmit={handleSubmit} onClose={handleClose} />
        </Layout>
    </div>
  )
}
