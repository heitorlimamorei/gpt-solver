import React, { useState } from "react";
import Textarea from "../Textarea";
import Input from "../input";
import Button from "../Button";
interface IFormData {
  name: string;
  type: string;
  value: number;
  description: string;
}
interface ModalFormProps {
  formData: IFormData;
  handleChange: (event: any) => void;
  isOpen: boolean;
  handleToggle: () => void;
  handleSubmit: (event: any) => void;
  setFormData: (formData: IFormData) => void;
  isEditMode?: boolean;
  onCancel: () => void;
}
const ModalForm = (props: ModalFormProps) => {
  const {
    formData,
    isOpen,
    handleChange,
    handleToggle,
    handleSubmit,
    setFormData,
    isEditMode,
    onCancel
  } = props;
  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full dark:bg-[#232323] bg-[#E0E5EC] bg-opacity-100">
          <div className="max-w-md mx-auto my-10 p-10 bg-[#E0E5EC] dark:bg-[#232323] rounded-lg dark:shadow-[12px_12px_32px_#0f0f0f,-12px_-12px_32px_#373737]
          shadow-[12px_12px_32px_#5e6063,-12px_-12px_32px_#ffffff] dark:text-white">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  className="block font-medium text-lg mb-2"
                  htmlFor="name"
                >
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
                <label
                  className="block font-medium text-lg mb-2"
                  htmlFor="type"
                >
                  Tipo
                </label>
                <Input
                  ClassName=""
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label
                  className="block font-medium text-lg mb-2"
                  htmlFor="value"
                >
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
                <label
                  className="block font-medium text-lg mb-2"
                  htmlFor="description"
                >
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
                >
                </Button>
                <Button
                  ClassName="px-4 py-2 rounded-md"
                  onClick={onCancel}
                  text="Cancelar"
                  textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
                >
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ModalForm;
