export interface sheetProps {
  data: {
    id: string;
    owner: string;
    type: string;
    tiposDeGastos: string[];
    totalValue: number;
  };
  session: {
    authenticated: boolean;
    role: string;
    canView: boolean;
    canDelete: boolean;
    canEditItems: boolean;
    canEditUsers: boolean;
    canManageSheetProps: boolean;
  };
}
interface userProps {
  id: string;
  role: string;
  email: string;
}
export interface FinalSheetProps {
  data: {
    id: string;
    owner: string;
    type: string;
    tiposDeGastos: string[];
    totalValue: number;
  };
  session: {
    authenticated: boolean;
    role: string;
    canView: boolean;
    canDelete: boolean;
    canEditItems: boolean;
    canEditUsers: boolean;
    canManageSheetProps: boolean;
  };
  users: userProps[];
  items: sheetItemProps[];
  currentUser: string;
}
export interface sheetItemProps {
  id: string;
  value: number;
  author: string;
  type: string;
  sheetId: string;
  date: any;
  description: string;
  name: string;
}
export interface newSheetItemProps{
  value: number;
  author: string;
  type: string;
  sheetId: string;
  date: any;
  description: string;
  name: string;
}
export interface NewSheetProps {
  owner: string;
  tiposDeGastos: string[];
  totalValue: number;
  type: string;
}
export type sheetAction =
  | {
      type: "create";
      payload: {
        sheet: sheetProps;
        items: sheetItemProps[];
        users: userProps[];
      };
    }
  | {
      type: "refresh";
      payload: {
        sheet: sheetProps;
        items: sheetItemProps[];
        users: userProps[];
      };
    }
  | { type: "onChangeUser"; payload: string } | {type: "refreshItems"; payload: sheetItemProps[]}
export type shortingTypes = "ascending" | "descending" | "date ascending" | "date descending"