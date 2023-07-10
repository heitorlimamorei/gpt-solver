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

  const handleSheetIdsLoadingChange = (current:boolean) => dispatch({type: "sheetIdsIsLoading", payload:current});
  const handleUserIsLoadingChange = (current:boolean) => dispatch({type: "userIdIsLoadingChange", payload:current});
  const handleSheetIdsLoad = (current: string[]) => dispatch({type: "loadSheetIds", payload:current});
  const handleLogin = (current: UserProps) => dispatch({type: "login", payload:current});

  useEffect(() => {
    if (email !== undefined) {
      if (email.length > 0) {
        handleSheetIdsLoadingChange(true);
        handleUserIsLoadingChange(true);
        axios
          .post(`${BASE_URL}/api/users/login`, {
            email: email,
            name: name,
          })
          .then((response) => {
            handleLogin({...response.data});
          });
      }
    }
  }, [email]);

  useEffect(() => {
    if (!!state.user.id) handleUserIsLoadingChange(false);
    if (!!state.user.sheetIds) handleSheetIdsLoadingChange(false);
  }, [state.user]);

  console.log(state);
  
  return {
    handleSheetIdsLoadingChange,
    handleUserIsLoadingChange,
    handleSheetIdsLoad,
    data: state
  }
}
