import { useState } from "react";
import AuthInput from "./AuthInput";
import { MsgErrorIcon } from "../icons/Icones";
import { signIn, useSession } from "next-auth/react"

export default function AuthPage() {
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [erro, setErro] = useState(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  function exibirErro(msg: string, tempo = 5) {
    setErro(msg);
    setTimeout(() => setErro(null), tempo * 1000);
  }
  return (
    <div
      className={`flex  
    h-screen items-center 
    justify-center
    `}
    >
      <div className={`hidden md:block md:w-1/2 lg:w-2/3 `}>
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem de autenticação"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className={` w-full md:w-1/2 m-10 lg:w-1/3`}>
        <h1
          className={`
        text-xl font-bold mb-5
        `}
        >
          {modo === "login"
            ? "Entre com sua conta"
            : "Cadastre-se na plataforam"}
          {erro ? (
            <div
              className={` flex items-center bg-red-400 text-white py-3 px-5 my-2
              border border-red-700 rounded-lg
              `}
            >
              {MsgErrorIcon()}
              <span className={`ml-3`}>{erro}</span>
            </div>
          ) : (
            false
          )}
        </h1>
          {modo === "login" ? "Entrar" : "Cadastrar"}
        <hr className={`my-6 border-gray-300 w-full`} />
        <button
          onClick={() => signIn('auth0')}
          className={`
            w-full bg-red-500 hover:bg-red-400 
            text-white rounded-lg px-4 py-3 
            `}
        >
          Entrar com o Google
        </button>
        {modo === "login" ? (
          <p>
            Novo por aqui?
            <a
              onClick={() => {
                setModo("cadastro");
              }}
              className={`
            text-blue-500 
            hover:text-blue-700 
            font-semibold 
            cursor-pointer
            `}
            >
              {" "}
              Crie uma conta gratuitamente
            </a>
          </p>
        ) : (
          <p>
            Já faz parte da nossa comunidade?
            <a
              onClick={() => setModo("login")}
              className={`
          text-blue-500 
          hover:text-blue-700 
          font-semibold 
          cursor-pointer
          `}
            >
              {" "}
              Entre em sua conta
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
