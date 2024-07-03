import { useState, useEffect, useCallback } from 'react';

import { useSession } from 'next-auth/react';

import { useFetchUserData } from '@/hooks/useFetchUserData';
import useSurvey from '@/hooks/useSurvey';
import axios from 'axios';

import Button from '../generic/Button';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';

interface SurveyFormProps {
  title: string;
  onClose: () => void;
}

interface Chat {
  id: string;
  name: string;
  sheetId: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  ownerId: string;
}

interface DisplayedChats {
  id: string;
  name: string;
}

const apigpt = 'https://gpt-solver-backend.onrender.com';
const apifinance = 'https://fianancial-assistant-backend.onrender.com/api';

export default function SurveyForm({ title, onClose }: SurveyFormProps) {
  const [anyError, setAnyError] = useState<string>('');
  const [easyToUse, setEasyToUse] = useState<string>('');
  const [goodAtAll, setGoodAtAll] = useState<string>('');
  const [sugestions, setSugestions] = useState<string>('');
  const [selectedChat, setSelectedChat] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [sheetId, setSheetId] = useState<string>('');
  const [chatlist, setChatlist] = useState<DisplayedChats[]>([]);
  const [isViable, setIsViable] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>();
  const { SendSurvey } = useSurvey();
  const { fetchByEmail } = useFetchUserData();

  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    async function getUserData() {
      if (email) {
        try {
          const user = await fetchByEmail(email);
          setUserId(user.id);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    }
    getUserData();
  }, [email, fetchByEmail]);

  useEffect(() => {
    async function getChatList() {
      if (userId) {
        try {
          const response = await axios.get<DisplayedChats[]>(`${apigpt}/v1/chat/list/${userId}`);
          setChatlist(response.data);
        } catch (error) {
          console.error('Error fetching chat list:', error);
        }
      }
    }
    getChatList();
  }, [userId]);

  useEffect(() => {
    async function getSheetId() {
      if (selectedChat) {
        try {
          const response = await axios.get<Chat>(`${apigpt}/v1/chat/${selectedChat}`);
          setSheetId(response.data.sheetId);
        } catch (error) {
          console.error('Error fetching sheet ID:', error);
        }
      }
    }
    getSheetId();
  }, [selectedChat]);

  const handleSugestions = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSugestions(event.target.value);
  }, []);

  const handleAnyError = useCallback((c: string) => {
    setAnyError(c);
  }, []);

  const handleGoodAtAll = useCallback((c: string) => {
    setGoodAtAll(c);
  }, []);

  const handleEasyToUse = useCallback((c: string) => {
    setEasyToUse(c);
  }, []);

  const handleSubmit = async () => {
    if (!anyError || !easyToUse || !goodAtAll || !sugestions) return;

    try {
      const resp = await axios.post(`${apifinance}/v1/sheet/verifytask`, { sheetId });
      if (resp.data.hasBeenDone === false) {
        if (password == 'root') {
        } else {
          setIsViable(false);
          return;
        }
      }

      const experiencedAnyError = anyError === 'Sim';
      const useEasy = easyToUse === 'Sim';
      const atAllGood = goodAtAll === 'Sim';

      const send = await SendSurvey({
        chatId: selectedChat,
        sheetId,
        email: email!,
        anyError: experiencedAnyError,
        easyToUse: useEasy,
        goodAtAll: atAllGood,
        sugestions: sugestions!,
      });
      console.log(send);
      setCompleted(true);
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };
  if (completed) {
    return (
      <div className="flex items-center flex-col w-full h-screen bg-zinc-800">
        <div className="flex flex-col items-center">
          <div className="max-w-xl mx-auto my-10 p-10 bg-[#E0E5EC] dark:bg-zinc-900 rounded-xl items-center justify-items-center">
            <h1 className="text-center text-2xl font-extrabold">TAREFA CONCLUÍDA</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!isViable) {
    return (
      <div className="flex items-center flex-col w-full h-screen bg-zinc-800">
        <div className="flex flex-col items-center">
          <div className="max-w-xl mx-auto my-10 p-10 bg-[#E0E5EC] dark:bg-zinc-900 rounded-xl items-center justify-items-center">
            <h1 className="text-center text-2xl font-extrabold">TAREFA NÃO CONCLUÍDA</h1>
            <p className="text-center text-lg font-bold">Procure a professora para validar</p>
            <input
              className="bg-zinc-500 p-2 text-white rounded-lg w-full"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(e.target.value);
              }}
            />
            <div className="flex mt-3 justify-center">
              <Button
                style="px-10 py-3 rounded-md mr-5 bg-blue-800"
                onClick={handleSubmit}
                text="Enviar"
                icon={undefined}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col w-full h-screen bg-zinc-800">
      <div className="flex items-center justify-center">
        <h1 className="dark:text-gray-100 font-bold mt-4 md:text-2xl">{title}</h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="max-w-xl mx-auto my-10 p-10 bg-[#E0E5EC] dark:bg-zinc-900 rounded-xl">
          <div>
            <select
              value={selectedChat}
              onChange={(e) => setSelectedChat(e.target.value)}
              className="form-select block w-full px-4 py-2 text-base font-normal text-gray-300 bg-gray-800 bg-clip-padding bg-no-repeat rounded transition ease-in-out m-0 focus:border-blue-600 border-2 border-solid border-gray-700 outline-none">
              <option value="">Escolha um chat!</option>
              {chatlist.map((chat) => (
                <option key={chat.id} value={chat.id}>
                  {chat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-1">
            <MultipleChoiceQuestion
              selectedOption={anyError}
              question="Experienciou algum erro ao usar a aplicação?"
              options={['Sim', 'Não']}
              handleOptionChange={handleAnyError}
            />
          </div>
          <div className="mb-3">
            <MultipleChoiceQuestion
              selectedOption={easyToUse}
              question="Achou fácil de utilizar?"
              options={['Sim', 'Não']}
              handleOptionChange={handleEasyToUse}
            />
          </div>
          <div className="mb-3">
            <MultipleChoiceQuestion
              selectedOption={goodAtAll}
              question="Gostou do app?"
              options={['Sim', 'Não']}
              handleOptionChange={handleGoodAtAll}
            />
          </div>
          <div className="mt-1">
            <label htmlFor="review" className="text-lg">
              Quais pontos você acha que devemos melhorar?
            </label>
            <div className="mt-3">
              <textarea
                id="improve"
                name="improve"
                className="bg-zinc-500 p-2 text-white rounded-lg w-full"
                value={sugestions}
                placeholder="Sua sugestão aqui!"
                onChange={handleSugestions}
              />
            </div>
          </div>
          <div className="flex mt-3 justify-between">
            <Button
              style="px-10 py-3 rounded-md mr-5 bg-blue-800"
              onClick={handleSubmit}
              text="Enviar"
              icon={undefined}
            />
            <Button
              style="px-10 py-3 rounded-md bg-red-800"
              onClick={onClose}
              text="Fechar"
              icon={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
