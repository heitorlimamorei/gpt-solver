import { useCallback, useEffect, useState } from "react";
import { trashIcon } from "../components/icons/Icones";
import Layout from "../components/template/Layout";
import ModalForm from "../components/template/ModalForm";
import useSheets from "../data/hook/useSheets";
import { useSession } from "next-auth/react";
import axios from "axios";
import { sheetItemProps, sheetProps } from "../types/sheetTypes";
export default function Home() {
  const {
    sheet,
    loadSheet,
    deleteItem,
    createNewItem,
    getBalance,
    getSortedItems,
    updateItem,
  } = useSheets();
  const [sheetId, setSheetId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sheets, setSheets] = useState<sheetProps[]>([]);
  const [sheetIds, setSheetIds] = useState<string[]>([]);
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
  return (
    <div className={`h-full w-full`}>
      <Layout
        titulo="Pagina inicial"
        subtitulo="Estamos construindo um admin template"
      >
        <ModalForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isOpen={isOpen}
          handleToggle={handleToggle}
          setFormData={setFormData}
          isEditMode={currentEditingItem != null}
          onCancel={handleCancel}
        />
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
            <button
              className="bg-green-700 px-4 py-1 mt-1 rounded-lg ml-2 text-white w-2/3 flex-1"
              onClick={async () => {
                await loadSheet(sheetId);
              }}
            >
              Procurar
            </button>
            {sheet.session.canEditItems ? (
              <button
                className="bg-blue-700 px-4 py-1 mt-1 rounded-lg ml-2 text-white w-1/3"
                onClick={handleToggle}
              >
                Criar Gasto
              </button>
            ) : (
              <></>
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
                    className="px-2 py-1 bg-gray-700 rounded-md mx-1 shadow-xl hover:bg-gray-600 cursor-pointer"
                    key={currentSheet.data.id}
                    onClick={async () => await loadSheet(currentSheet.data.id)}
                  >
                    <h2 className="font-bold text-white">
                      {currentSheet.data.name}
                    </h2>
                    <p className="font-bold text-gray-400">
                      #{currentSheet.data.id}
                    </p>
                  </li>
                );
              })}
          </ul>
          <ul className="flex  flex-wrap mt-4 w-full">
            {getSortedItems("date descending").map((item) => (
              <li
                className="bg-white w-1/4 px-4 py-1 flex-1 m-2 rounded-lg justify-center flex flex-col shadow-xl cursor-pointer"
                key={item.id}
                onClick={() =>
                  sheet.session.canEditItems ? setEditMode(item) : false
                }
              >
                <h1 className="text-lg">{item.name}</h1>
                <p className="text-gray-600">{item.description}</p>
                <p>
                  <strong>R${item.value}</strong>
                </p>
                <p>tipo: {item.type}</p>
                <div className="flex w-full">
                  <button
                    className={`flex justify-center hover:text-red-600 ${
                      !sheet.session.canEditItems ? "cursor-not-allowed" : ""
                    }`}
                    onClick={async (ev) => {
                      ev.stopPropagation();
                      await deleteItem(item.id);
                    }}
                    disabled={!sheet.session.canEditItems}
                  >
                    {trashIcon()}
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
