import { useState } from "react";
import { trashIcon } from "../components/icons/Icones";
import Layout from "../components/template/Layout";
import ModalForm from "../components/template/ModalForm";
import useSheets from "../data/hook/useSheets";
import { sheetItemProps } from "../types/sheetTypes";
export default function Home() {
  const {
    createNewSheet,
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
  const [currentEditingItem, setCurrentEditingItem] =
    useState<sheetItemProps>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    value: 0,
    description: "",
  });
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleCancel = () => {
    handleToggle();
    setFormData({
      name: "",
      type: "",
      value: 0,
      description: "",
    });
    setCurrentEditingItem(null);
  };
  function setEditMode(currentItem: sheetItemProps) {
    setCurrentEditingItem(currentItem);
    setFormData({
      name: currentItem.name,
      type: currentItem.type,
      value: currentItem.value,
      description: currentItem.description,
    });
    setIsOpen((current) => !current);
  }
  const handleSubmit = (event) => {
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
  };
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
          <ul className="flex  flex-wrap mt-4 w-full">
            {getSortedItems("date descending").map((item) => (
              <li
                className="bg-white w-1/4 px-4 py-1 flex-1 m-2 rounded-lg justify-center flex flex-col shadow-xl cursor-pointer"
                key={item.id}
                onClick={() => setEditMode(item)}
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
                      await deleteItem(item.id)
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
