import React from 'react';

import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';

import Logo from '../../../public/ai.png';
import Button from '../generic/Button';

export default function RightPanel() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full lg:w-[40%]">
      <div>
        <div className="flex justify-center self-center">
          <Image
            alt="gpt-solver logo"
            src={Logo}
            width={100}
            className="lg:hidden self-center mb-5"
          />
        </div>
        <div className="flex flex-col lg:items-center justify-start">
          <h1 className="lg:text-4xl text-3xl font-bold ">Comece por aqui.</h1>
          <div className="flex flex-row mb-24">
            <Button
              onClick={() => {
                signIn();
              }}
              text="Entrar"
              style="bg-cyan-700 lg:py-3 lg:px-14 py-2 px-8 rounded-md lg:text-lg font-semibold mt-6 mr-3"
            />
            <Button
              onClick={() => {
                signIn();
              }}
              text="Cadastrar"
              style="bg-cyan-700 lg:py-3 lg:px-12 py-2 px-6 rounded-md lg:text-lg font-semibold mt-6 ml-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
