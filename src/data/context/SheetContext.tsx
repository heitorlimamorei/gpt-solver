import { createContext, Dispatch, useReducer } from "react";
import useSheets from "../hook/useSheets";
import {
  sheetItemProps,
  sheetProps,
  sheetAction,
  FinalSheetProps,
  NewSheetProps,
  newSheetItemProps,
  shortingTypes,
  NewUserProps,
  userProps,
} from "../../types/sheetTypes";

interface SheetContextProvider {
  children: React.ReactNode;
}
interface SheetContextProps {
  state: FinalSheetProps;
  dispatch: Dispatch<sheetAction>;
}
function sheetReducer(state: FinalSheetProps, action: sheetAction) {
  switch (action.type) {
    case "create":
      return {
        ...state,
        data: {
          ...action.payload.sheet.data,
        },
        session: {
          ...action.payload.sheet.session,
        },
        users: {
          ...action.payload.users,
        },
      };
    case "refresh":
      return {
        ...state,
        data: {
          ...action.payload.sheet.data,
        },
        session: {
          ...action.payload.sheet.session,
        },
        users: {
          ...action.payload.users,
        },
        items: action.payload.items,
      };
    case "refreshItems":
      return {
        ...state,
        items: action.payload,
      };
    case "refreshUsers":
      return {
        ...state,
        users: action.payload,
      };
    case "onChangeUser":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "onUpdate":
      return{
        ...state,
        data: {
          ...action.payload.data
        }
      };
    default:
      return state;
  }
}
const SheetContext = createContext<SheetContextProps>({
  state: {
    data: {
      id: "",
      tiposDeGastos: [""],
      owner: "",
      totalValue: 0,
      type: "personal",
      name: "",
    },
    session: {
      authenticated: false,
      role: "",
      canView: false,
      canDelete: false,
      canEditItems: false,
      canEditUsers: false,
      canManageSheetProps: false,
    },
    items: [],
    users: [],
    currentUser: "",
  },
  dispatch: () => {},
});
export function SheetContextProvider(props: SheetContextProvider) {
  const [state, dispatch] = useReducer(sheetReducer, {
    data: {
      id: "",
      tiposDeGastos: [""],
      owner: "",
      totalValue: 0,
      type: "personal",
      name: "",
    },
    session: {
      authenticated: false,
      role: "",
      canView: false,
      canDelete: false,
      canEditItems: false,
      canEditUsers: false,
      canManageSheetProps: false,
    },
    items: [],
    users: [],
    currentUser: "",
  });
  return (
    <SheetContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SheetContext.Provider>
  );
}
export default SheetContext;
