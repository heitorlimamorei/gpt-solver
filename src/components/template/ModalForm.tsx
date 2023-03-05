import React, { memo } from "react";

interface ModalFormProps {
  isOpen: boolean;
  children: React.ReactNode;
}
const ModalForm = (props: ModalFormProps) => {
  const {
    isOpen,
  } = props;
  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full dark:bg-[#232323] bg-[#E0E5EC] bg-opacity-100">
          <div className="max-w-xl mx-auto my-10 p-10 bg-[#E0E5EC] dark:bg-[#232323] rounded-lg dark:shadow-[12px_12px_32px_#0f0f0f,-12px_-12px_32px_#373737]
          shadow-[12px_12px_32px_#5e6063,-12px_-12px_32px_#ffffff] dark:text-white">
           {props.children}
          </div>
        </div>
      )}
    </div>
  );
};
export default memo(ModalForm);
