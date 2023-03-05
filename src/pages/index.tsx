import { useCallback, useEffect, useMemo, useState } from "react";
import { IconeAjustes, trashIcon } from "../components/icons/Icones";
import Layout from "../components/template/Layout";
import ModalForm from "../components/template/ModalForm";
import useSheets from "../data/hook/useSheets";
import { useSession } from "next-auth/react";
import axios from "axios";
import { sheetItemProps, sheetProps } from "../types/sheetTypes";
import { editIcon } from "../components/icons/Icones";
import FormModalContent from "../components/template/FormModalContent";
import ManageSheetProps from "../components/template/ManageSheetProps";
import Button from "../components/Button";
import ManageUsers from "../components/template/ManageUsers";
import CreateSheet from "../components/template/CreateSheet";
import _ from "lodash";
export default function Home() {
  const {
    sheet,
    loadSheet,
    deleteItem,
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
    if(sheet.data.id !== undefined && sheet.data.id.length > 0) {
      if(_.findIndex(sheets, (csheet => csheet.data.id === sheet.data.id)) < 0){
        setSheets((current: any) => {
          return [
            { data: { ...sheet.data }, seesion: { ...sheet.session } },
            ...current,
          ];
        })
      }
    }
  }, [sheet])
  // SIMULANDO FILTROS EM CASCATA
  return (
    <div className={`h-full w-full`}>
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
          <ManageSheetProps toggleIsOpen={handleToggleManageProps} />
        </ModalForm>
        <ModalForm isOpen={isOpen3}>
          <CreateSheet toggleIsOpen={() => setIsOpen3((current) => !current)} addSheetIntoTheList={setSheets} />
        </ModalForm>
        <label htmlFor="sheetid">Digite o código da planilhas</label>
        <div className="flex flex-1 w-full">
          <input
            id="sheetid"
            type="text"
            className="rounded-lg py-1 px-2 mt-1 w-4/6"
            value={sheetId}
            onChange={(ev) => setSheetId(ev.target.value)}
          />
          <div className="flex w-2/6">
            <Button
              ClassName="bg-green-700 px-4 py-1 mt-1 rounded-lg ml-2 dark:text-white w-2/3 flex-1"
              onClick={async () => {
                await loadSheet(sheetId);
              }}
              text="Procurar"
            ></Button>
            {sheet.session.canEditItems ? (
              <Button
                ClassName="px-4 py-1 mt-1 rounded-lg ml-2 dark:text-white w-1/3"
                onClick={handleToggle}
                text="Criar Gasto"
              ></Button>
            ) : (
              <></>
            )}
            {sheet.session.canManageSheetProps && (
              <Button
                ClassName="px-2 py-1 mt-1 rounded-lg ml-2 flex justify-center dark:text-white w-1/6"
                onClick={handleToggleManageProps}
                icon={IconeAjustes}
              ></Button>
            )}
          </div>
        </div>
        <span>R${getBalance()}</span>
        <div>
          <ul className="flex flex-row mt-2">
            {sheets.length > 0 &&
              sheets.map((currentSheet) => {
                return (
                  <li
                    className=" px-2 py-1 dark:bg-[#232323] bg-[#E0E5EC] 
                    dark:shadow-[10px_10px_24px_#0e0e0e,-10px_-10px_24px_#383838]
                    shadow-[10px_10px_24px_#727578,-10px_-10px_24px_#ffffff] rounded-md mx-1  cursor-pointer"
                    key={currentSheet.data.id}
                    onClick={async () =>
                      await loadSheetByUserSeletion(currentSheet)
                    }
                  >
                    <h2 className="font-bold dark:text-white">
                      {currentSheet.data.name}
                    </h2>
                    <p className="font-bold text-gray-400">
                      #{currentSheet.data.id}
                    </p>
                  </li>
                );
              })}
            <li
              className=" px-2 py-1 dark:bg-[#232323] bg-[#E0E5EC] 
                    dark:shadow-[10px_10px_24px_#0e0e0e,-10px_-10px_24px_#383838]
                    shadow-[10px_10px_24px_#727578,-10px_-10px_24px_#ffffff] rounded-md mx-1  cursor-pointer"
            onClick={() => setIsOpen3(true)}
            >
              <h2 className="font-bold dark:text-white">
                Criar uma nova planilha
              </h2>
            </li>
          </ul>
          <ul className="flex  flex-wrap mt-4 w-full transition-all duration-500 ease-linear">
            {itemsReady.map((item) => (
              <li
                className="transition-all duration-500 ease-linear bg-gradient-to-br from-[#FFFFFF] to-[#B8BCC2] dark:from-[#2A2A2A] dark:to-[#1C1C1C] w-1/4 px-4 py-3 flex-1 m-2 rounded-lg justify-center flex flex-col  lg:mb-5 
                shadow-[4.5px_4.5px_40px_#A5A8AD,_-4.5px_-4.5px_40px_#FFFFFF]
                dark:shadow-[8px_8px_3px_#1C1C1C,_-3px_-3px_16px_#2A2A2A] min-w-max "
                key={item.id}
              >
                <h1 className="text-3xl dark:text-white font-extrabold">
                  {item.name}
                </h1>
                <p className="text-base text-gray-600 dark:text-gray-400 my-1/2">
                  <strong>Descrição: </strong>
                  {item.description}
                </p>

                <p className="dark:text-white font-light text-lg my-1">
                  <strong>Valor:</strong> R${item.value}
                </p>

                <p className="dark:text-white mb-2">
                  <strong>Tipo:</strong> {item.type}
                </p>
                <div className="flex w-full">
                  <Button
                    ClassName={`transition-all duration-500 ease-linear flex justify-center bg-[#E0E6EC] dark:bg-[#232323] rounded-full p-3 
                    shadow-[5px_5px_10px_#A7ABB0,_-5px_-5px_10px_#FFFFFF]
                    dark:shadow-[5px_5px_10px_#1A1A1A,_-5px_-5px_10px_#2C2C2C]
                     dark:text-white hover:text-red-600 ${
                       !sheet.session.canEditItems ? "cursor-not-allowed" : ""
                     }`}
                    icon={trashIcon(8)}
                    onClick={async (ev) => {
                      ev.stopPropagation();
                      await deleteItem(item.id);
                    }}
                    disabled={!sheet.session.canEditItems}
                  ></Button>
                  <button
                    className={`ml-5 transition-all duration-500 ease-linear flex justify-center bg-[#E0E6EC] dark:bg-[#232323] rounded-full p-3 
                  shadow-[5px_5px_10px_#A7ABB0,_-5px_-5px_10px_#FFFFFF]
                  dark:shadow-[5px_5px_10px_#1A1A1A,_-5px_-5px_10px_#2C2C2C]
                  hover:text-blue-900 dark:text-white  ${
                    !sheet.session.canEditItems ? "cursor-not-allowed" : ""
                  }`}
                    onClick={() =>
                      sheet.session.canEditItems ? setEditMode(item) : false
                    }
                  >
                    {editIcon(8)}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  );
}
