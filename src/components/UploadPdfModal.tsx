import React, { useState } from 'react';

import usePDF from '@/hooks/usePDF';

import BaseModal from './BaseModal';

interface IUploadPdfModalProps {
  toggle(): void;
  isOpen: boolean;
  handleTextChange(t: string): void;
}

const UploadPdfModal: React.FC<IUploadPdfModalProps> = ({ toggle, handleTextChange, isOpen }) => {
  const [fileName, setFileName] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const { ExtractText } = usePDF();

  if (!isOpen) return;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      if (file.type === 'application/pdf') {
        setFileName(file.name);
        setFileError('');
        setFile(file);
      } else {
        setFileName('');
        setFileError('Por favor, selecione um arquivo PDF.');
      }
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setFileError('Por favor, selecione um arquivo PDF.');
      return;
    }

    const text = await ExtractText(file);

    if (!text) {
      setFileError('Ocorreu um erro ao extrair os dados do PDF, tente novamente.');
      setFile(null);
      return;
    }

    handleTextChange(text);
    setFile(null);
    setFileName('');
    toggle();
  };

  return (
    <BaseModal toggle={toggle} handleSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-5">Adicione o arquivo aqui:</h1>
      {fileName && (
        <div className="mb-5 text-sm font-medium text-green-600">
          Arquivo selecionado: {fileName}
        </div>
      )}

      {fileError && <div className="mb-5 text-sm font-medium text-red-600">{fileError}</div>}
      <input
        type="file"
        className="hidden"
        onChange={handleChange}
        id="file-upload"
        accept=".pdf"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Escolher arquivo
      </label>
    </BaseModal>
  );
};

export default UploadPdfModal;
