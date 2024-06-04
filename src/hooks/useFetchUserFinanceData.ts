import axios from 'axios';

const api = 'https://fianancial-assistant-backend.onrender.com/api';


export interface UserFinanceData {
  id: string;
  sheetIds: string[];
  email: string;
  name: string;
}

export interface ISheetDisplayData {
  id: string;
  name: string;
  owner: string;
}

export default function useFetchUserFinanceData() {
  const getUserFinanceData = async (email: string) => {
    try {
      const resp = await axios.get<UserFinanceData>(`${api}/v1/user?email=${email}`);
      return resp.data as UserFinanceData;
    } catch (err: any) {
      console.log(`Erro ao buscar dados do usuário: ${err}`);
    }
  };

  const getUserSheetsData = async (id: string) => {
    try {
      const resp = await axios.get(`${api}/v1/sheet/displaydata/${id}`);
      return resp.data as ISheetDisplayData[];
    } catch (err) {
      console.log(`Erro ao buscar lista de planilhas: ${err}`);
    }
  };

  const getUserSheetsDataByEmail = async (email: string) => {
    const user = await getUserFinanceData(email);

    if (!user) return;

    const metadata = await getUserSheetsData(user.id);

    if (!metadata) return;

    return metadata;
  };

  return { getUserFinanceData, getUserSheetsData, getUserSheetsDataByEmail };
}
