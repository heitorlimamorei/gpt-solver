import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../components/template/Layout";
import useSheets from "../data/hook/useSheets";
import { signOut, useSession } from "next-auth/react";
import variaveis from "../model/variaveis";
import { sheetProps } from "../types/sheetTypes";
import RemoveSelf from "../components/template/RemoveSelf";
export default function Perfil() {
  const { BASE_URL } = variaveis;
  const [sheets, setSheets] = useState<sheetProps[]>([]);
  const [sheetIds, setSheetIds] = useState<string[]>([]);
  const session = useSession();
  const [sheetIdsIsLoading, setSheetIdsIsLoading] = useState(true);
  let email = session.data?.user.email;
  let name = session.data?.user.name;
  useEffect(() => {
    if (email !== undefined) {
      if (email.length > 0) {
        setSheetIdsIsLoading(true);
        axios
          .post(`${BASE_URL}/api/users/login`, {
            email: email,
            name: name,
          })
          .then((response) => {
            let sheets: string[] = response.data.sheetIds;
            console.log(sheets);
            setSheetIds(sheets);
          });
      }
    }
  }, [email]);
  return (
    <div className={`dark`}>
      <Layout
        titulo="Perfil de usuario"
        subtitulo="Gerencie suas informações aqui!"
      >
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col md:w-1/3 h-full">
            <RemoveSelf
              setSheets={setSheets}
              sheets={sheets}
              sheetIds={sheetIds}
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
