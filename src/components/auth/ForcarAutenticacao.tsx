import Image from "../../../node_modules/next/image";
import { useRouter } from "../../../node_modules/next/router";
import Loading from "../../../public/images/loading.gif";
import { useSession } from "next-auth/react";
import AuthPage from "./AuthPage";
export default function ForcarAutenticacao(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  function renderizarConteudo() {
    return <>{props.children}</>;
  }
  function renderizarCarregando() {
    return (
      <div
        className={`
            flex  items-center justify-center h-screen
            `}
      >
        <Image src={Loading} />
      </div>
    );
  }
  if (status === "authenticated") {
    return renderizarConteudo();
  } else if (status === "loading") {
    return renderizarCarregando();
  } else {
    return <AuthPage />;
  }
}
