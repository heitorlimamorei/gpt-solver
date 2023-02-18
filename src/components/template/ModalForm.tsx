import React, { useState } from "react";
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
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75">
          <div className="max-w-md mx-auto my-10 p-10 bg-white rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  className="block font-medium text-lg mb-2"
                  htmlFor="name"
                >
                  Nome
                </label>
                <input
                  className="border border-gray-400 p-2 w-full"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  className="block font-medium text-lg mb-2"
                  htmlFor="type"
                >
                  Tipo
                </label>
                <input
                  className="border border-gray-400 p-2 w-full"
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  className="block font-medium text-lg mb-2"
                  htmlFor="value"
                >
                  Valor
                </label>
                <input
                  className="border border-gray-400 p-2 w-full"
                  type="number"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  className="block font-medium text-lg mb-2"
                  htmlFor="description"
                >
                  Descrição
                </label>
                <textarea
                  className="border border-gray-400 p-2 w-full"
                  id="description"
                  name="description"
                  cols={2}
                  rows={2}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-400 rounded-md"
                  onClick={handleSubmit}
                >
                 {isEditMode ? "Atualizar gasto" : "Criar gasto" }
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white hover:bg-red-400 rounded-md"
                  onClick={onCancel}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ModalForm;
