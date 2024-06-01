import axios from 'axios';

interface IUserResponseData {
  id: string;
  email: string;
  name: string;
  sheetIds: string[];
}

interface ISheetData {
  name: string;
  owner: string;
}

interface IUseFetchFinanceUserDataResp {
  getUserData(email: string): Promise<IUserResponseData | null>;
  getUserSheetsData(id: string | null): Promise<ISheetData[] | null>; 
}

const api = 'https://financial-assistant-backend.onrender.com/api';

export function useFetchFinanceUserData(): IUseFetchFinanceUserDataResp {
  const getUserData = async (email: string): Promise<IUserResponseData | null> => {
    console.log('Fetching user data');
    if (!email) {
      console.warn('getUserData foi chamada sem um email válido.');
      return null;
    }

    try {
      const response = await axios.get<IUserResponseData>(`${api}/v1/user?email=${email}`);

      if (!response.data) {
        console.log(`Nenhuma informacao recebida.`);
        return null;
      }

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return null;
    }
  };

  const getUserSheetsData = async (id: string | null): Promise<ISheetData[] | null> => {
    if (!id) {
      console.warn('getUserSheetsData foi chamada sem um ID válido.');
      return null;
    }

    try {
      const response = await axios.get<ISheetData[]>(`${api}/v1/sheet/displaydata/${id}`);

      if (!response.data || response.data.length === 0) {
        console.log(`Nenhuma informacao recebida`);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados das sheets:', error);
      return null;
    }
  };

  return {
    getUserData,
    getUserSheetsData,
  };
}