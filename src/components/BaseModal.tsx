import React from 'react';

interface IDarkModalProps {
  children: React.ReactNode;
  toggle(): void;
  handleSubmit(): void;
}

const BaseModal = ({ handleSubmit, toggle, children }: IDarkModalProps) => {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
      onClick={toggle}>
      <div
        className="bg-gray-800 rounded-lg text-white overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full p-4"
        onClick={(e) => e.stopPropagation()}>
        {children}
        <div className="flex justify-between space-x-2">
          <button
            className="mt-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleSubmit}>
            Salvar
          </button>
          <button
            className="mt-2 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={toggle}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
