import { useEffect, useState } from "react";
import { plusIcon } from "../../components/icons/Icones";
import Layout from "../../components/template/Layout";
import ModalForm from "../../components/template/ModalForm";
import { sheetProps } from "../../types/sheetTypes";
import Button from "../../components/Button";
import CreateSheet from "../../components/template/CreateSheet";
import SheetOptions from "../../components/SheetOptions";
import WatingActionModal from "../../components/template/WatingActionModal";
import useAppData from "../../data/hook/useAppData";
import useAuth from "../../data/hook/useAuth";

export default function Sheet() {
  const [sheets, setSheets] = useState<sheetProps[]>([]);
  const [isOpen3, setIsOpen3] = useState(false);
  const [sheetsOptionsIsLoading, setSheetsOptionsIsLoading] = useState(true);

  const { setIsLoading } = useAppData();

  const { data } = useAuth();
  const { user } = data;

  useEffect(()  => setIsLoading(false), []);
  
  return (
    <div className={`lg:h-full h-full w-[100%]`}>
      <Layout
        titulo="Pagina inicial"
        subtitulo="Estamos construindo um admin template"
      >
        <ModalForm isOpen={isOpen3}>
          <CreateSheet
            toggleIsOpen={() => setIsOpen3((current) => !current)}
            addSheetIntoTheList={setSheets}
          />
        </ModalForm>

        <WatingActionModal/>

        <div className="flex flex-1 w-full mt-3">
          <div className="flex w-full justify-end">
            <Button
              ClassName="md:px-4 md:py-1 py-3 px-4 w-full h-[3rem] rounded-lg ml-2 mt-5 mb-3 dark:text-white md:w-[15%]"
              onClick={() => setIsOpen3(true)}
              iconClassName="dark:text-[#00F0FF] text-[#0085FF] mr-1 ml-2"
              icon={plusIcon(6)}
              text="Criar Planilha"
              textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
            ></Button>
          </div>
        </div>
        <SheetOptions
          sheetIds={user.sheetIds}
          sheets={sheets}
          sheetOptionsIsLoading={sheetsOptionsIsLoading}
          setSheetOptionsIsLoading={setSheetsOptionsIsLoading}
          setSheets={setSheets}
        />
      </Layout>
    </div>
  );
}
