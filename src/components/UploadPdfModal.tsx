import React, { useState } from 'react';

import BaseModal from './BaseModal';

interface IUploadPdfModalProps {
  toggle(): void;
  isOpen: boolean;
  handleSubmit(): void;
}

const UploadPdfModal: React.FC<IUploadPdfModalProps> = ({ toggle, handleSubmit }) => {
  const [fileName, setFileName] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setFileName(file[0].name);
    }
  };

  return (
    <BaseModal toggle={toggle} handleSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-5">Adicione o arquivo aqui:</h1>
      {fileName && (
        <div className="mb-5 text-sm font-medium text-green-600">
          Arquivo selecionado: {fileName}
        </div>
      )}
      <input
        type="file"
        className="hidden"
        onChange={handleChange}
        id="file-upload"
        accept=".pdf"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer inline-block bg-blue-700 hover:bg-blue-500 text-white font-bold p-1 rounded focus:outline-none focus:shadow-outline">
        Escolher arquivo
      </label>
    </BaseModal>
  );
};

export default UploadPdfModal;
