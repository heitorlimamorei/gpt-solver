import { useRouter } from "../../../node_modules/next/router";
import { useSession } from "next-auth/react";
import AuthPage from "./AuthPage";
import Pacman from "../Clipers/Pacman";
export default function ForcarAutenticacao(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  function renderizarConteudo() {
    return <>{props.children}</>;
  }
  function renderizarCarregando(IsLoading: boolean) {
    return (
      <div
        className={`
            flex  items-center justify-center h-screen
            `}
      >
       <Pacman isLoading={IsLoading}  size={60}/>
      </div>
    );
  }
  if (status === "authenticated") {
    return renderizarConteudo();
  } else if (status === "loading") {
    return renderizarCarregando(status === "loading" ? true : false);
  } else {
    return <AuthPage />;
  }
}
