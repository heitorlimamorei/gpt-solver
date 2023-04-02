import Layout from "../components/template/Layout";
import useSheets from "../data/hook/useSheets";
import { signOut, useSession } from "next-auth/react"
export default function Perfil() {
  const { sheet } = useSheets();
  return (
    <div className={`dark`}>
      <Layout
        titulo="Perfil de usuario"
        subtitulo="Gerencie suas informações aqui!"
      >
        <div className="flex items-center justify-center h-full">
          <div className="flex w-1/3 h-full">
          <button className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded w-full mb-2" onClick={() => signOut()}>Sair</button>
          </div>
        </div>
      </Layout>
    </div>
  );
}
