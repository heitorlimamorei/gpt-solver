import { useEffect, useState } from "react";
import { plusIcon } from "../../components/icons/Icones";
import Layout from "../../components/template/Layout";
import ModalForm from "../../components/template/ModalForm";
import { useSession } from "next-auth/react";
import axios from "axios";
import { sheetProps } from "../../types/sheetTypes";
import Button from "../../components/Button";
import CreateSheet from "../../components/template/CreateSheet";
import variaveis from "../../model/variaveis";
import SheetOptions from "../../components/SheetOptions";
import WatingActionModal from "../../components/template/WatingActionModal";
import useAppData from "../../data/hook/useAppData";

export default function Sheet() {
  const { BASE_URL } = variaveis;
  const [sheets, setSheets] = useState<sheetProps[]>([]);
  const [sheetIds, setSheetIds] = useState<string[]>([]);
  const [isOpen3, setIsOpen3] = useState(false);
  const { setIsLoading } = useAppData();
  const session = useSession();
  const [sheetIdsIsLoading, setSheetIdsIsLoading] = useState(true);
  let email = session.data?.user.email;
  let name = session.data?.user.name;

  useEffect(()  => setIsLoading(false), []);
  
  useEffect(() => {
    if (email !== undefined) {
      if (email.length > 0) {
        setSheetIdsIsLoading(true);
        axios
          .post(`${BASE_URL}/api/users/login`, {
            email: email,
            name: name,
          })
          .then((response) => {
            let sheets: string[] = response.data.sheetIds;
            console.log(sheets);
            setSheetIds(sheets);
          });
      }
    }
  }, [email]);
  return (
    <div className={`lg:h-[200vh] h-[200vh] w-[100%]`}>
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
          sheetIds={sheetIds}
          sheets={sheets}
          sheetIdsIsLoading={sheetIdsIsLoading}
          setSheetIdsIsLoading={setSheetIdsIsLoading}
          setSheets={setSheets}
        />
      </Layout>
    </div>
  );
}
