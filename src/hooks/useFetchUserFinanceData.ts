import axios from 'axios';

const api = 'https://fianancial-assistant-backend.onrender.com/api';

interface UserFinanceData {
  id: string;
  sheetIds: string[];
  email: string;
  name: string;
}

export default function useFetchUserFinanceData() {
  const getUserFinanceData = async (email: string | null | undefined) => {
    try {
      const resp = await axios.get<UserFinanceData>(`${api}/v1/user?email=${email}`);
      return resp.data;
    } catch (err: any) {
      console.log(`Erro ao buscar dados do usuário: ${err}`);
    }
  };

  const getUserSheetsData = async (id: string | null | undefined) => {
    try {
      const resp = await axios.get(`${api}/v1/sheet/displaydata/${id}`);
      return resp.data;
    } catch (err) {
      console.log(`Erro ao buscar lista de planilhas: ${err}`);
    }
  };

  return { getUserFinanceData, getUserSheetsData };
}
