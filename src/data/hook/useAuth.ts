import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import AuthConext from "../context/AuthContext";
import variaveis from "../../model/variaveis";
import axios from "axios";
import { UserProps } from "../../types/userTypes";
export default function useAuth() {
  const useAuthCtx = () => useContext(AuthConext);
  const { BASE_URL } = variaveis;
  const { state, dispatch } = useAuthCtx();
  const session = useSession();
  let email = session.data?.user.email;
  let name = session.data?.user.name;

  const handleUserIsLoadingChange = (current:boolean) => dispatch({type: "userIdIsLoadingChange", payload:current});
  const handleSheetIdsLoad = (current: string[]) => dispatch({type: "loadSheetIds", payload:current});
  const handleLogin = (current: UserProps) => dispatch({type: "login", payload:current});

  const requestLogin = async (email: string, name: string) => {
    handleUserIsLoadingChange(true);
    const { data } = await axios.post(`${BASE_URL}/api/users/login`, {
      email: email,
      name: name,
    });
    handleLogin({ ...data });
  };

  useEffect(() => {
    if (email !== undefined) {
      if (email.length > 0) {
        requestLogin(email, name);
      }
    }
  }, [email]);

  useEffect(() => {
    if (!!state.user.id) handleUserIsLoadingChange(false);
  }, [state.user]);


  return {
    handleUserIsLoadingChange,
    handleSheetIdsLoad,
    requestLogin,
    data: state
  }
}
