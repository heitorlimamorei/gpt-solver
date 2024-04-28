import React, { useState } from 'react';

import Button from '../generic/Button';
import Textarea from '../generic/Textarea';
import { IconSend, IconUploadFile } from '../Icons';
import UploadPdfModal from '../UploadPdfModal';

interface InputMessageProps {
  onSubmit: any;
}

export default function InputMessage(props: InputMessageProps) {
  const [inputValue, setInputValue] = useState('');
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  const [pdfText, setPdfText] = useState<string>('');

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      // Substitua \n pela quebra de linha conforme o padrão do seu sistema
      setInputValue(inputValue + '\n');
    } else if (event.key === 'Enter' && event.shiftKey) {
      // Caso o usuário pressione Shift+Enter, não impedimos o comportamento padrão
      // e deixamos o navegador adicionar uma nova linha
    }
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  const handlePDFTextChange = (text: string) => {
    setPdfText(text);
  };

  const handleSubmit = () => {
    props.onSubmit(`${inputValue}  ${pdfText}`);
    setInputValue('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="w-full px-3 sm:px-20 lg:px-72">
      <UploadPdfModal
        handleTextChange={handlePDFTextChange}
        toggle={() => setIsPdfOpen((c) => !c)}
        isOpen={isPdfOpen}
      />
      <div className=" flex flex-row items-center self-end mb-6 w-full rounded-2xl border-[1px] p-3 border-zinc-600">
        <Button style="" icon={IconUploadFile()} onClick={() => setIsPdfOpen(true)}></Button>
        <Textarea
          onKeyPress={handleKeyPress}
          value={inputValue}
          onChange={handleInputChange}
          style="bg-transparent w-full h-[3rem] outline-none p-2 resize-none"
        />
        <Button onClick={handleSubmit} icon={IconSend()} style="w-fit py-2" />
      </div>
    </div>
  );
}
