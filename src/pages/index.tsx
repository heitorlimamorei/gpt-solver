import { useCallback, useEffect, useMemo, useState } from "react";
import { IconeAjustes, plusIcon } from "../components/icons/Icones";
import Layout from "../components/template/Layout";
import ModalForm from "../components/template/ModalForm";
import useSheets from "../data/hook/useSheets";
import { useSession } from "next-auth/react";
import axios from "axios";
import { sheetItemProps, sheetProps } from "../types/sheetTypes";
import FormModalContent from "../components/template/FormModalContent";
import ManageSheetProps from "../components/template/ManageSheetProps";
import Button from "../components/Button";
import ManageUsers from "../components/template/ManageUsers";
import CreateSheet from "../components/template/CreateSheet";
import _ from "lodash";
import SheetOption from "../components/SheetOption";
import CardItem from "../components/CardItem";
import Switch from "../components/template/Switch";
export default function Home() {
  const {
    sheet,
    loadSheet,
    createNewItem,
    getBalance,
    getSortedItems,
    updateItem,
    filterBySpentType,
    loadSheetByUserSeletion,
  } = useSheets();
  const [sheetId, setSheetId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [sheets, setSheets] = useState<sheetProps[]>([]);
  const [sheetIds, setSheetIds] = useState<string[]>([]);
  const [isOpen3, setIsOpen3] = useState(false);
  const [selected, setSelected] = useState<"users" | "properties">("properties");
  const session = useSession();
  let email = session.data?.user.email;
  let name = session.data?.user.name;
  const [currentEditingItem, setCurrentEditingItem] =
    useState<sheetItemProps>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    value: 0,
    description: "",
  });
  const handleToggle = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);
  const handleToggleManageProps = useCallback(() => {
    setIsOpen2((current) => !current);
  }, []);
  const handleChange = useCallback((event) => {
    setFormData((current) => {
      return {
        ...current,
        [event.target.name]: event.target.value,
      };
    });
  }, []);
  const handleCancel = useCallback(() => {
    handleToggle();
    setFormData({
      name: "",
      type: "",
      value: 0,
      description: "",
    });
    setCurrentEditingItem(null);
  }, []);
  const setEditMode = useCallback((currentItem: sheetItemProps) => {
    setCurrentEditingItem(currentItem);
    setFormData({
      name: currentItem.name,
      type: currentItem.type,
      value: currentItem.value,
      description: currentItem.description,
    });
    setIsOpen((current) => !current);
  }, []);
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!currentEditingItem) {
        createNewItem({
          ...formData,
          value: Number(formData.value),
          sheetId: sheet.data.id,
          author: sheet.currentUser,
          date: new Date(),
        });
      } else {
        updateItem({
          ...currentEditingItem,
          value: formData.value,
          description: formData.description,
          type: formData.type,
          name: formData.name,
        });
      }
      setFormData({
        name: "",
        type: "",
        value: 0,
        description: "",
      });
      setCurrentEditingItem(null);
      handleToggle();
    },
    [currentEditingItem, formData, sheet]
  );
  useEffect(() => {
    if (email !== undefined) {
      if (email.length > 0) {
        axios
          .post(`http://localhost:3000/api/users/login`, {
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
  const getSheets = useCallback(async () => {
    let requests = [];
    if (sheetIds !== undefined) {
      if (sheetIds.length > 0) {
        sheetIds.forEach((sheetId) => {
          const currentSheet = axios.post(
            `http://localhost:3000/api/sheets/${sheetId}`,
            {
              email: sheet.currentUser,
              mode: "GET",
            }
          );
          requests.push(currentSheet);
        });
        const responseArray = await Promise.all(requests);
        let finalReponse = responseArray.map((response) => response.data);
        return finalReponse;
      }
    }
  }, [sheetIds]);
  const loader = useCallback(async () => {
    const sheetsResp: any = await getSheets();
    if (sheetsResp.length > 0) {
      setSheets(sheetsResp);
    }
  }, [getSheets]);
  useEffect(() => {
    if (sheetIds !== undefined) {
      if (sheetIds.length > 0) {
        loader();
      }
    }
  }, [sheetIds]);
  const itemsReady = useMemo(
    () => filterBySpentType("", getSortedItems("date descending")),
    [sheet]
  );
  useEffect(() => {
    if (sheet.data.id !== undefined && sheet.data.id.length > 0) {
      if (
        _.findIndex(sheets, (csheet) => csheet.data.id === sheet.data.id) < 0
      ) {
        setSheets((current: any) => {
          return [
            { data: { ...sheet.data }, seesion: { ...sheet.session } },
            ...current,
          ];
        });
      }
    }
  }, [sheet]);
  // SIMULANDO FILTROS EM CASCATA
  return (
    <div className={`h-[500vh] w-[100%]`}>
      <Layout
        titulo="Pagina inicial"
        subtitulo="Estamos construindo um admin template"
      >
        <ModalForm isOpen={isOpen}>
          <FormModalContent
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isEditMode={currentEditingItem != null}
            onCancel={handleCancel}
            spentOptions={sheet.data.tiposDeGastos}
          />
        </ModalForm>
        <ModalForm isOpen={isOpen2}>
          <Switch className="" selected={selected} setSelected={setSelected} />
        {selected === "properties" ? (<ManageSheetProps toggleIsOpen={handleToggleManageProps} />) : (<ManageUsers  toggleIsOpen={handleToggleManageProps}/>)}
        </ModalForm>
        <ModalForm isOpen={isOpen3}>
          <CreateSheet
            toggleIsOpen={() => setIsOpen3((current) => !current)}
            addSheetIntoTheList={setSheets}
          />
        </ModalForm>
        <label className="mt-6 md:flex hidden" htmlFor="sheetid">
          Digite o código da planilha
        </label>
        <div className="flex flex-1 w-full mt-3">
          <input
            id="sheetid"
            type="text"
            className="hidden md:flex rounded-lg py-1 px-2 mt-1 w-4/6"
            value={sheetId}
            onChange={(ev) => setSheetId(ev.target.value)}
          />
          <div className="flex w-full">
            <Button
              ClassName="bg-green-700 px-4 py-1 mt-1 rounded-lg lg:flex hidden ml-2 dark:text-white w-2/3 flex-1"
              onClick={async () => {
                await loadSheet(sheetId);
              }}
              text="Procurar"
              textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
            ></Button>
            <Button
              ClassName="md:px-4 md:py-1 mt-1 py-3 px-4 rounded-lg ml-2 dark:text-white w-[50%]"
              onClick={() => setIsOpen3(true)}
              iconClassName="dark:text-[#00F0FF] text-[#0085FF] mr-1 ml-2"
              icon={plusIcon(6)}
              text="Criar Planilha"
              textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
            ></Button>
            {sheet.session.canEditItems ? (
              <Button
                ClassName="md:px-4 md:py-1 mt-1 rounded-lg ml-2 dark:text-white w-1/3"
                onClick={handleToggle}
                text="Criar Gasto"
                textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
              ></Button>
            ) : (
              <></>
            )}
            {sheet.session.canManageSheetProps && (
              <Button
                ClassName="px-2 py-1 mt-1 rounded-lg ml-2 flex justify-center dark:text-white w-1/6"
                onClick={handleToggleManageProps}
                icon={IconeAjustes}
                iconClassName="dark:text-[#00F0FF] text-[#0085FF] mr-1 ml-2"
              ></Button>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center w-full h-[5rem]">
          <h2 className="dark:text-white font-bold text-3xl">
            R${getBalance()}
          </h2>
        </div>

        <div>
          <ul className="flex flex-row flex-wrap mt-2">
            {sheets.length > 0 &&
              sheets.map((currentSheet) => {
                return (
                  <SheetOption
                    currentSheet={currentSheet}
                    loadSheetByUserSeletion={loadSheetByUserSeletion}
                  />
                );
              })}
          </ul>
          <ul className="flex flex-wrap mt-4 w-full transition-all duration-500 ease-linear">
            {itemsReady.map((item) => (
              <CardItem item={item} setEditMode={setEditMode}/>
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  );
}
