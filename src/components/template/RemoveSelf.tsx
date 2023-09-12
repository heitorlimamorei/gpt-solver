import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import useSheets from '../../data/hook/useSheets';
import variaveis from '../../model/variaveis';
import Button from '../Button';
import { trashIcon } from '../icons/Icones';
import { sheetProps } from '../../types/sheetTypes';
import { ClipLoader } from 'react-spinners';
import Cliper from '../Clipers/Cliper';
interface RemoveSelfProps {
  sheetIds: string[];
  sheets: sheetProps[];
  setSheets: (newState: sheetProps[]) => void;
  sheetIdsIsLoading: boolean;
  setSheetIdsIsLoading: (newState: boolean) => void;
  handleRequestLogin: () => Promise<void>;
}
export default function RemoveSelf(props: RemoveSelfProps) {
  const {
    sheetIds,
    sheets,
    setSheets,
    sheetIdsIsLoading,
    setSheetIdsIsLoading,
    handleRequestLogin,
  } = props;

  const { sheet } = useSheets();
  const { BASE_URL } = variaveis;

  const getSheets = useCallback(async () => {
    let requests = [];
    if (sheetIds !== undefined) {
      if (sheetIds.length > 0) {
        sheetIds.forEach((sheetId) => {
          const currentSheet = axios.post(`${BASE_URL}/api/sheets/${sheetId}`, {
            email: sheet.currentUser,
            mode: 'GET',
          });
          requests.push(currentSheet);
        });
        const responseArray = await Promise.all(requests);
        let finalReponse = responseArray.map((response) => response.data);
        return finalReponse;
      }
    }
  }, [sheetIds]);
  const loader = useCallback(async () => {
    try {
      const sheetsResp: any = await getSheets();
      setSheetIdsIsLoading(false);
      if (sheetsResp.length > 0) {
        setSheets(sheetsResp);
      }
    } catch (err) {}
  }, [getSheets]);
  useEffect(() => {
    if (sheetIds !== undefined) {
      if (sheetIds.length > 0) {
        loader();
      }
    }
  }, [sheetIds]);
  async function removeSelfUser(sheetId: string) {
    const resp = await axios.patch(`${BASE_URL}/api/sheets/${sheetId}/auth`, {
      email: sheet.currentUser,
    });
    const filtredSheets = sheets.filter((current) => current.data.id !== sheetId);
    setSheets(filtredSheets);
    await handleRequestLogin(); // that method will reload the user geting a new intance from the api.

  }
  return !sheetIdsIsLoading ? (
    <div className="flex flex-col w-full mb-1 mt-10">
      <label className="text-left px-4 block font-medium text-white text-lg mb-2" htmlFor="value">
        Se retire das planilhas que você foi adicionado e não precisa mais!
      </label>
      <ul className="max-h-[15rem] overflow-y-scroll scroll-m-0 my-10 py-4 px-2">
        {sheets
          .filter((sheet) => sheet.session.role !== 'owner')
          .map((sheet) => {
            return (
              <li
                className="flex  flex-row my-4 rounded-xl items-center transition-all duration-500 ease-linear bg-gradient-to-br from-[#FFFFFF] to-[#B8BCC2] dark:from-[#2A2A2A] dark:to-[#1C1C1C] shadow-[4.5px_4.5px_10px_#f6f7fb,_-4.5px_-4.5px_10px_#FFFFFF]
          dark:shadow-[8px_8px_3px_#1C1C1C,_-3px_-3px_16px_#2A2A2A] text-white"
                key={sheet.data.id}
              >
                <h1 className="mx-4 w-[80%]">{sheet.data.name}</h1>
                <div className="w-full flex flex-row items-end justify-end">
                  <Button
                    iconClassName="text-red-600"
                    ClassName="dark:bg-[#232323] bg-[#E0E5EC] 
              dark:shadow-[3px_3px_12px_#0e0e0e,-3px_-3px_12px_#383838]
              shadow-[3px_3px_12px_#727578,-3px_-3px_12px_#ffffff] rounded-xl p-1 justify-self-end mr-5 my-1"
                    onClick={async () => await removeSelfUser(sheet.data.id)}
                    icon={trashIcon(6)}
                  ></Button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  ) : (
    <div className="flex items-center justify-center mt-12">
      <Cliper isLoading={sheetIdsIsLoading} size={60} />
    </div>
  );
}
