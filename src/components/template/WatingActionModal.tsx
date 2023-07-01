import React from "react";
import Cliper from "../Clipers/Cliper";
import useAppData from "../../data/hook/useAppData";
import ModalForm from "./ModalForm";



export default function WatingActionModal() {
  const { tema, isLoading } = useAppData();
  return (
    <>
      <ModalForm isOpen={isLoading} className="flex flex-col items-center justify-center h-[90%] mt-10 mb-10">
        <h1 className="mb-10">
        Preparando tudo para você… 🛠️
        </h1>
        <Cliper isLoading={isLoading} color={tema} size={60} className={``} />
      </ModalForm>
    </>
  );
}
