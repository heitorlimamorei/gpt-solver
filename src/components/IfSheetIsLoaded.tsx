import { useEffect, useState, memo } from "react";
import useSheets from "../data/hook/useSheets";
import Cliper from "./Clipers/Cliper";

function IfSheetIsLoaded({ children }) {
  const { sheet } = useSheets();
  const [sheetIsLoading, setSheetIsLoading] = useState(true);
  useEffect(() => { 
    if (sheet.users.length > 0) { // caso tenha um user setado na lista significa que a sheet foi carregada
      setSheetIsLoading(false);
    }
  }, [sheet.users]);
  return <>{sheetIsLoading ? <Cliper isLoading={sheetIsLoading} size={60} /> : <>{children}</>}</>;
}
export default memo(IfSheetIsLoaded);
