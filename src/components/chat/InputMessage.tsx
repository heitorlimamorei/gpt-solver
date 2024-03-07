import React, { useState } from 'react';

import Button from '../generic/Button';
import Textarea from '../generic/Textarea';
import { IconSend } from '../Icons';

interface InputMessageProps {
  onSubmit: any;
}

export default function InputMessage(props: InputMessageProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    props.onSubmit(inputValue);
    setInputValue('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="w-full px-3 sm:px-20 lg:px-72">
      <div className=" flex flex-row self-end mb-6 w-full rounded-2xl border-[1px] p-3 border-zinc-600">
        <Textarea
          value={inputValue}
          onChange={handleInputChange}
          style="bg-transparent w-full h-[3rem] outline-none p-2 resize-none"
        />
        <Button onClick={handleSubmit} icon={IconSend()} style="w-fit py-2" />
      </div>
    </div>
  );
}
