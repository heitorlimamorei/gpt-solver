import { createContext, useState, useEffect } from "react";
import app from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";

import Usuario from "../../model/Usuario";
import Cookies from "js-cookie";


interface AuthContextProps {
  usuario?: Usuario;
  loginGoogle?: () => Promise<void>;
  logout?: () => Promise<void>;
  carregando?: boolean;
  login?: (email: string, senha: string) => Promise<void>;
  cadastrar?: (email: string, senha: string) => Promise<void>;
  error:any
  
}
const AuthContext = createContext<AuthContextProps>(null);

async function usuarioNormalizado(usuarioFirebase: any): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName,
    email: usuarioFirebase.email,
    token,
    provedor: usuarioFirebase.providerData[0].providerId,
    imagemUrl: usuarioFirebase.photoURL,
  };
}
function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set("admin-template-lwolf-auth", "true", {
      expires: 7,
    });
  } else {
    Cookies.remove("admin-template-lwolf-auth");
  }
}

export function AuthProvider(props) {
  const Router = useRouter();
  const auth = getAuth(app);
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState<Usuario>(null);
  const [error, setError] = useState(null);
  async function configurarSecao(usuarioFirebase) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase);
      setUsuario(usuario);
      gerenciarCookie(true);
      setCarregando(false);
      return usuario.email;
    } else {
      setUsuario(null);
      gerenciarCookie(false);
      setCarregando(false);
      return false;
    }
  }
  async function loginGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        configurarSecao(user);
        Router.push("/");
        // ...
      })
      .finally(() => {
        setCarregando(false);
      });
  }
  async function cadastrar(email: string, senha: string) {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        configurarSecao(user);
        Router.push("/");
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setCarregando(false);
      });
  }
  async function login(email: string, senha: string) {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        configurarSecao(user);
        Router.push("/");
      }).catch((error) => {
        setError(error)
      })
      .finally(() => {
        setCarregando(false);
      });
  }
  async function logout() {
    signOut(auth)
      .then(() => {
        setCarregando(true);
        configurarSecao(null);
        Router.push("/autenticacao");
      })
      .finally(() => {
        setCarregando(false);
      });
  }
  useEffect(() => {
    if (Cookies.get("admin-template-lwolf-auth")) {
      const cancelar = () => {
        onAuthStateChanged(auth, configurarSecao);
      };
      return () => cancelar();
    } else {
      setCarregando(false);
    }
  }, []);
  useEffect(() =>{
    if(carregando){
      setTimeout(()=>{
        setCarregando(false)
        Router.push('/')
      },15000)
    }
  },[carregando])
  return (
    <AuthContext.Provider
      value={{
        usuario,
        loginGoogle,
        login,
        logout,
        carregando,
        cadastrar,
        error
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;