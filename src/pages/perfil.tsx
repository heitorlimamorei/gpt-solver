import { useState, useEffect } from 'react';
import Layout from '../components/template/Layout';
import { signOut, useSession } from 'next-auth/react';
import { sheetProps } from '../types/sheetTypes';
import RemoveSelf from '../components/template/RemoveSelf';
import useAuth from '../data/hook/useAuth';
export default function Perfil() {
  const session = useSession();
  const { requestLogin, data } = useAuth();
  const [sheets, setSheets] = useState<sheetProps[]>([]);
  const [sheetIdsIsLoading, setSheetIdsIsLoading] = useState(true);

  let email = session.data?.user.email;
  let name = session.data?.user.name;

  const handleRequestLogin = () => requestLogin(email, name);

  useEffect(() => {
    if (email !== undefined) {
      if (email.length > 0) {
        handleRequestLogin(); // that method will reload the user geting a new intance from the api.
      }
    }
  }, [email]);

  return (
    <div className={`dark`}>
      <Layout titulo="Perfil de usuario" subtitulo="Gerencie suas informações aqui!">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col md:w-1/3 h-full">
            <RemoveSelf
              handleRequestLogin={handleRequestLogin}
              setSheets={setSheets}
              sheets={sheets}
              sheetIds={data.user.sheetIds}
              sheetIdsIsLoading={sheetIdsIsLoading}
              setSheetIdsIsLoading={setSheetIdsIsLoading}
            />
            <button
              className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded w-full mb-2"
              onClick={() => signOut()}
            >
              Sair
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}
