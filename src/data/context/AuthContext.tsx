import { createContext, Dispatch, useReducer } from "react";
import IAuthProps, { AuthAction } from "../../types/userTypes";

interface UserContextProvider {
  children: React.ReactNode;
}
interface UserContextProps {
  state: IAuthProps;
  dispatch: Dispatch<AuthAction>;
}

function AuthReducer(state: IAuthProps, action: AuthAction) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    case "userIdIsLoadingChange":
      return {
        ...state,
        loadings: {
          ...state.loadings,
          userIsLoading: action.payload,
        },
      };
    case "loadSheetIds":
      return {
        ...state,
        user: {
          ...state.user,
          sheetIds: action.payload
        }
      }
    default:
      return state;
  }
}

const AuthConext = createContext<UserContextProps>({
  state: {
    user: {
      id: "",
      name: "",
      email: "",
      sheetIds: [],
    },
    loadings: {
      userIsLoading: false,
    },
  },
  dispatch: () => {},
});

export function AuthContextProvider(props: UserContextProvider) {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: {
      id: "",
      name: "",
      email: "",
      sheetIds: [],
    },
    loadings: {
      userIsLoading: false,
    },
  });
  return (
    <AuthConext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthConext.Provider>
  );
}

export default AuthConext;
