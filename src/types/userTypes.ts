export interface UserProps {
  id: string;
  sheetIds: string[];
  name: string;
  email: string;
}

export interface UserLoginProps {
  name: string;
  email: string;
}

export default interface IAuthProps {
  user: UserProps;
  loadings: {
    userIsLoading: boolean;
    sheetIdsIsLoading: boolean;
  }
}

export type AuthAction = {type: "login", payload: UserProps } | {type: "userIdIsLoadingChange", payload: boolean} | {type: "sheetIdsIsLoading", payload: boolean} | {type: "loadSheetIds", payload: string[]};