import React, { useCallback, useEffect, useState } from "react";
import useSheets from "../../data/hook/useSheets";
import Button from "../Button";
import Input from "../input";
import Select from "./Select";
interface formDataProps {
  email: string;
  role: string;
  id: string;
}
interface CreateOrEditUserProps {
  currentUser: {
    email: string;
    role: string;
    id: string;
  };
  isEditMode: boolean;
  setIsEditMode(isEditMode: boolean): void;
  toggleIsOpen: () => void;
  setCurrentUser(currentUser: formDataProps): void;
}

export default function CreateOrEditUser(props: CreateOrEditUserProps) {
  const { currentUser, isEditMode, toggleIsOpen, setIsEditMode, setCurrentUser } = props;
  const { sheet, updateUser, createUser } = useSheets();
  const [formData, setFormData] = useState<formDataProps>({
    email: "",
    role: "viewer",
    id: "",
  });
  const roleOptions = ["admin", "editor", "viewer"];
  useEffect(() => {
    setFormData({
      email: currentUser.email,
      role: currentUser.role,
      id: currentUser.id,
    });
  }, [props.currentUser]);
  const handleChange = useCallback((event) => {
    setFormData((current) => {
      return {
        ...current,
        [event.target.name]: event.target.value,
      };
    });
  }, []);
  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    if (!isEditMode) {
      await createUser(formData);
    } else {
      await updateUser(formData);
    }
    setIsEditMode(false);
    setCurrentUser(null);
    toggleIsOpen();
  }, [formData]);
  return (
    <form onSubmit={(ev) => handleSubmit(ev)} className={`w-full h-full`}>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="name">
          Email
        </label>
        <Input
          ClassName=""
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="role">
          Cargo
        </label>
        <Select
          options={roleOptions}
          id="role"
          selected={formData.role}
          handleselected={handleChange}
          name="role"
          ClassName="p-3"
        />
      </div>
      <div className="flex justify-between">
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={handleSubmit}
          text="Salvar"
          textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
          iconClassName={""}
          icon={undefined}
        ></Button>
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={() => {
            toggleIsOpen();
            setFormData({
              email: "",
              role: "viewer",
              id: "",
            });
          }}
          text="Fechar"
          textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
          iconClassName={""}
          icon={undefined}
        ></Button>
      </div>
    </form>
  );
}
