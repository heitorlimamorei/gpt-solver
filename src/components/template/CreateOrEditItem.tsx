import React from "react";
import Textarea from "../Textarea";
import Input from "../input";
import Button from "../Button";
import Select from "./Select";
interface IFormData {
  name: string;
  type: string;
  value: number;
  description: string;
}
interface FormModalContentProps {
  formData: IFormData;
  handleChange: (event: any) => void;
  handleSubmit: (event: any) => void;
  isEditMode?: boolean;
  onCancel: () => void;
  spentOptions: string[];
}
function CreateOrEditItem(props: FormModalContentProps) {
  const {
    formData,
    handleChange,
    handleSubmit,
    isEditMode,
    onCancel,
    spentOptions,
  } = props;
  return (
    <form onSubmit={handleSubmit} className={`w-full h-full`}>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="name">
          Nome
        </label>
        <Input
          ClassName=""
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="type">
          Tipo
        </label>
        <Select
          options={spentOptions}
          id="type"
          selected={formData.type}
          handleselected={handleChange}
          name="type"
          ClassName="p-3"
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="value">
          Valor
        </label>
        <Input
          ClassName=""
          type="number"
          id="value"
          name="value"
          value={formData.value}
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="description">
          Descrição
        </label>
        <Textarea
          className="w-full"
          id="description"
          name="description"
          cols={2}
          rows={2}
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between">
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={handleSubmit}
          text={isEditMode ? "Atualizar gasto" : "Criar gasto"}
          textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
        ></Button>
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={onCancel}
          text="Cancelar"
          textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
        ></Button>
      </div>
    </form>
  );
}
export default React.memo(CreateOrEditItem);
