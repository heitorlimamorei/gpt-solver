import { useCallback, useEffect, memo} from "react";
import SheetOption from "./SheetOption";
import Cliper from "./Clipers/Cliper";
import { sheetProps } from "../types/sheetTypes";
import useSheets from "../data/hook/useSheets";
import axios from "axios";
import variaveis from "../model/variaveis";
interface SheetOptionsProps {
  sheetIds: string[];
  sheets: sheetProps[];
  setSheets: ( newState: sheetProps[] ) => void;
  sheetOptionsIsLoading: boolean;
  setSheetOptionsIsLoading: ( newState:boolean) => void;
}
function SheetOptions(props: SheetOptionsProps) {
  const { sheetIds, sheets, setSheets, sheetOptionsIsLoading, setSheetOptionsIsLoading } = props;
  const { sheet, loadSheetByUserSeletion } = useSheets();
  const { BASE_URL } = variaveis;
  
  const getSheets = useCallback(async () => {
    let requests = [];
    if (!!sheetIds) {
      sheetIds.forEach((sheetId) => {
        const currentSheet = axios.post(`${BASE_URL}/api/sheets/${sheetId}`, {
          email: sheet.currentUser,
          mode: "GET",
        });
        requests.push(currentSheet);
      });
      const responseArray = await Promise.all(requests);
      let finalReponse = responseArray.map((response) => response.data);
      return finalReponse;
    }
  }, [sheetIds]);
  const loader = useCallback(async () => {
    try {
      const sheetsResp: any = await getSheets();
      setSheetOptionsIsLoading(false);
      if (sheetsResp.length > 0) {
        setSheets(sheetsResp);
      }
    } catch (err) {
      console.log(err);
    }
  }, [getSheets]);
  useEffect(() => {
    if (sheetIds !== undefined) {
      if (sheetIds.length > 0) {
        loader();
      } else {
        setSheetOptionsIsLoading(false);
      }
    }
  }, [sheetIds]);
  return (
    <div className="flex flex-col mt-3">
      <h1 className="font-bold text-2xl dark:text-white">
        Escolha a planilha!
      </h1>
      {sheetOptionsIsLoading ? (
        <div className="flex items-center justify-center mt-12">
          <Cliper isLoading={sheetOptionsIsLoading} size={60} />
        </div>
      ) : (
        <ul className="flex md:flex-row flex-col md:flex-wrap mt-2">
          {sheets.length > 0 &&
            sheets.map((currentSheet) => {
              return (
                <SheetOption
                  key={currentSheet.data.id}
                  currentSheet={currentSheet}
                  loadSheetByUserSeletion={loadSheetByUserSeletion}
                />
              );
            })}
        </ul>
      )}
    </div>
  );
}
export default memo(SheetOptions);