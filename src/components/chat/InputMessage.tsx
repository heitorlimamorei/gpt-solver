import React, { useState } from 'react';

import Button from '../generic/Button';
import Textarea from '../generic/Textarea';
import { IconSend, IconUploadFile } from '../Icons';
import UploadPdfModal from '../UploadPdfModal';

interface InputMessageProps {
  onSubmit: any;
  sysMessage: string;
}

export default function InputMessage(props: InputMessageProps) {
  const [inputValue, setInputValue] = useState('');
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  const [pdfText, setPdfText] = useState<string>('');

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setInputValue(inputValue + '\n');
    } else if (event.key === 'Enter' && event.shiftKey) {
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
        <Button
          style={
            pdfText.length > 1
              ? 'text-green-500'
              : `${props.sysMessage == 'Olá, eu sou o GPT Solver, como posso ajudar?' ? 'hidden' : ''}`
          }
          icon={IconUploadFile()}
          onClick={() => setIsPdfOpen(true)}></Button>
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
