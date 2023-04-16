import React, { memo, useEffect, useRef } from "react";
interface inputProps {
  ClassName?: string;
  name: string;
  id: string;
  type: string;
  value: any;
  onChange: any;
  disabled?: boolean;
  checking: {
    value: any;
    condition: boolean;
  };
}

function CheckingInput(props: inputProps) {
  const checkingInputRef = useRef(null);
  useEffect(() => {
    if (props.checking.condition) {
      checkingInputRef.current.focus();
    }
  }, [props.checking]);
  return (
    <input
      ref={checkingInputRef}
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      className={`dark:bg-[#232323] bg-[#E0E5EC] rounded-xl w-full h-[2.4rem] py-4 p-3 
        shadow-[inset_9px_9px_18px_#5a5c5e,inset_-9px_-9px_18px_#ffffff]
        dark:shadow-[inset_9px_9px_18px_#0e0e0e,inset_-9px_-9px_18px_#383838] ${props.ClassName}`}
      value={props.value}
      onChange={props.onChange}
      type={props.type}
      required
    />
  );
}

export default memo(CheckingInput);
